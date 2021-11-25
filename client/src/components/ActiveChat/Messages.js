import React from "react";
import { Box } from "@material-ui/core";
import moment from "moment";
import { MessageBubble } from "../ActiveChat";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const otherUserInfo = (message.senderId === userId ? null : otherUser)

        return (<MessageBubble key={message.id} images={message.attachments} text={message.text} time={time} otherUser={otherUserInfo} />)
      })}
      
      
    </Box>
  );
};

export default Messages;
