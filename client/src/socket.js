import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");
  const user = store.getState().user;
  if (user?.id) {
    socket.emit("go-online", user.id);
  }

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(setNewMessage(data.message, data.sender));
  });
});

socket.on("disconnect", () => {
  socket.off("add-online-user");
  socket.off("remove-offline-user");
  socket.off("new-message");
});

export default socket;
