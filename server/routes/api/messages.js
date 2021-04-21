const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const { Op } = require("sequelize");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      // we check if sender is actually a part of this conversation
      const isValid = await Conversation.count({
        where: {
          [Op.and]: [
            {
              id: conversationId
            },
            {
              [Op.or]: {
                user1Id: senderId,
                user2Id: senderId,
              },
            }
          ],
        },
      }).then(count => count !== 0);
      // if sender is not a part of this conversation, respond with error
      if (!isValid) {
        return res.sendStatus(403);
      }

      const message = await Message.create({ senderId, text, conversationId });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(senderId, recipientId);

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({ user1Id: senderId, user2Id: recipientId });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({ senderId, text, conversationId: conversation.id });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects { conversationId } in body
router.post("/read", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const recipientId = req.user.id;
    const { conversationId } = req.body;

    await Message.update({ read: true }, {
      where: {
        conversationId,
        read: false,
        senderId: {
          [Op.not]: recipientId,
        },
      },
    });

    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
