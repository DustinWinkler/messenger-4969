import { FormControl, FormHelperText, makeStyles, TextField } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '90%',
    borderWidth: '2px',
    marginBottom: '20px'
  },
  inputText: {
    fontSize: '20px'
  },
  labelText: {
    fontSize: '20px',
  },
}))

const WelcomeTextInput = (props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.input} margin="normal" error={!!props.error} required>
      <TextField 
        InputProps={{
          classes: {
            input: classes.inputText
          }
        }}
        InputLabelProps={{
          classes: {
            root: classes.labelText,
          }
        }}
        label={props.label}
        aria-label={props.label}
        type={props.type || props.label}
        name={props.name || props.label.toLowerCase()}
      />
      {props.error && (
        <FormHelperText>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default WelcomeTextInput
