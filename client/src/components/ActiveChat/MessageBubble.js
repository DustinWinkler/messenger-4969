import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import { useImageStyles } from "./imageStyling";
import { useOtherUserStyles, useCurrentUserStyles } from "./messageStyling";

const MessageBubble = (props) => {
  const sharedClasses = useImageStyles()
  const { text, time, otherUser, images } = props;
  const otherUserStyle = useOtherUserStyles()
  const currentUserStyle = useCurrentUserStyles()
  const classes = (otherUser ? otherUserStyle : currentUserStyle)
  
  return (
    <Box className={classes.root}>
      {otherUser && 
        <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      }
      <Box className={classes.root}>
        <Typography className={classes.usernameDate}>
          {otherUser?.username} {time}
        </Typography>
        {images?.length === 1 && 
          <img className={sharedClasses.image} src={images[0]} alt="user submitted" />
        }
        <Box className={classes.bubble}>
          <Typography className={classes.text}>{text}</Typography>
        </Box>
        <Box className={sharedClasses.imagesContainer} justifyContent="flex-end">
          {images?.length > 1 && images?.map(imageUrl => {
            return <img key={imageUrl} className={sharedClasses.image} src={imageUrl} alt="user submitted" />
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBubble;
