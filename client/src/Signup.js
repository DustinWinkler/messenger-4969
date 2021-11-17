import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  sideImg: {
    backgroundImage: "url(assets/images/bg-img.png)",
    backgroundColor: '#89c8ff',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
  },
  sideImgBox: {
    backgroundColor: 'rgba(74, 170, 255, 0.8)',
    width: '100%',
    height: '100vh',
    color: 'white',
    fontSize: '40px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '0px',
      padding: '0'
    }
  },
  bubble: {
    width: '100px',
    alignSelf: 'center',
    marginBottom: '50px'
  },
  converse: {
    padding: '0 80px'
  },
  formContainer: {
    paddingLeft: '100px',
    paddingRight: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '25px',
      paddingRight: '25px',
    }
  },
  form: {
    marginTop: '150px',
    maxWidth: '1200px'
  },
  createAccount: {
    fontWeight: 900,
    marginBottom: '50px'
  },
  loginContainer: {
    width: 'max-content',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    color: 'gray',
    marginTop: '20px',
    marginLeft: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: '10px auto',
      textAlign: 'center'
    }
  },
  login: {
    backgroundColor: 'white',
    color: '#367bff',
    padding: '20px 60px',
    boxShadow: '0 0 10px #d2d2d2',
    fontSize: '20px',
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '10px'
    }
  },
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
  submit: {
    textAlign: 'center',
  },
  submitBtn: {
    backgroundColor: '#3a8dff',
    color: 'white',
    marginTop: '50px',
    padding: '20px 70px',
    fontSize: '20px',
    boxShadow: 'none'
  }
}))

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = useStyles()

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container direction="row" justify="center">
      <Grid item md={5} className={classes.sideImg}>
        <Box className={classes.sideImgBox}>
          <img className={classes.bubble} src="assets/images/bubble.svg" alt='chat bubble' />
          <Typography className={classes.converse} variant='h4' >
            Converse with anyone with any language
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={7} className={classes.formContainer}>
        <Grid container item className={classes.loginContainer}>
          <Typography variant="h6">Need to log in?</Typography>
          <Button variant="contained" className={classes.login} onClick={() => history.push("/login")}>Login</Button>
        </Grid>
        <form className={classes.form} onSubmit={handleRegister}>
          <Typography className={classes.createAccount} variant="h4">Create an account.</Typography>
          <Grid>
            <Grid>
              <FormControl className={classes.input} margin="normal" required>
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
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.input} margin="normal" required>
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
                  label="E-mail address"
                  aria-label="e-mail address"
                  type="email"
                  name="email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.input} margin="normal" required error={!!formErrorMessage.confirmPassword}>
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
                  aria-label="password"
                  label="Password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="password"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid>
              <FormControl className={classes.input} margin="normal" required error={!!formErrorMessage.confirmPassword}>
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
                  label="Confirm Password"
                  aria-label="confirm password"
                  type="password"
                  inputProps={{ minLength: 6 }}
                  name="confirmPassword"
                  required
                />
                <FormHelperText>
                  {formErrorMessage.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid className={classes.submit}>
              <Button className={classes.submitBtn} type="submit" variant="contained" size="large">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
