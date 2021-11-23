import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  inputContainer: {
    position: 'relative'
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
    paddingRight: theme.spacing(5)
  },
  icon: {
    position:'absolute',
    top: 25,
    right: 25,
    color: theme.palette.secondary.main,
    cursor: 'pointer',
    '&:hover': {
      color: 'gray'
    }
  },
  attachmentsCount: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: theme.palette.primary.main,
    width: 16,
    height: 16,
    textAlign: 'center',
    borderRadius: 100,
    color: 'white',
    "& > p": {
      fontSize: 10
    }
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { postMessage, otherUser, conversationId, user } = props;
  // access-token causes cors error on 
  const uninterceptedAxios = axios.create()

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleFile = (file) => {
    //upload to cloudinary and place into attachments
    let formData = new FormData()
    formData.append("api_key", "733767869653349")
    formData.append("file", file)
    // in case two files with same name are uploaded
    formData.append("public_id", file.name + Math.floor((Math.random() * 1000)+1))
    formData.append("upload_preset", "zsmszzxw")

    setUploading(true)
    uninterceptedAxios.post("https://api.cloudinary.com/v1_1/dgogaeujr/image/upload", formData, {})
    .then(result => {
      console.log(result);
      setAttachments([...attachments, result.data.url])
      setShowModal(false)
      setUploading(false)
    })
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([])
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl className={classes.inputContainer} fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <InsertPhotoOutlinedIcon className={classes.icon} onClick={toggleModal} />
        {attachments.length > 0 && 
        <Box className={classes.attachmentsCount}>
          <Typography>{attachments.length}</Typography>
        </Box>}

      </FormControl>
      {showModal && <ImageUpload handleFile={handleFile} toggleModal={toggleModal} uploading={uploading} />}
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
