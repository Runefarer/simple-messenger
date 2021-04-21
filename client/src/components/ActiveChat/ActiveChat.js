import React, { useEffect, useRef } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { markRead } from "../../store/conversations";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const markerRef = useRef(null);
  const { user, markRead } = props;
  const conversation = props.conversation || {};
  const { id, unreadCount, messages } = conversation;

  useEffect(() => {
    if (unreadCount > 0) {
      markRead(id);

      if (markerRef.current) {
        clearTimeout(markerRef.current);
      }

      markerRef.current = setTimeout(async () => {
        try {
          await axios.post("/api/messages/read", { conversationId: id });
        } catch (error) {
          console.error(error);
        }
        markerRef.current = null;
      }, 2500);
    }
  }, [markRead, id, unreadCount, messages?.length]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    markRead: (id) => {
      dispatch(markRead(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
