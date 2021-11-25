import React, { useRef, useState } from 'react'
import { CircularProgress, makeStyles } from '@material-ui/core'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#B0B0B0B0',
    zIndex: 10
  },
  modal: {
    width: '300px',
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: '100px',
    position: 'relative',
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    padding: theme.spacing(5),
    paddingTop: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(2)
  },
  close: {
    position: 'absolute',
    top: 4,
    right: 4,
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    '&:hover': {
      color: 'gray'
    }
  }
}))

function ImageUpload({ handleFile, toggleModal, uploading }) {
  const classes = useStyles()
  const outside = useRef(null)
  const fileInput = useRef(null)
  const [file, setFile] = useState(null)

  const handleOutsideClick = (event) => {
    if (outside.current === event.target) toggleModal()
  }

  const handleFileClick = () => {
    fileInput.current.click()
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  return (
    <Box ref={outside} onClick={handleOutsideClick} className={classes.root} >
      <Box textAlign='center' className={classes.modal}>
        <Typography variant='h5' textAlign='center'>Upload an image</Typography>
        {file && 
        <Typography textAlign='center'>{file.name}</Typography>}
        <Box className={classes.button}>
          <Button onClick={handleFileClick} variant="contained" >
            <Typography className={classes.buttonText}>Browse</Typography>
            <input ref={fileInput} onChange={handleFileChange} type="file" hidden />
          </Button>
          <Box className={classes.button}>
            {uploading ? 
              <CircularProgress /> :
              <Button disabled={!file?.size} onClick={()=>handleFile(file)}>
                Upload
              </Button>  
            }
          </Box>
        </Box>
        <Box onClick={toggleModal}>
          <CloseIcon className={classes.close} />
        </Box>
      </Box>
    </Box>
  )
}

export default ImageUpload
