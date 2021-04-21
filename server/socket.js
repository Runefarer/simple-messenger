const jwt = require("jsonwebtoken");
const { User } = require("./db/models");
const onlineUsers = require("./onlineUsers");

function removeUser(io, socket, id) {
  if (!id) {
    return;
  }

  // leave room
  socket.leave(id);

  // if room for id is empty, all sockets for user have disconnected and we can emit offline
  if (!io.sockets.adapter.rooms.get(id)?.size) {
    if (onlineUsers[id]) {
      delete onlineUsers[id];
    }
    socket.broadcast.emit("remove-offline-user", id);
  }
}

module.exports = (server, appSession) => {
  const io = require("socket.io")(server);

  io.use((socket, next) => {
    appSession(socket.handshake, {}, (err) => {
      if (err) {
        return next(new Error("Authentication error"));
      }

      const token = socket.handshake.session.token;
      if (token) {
        jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
          if (err) {
            return next(new Error("Authentication error"));
          }

          User.findOne({
            where: { id: decoded.id },
          }).then((user) => {
            if (user) {
              return next();
            } else {
              return next(new Error("Authentication error"));
            }
          });
        });
      } else {
        return next(new Error("Authentication error"));
      }
    });
  }).on("connection", (socket) => {
    socket.on("go-online", (id) => {
      if (!onlineUsers[id]) {
        onlineUsers[id] = true;
      }

      // remember id to handle disconnects
      socket.userId = id;

      // join room so that we can emit easily to a particular user id
      // we join multiple times because same user can access from multiple clients
      socket.join(id);

      // send the user who just went online to everyone else who is already online
      socket.broadcast.emit("add-online-user", id);
    });

    socket.on("new-message", (data) => {
      // only emit to recipient
      socket.to(data.recipientId).emit("new-message", {
        message: data.message,
        sender: data.sender,
      });
    });

    socket.on("logout", (id) => {
      removeUser(io, socket, id);
    });

    socket.on("disconnect", () => {
      removeUser(io, socket, socket.userId);
    });
  });
};
