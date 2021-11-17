import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";

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
      paddingLeft: '50px',
      paddingRight: '25px',
      margin: '0 auto'
    }
  },
  form: {
    marginTop: '150px',
    maxWidth: '1200px'
  },
  welcome: {
    fontWeight: 900,
    marginBottom: '50px'
  },
  registerContainer: {
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
  register: {
    backgroundColor: 'white',
    color: '#367bff',
    padding: '20px 40px',
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
  const { user, login } = props;
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
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
        <Grid container item className={classes.registerContainer}>
          <Typography variant="h6">Don't have an account?</Typography>
          <Button variant="contained" className={classes.register} onClick={() => history.push("/register")}>Create account</Button>
        </Grid>
        <form className={classes.form} onSubmit={handleLogin}>
          <Typography className={classes.welcome} variant="h4">Welcome back!</Typography>
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
                />
              </FormControl>
            </Grid>
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
                label="Password"
                aria-label="password"
                type="password"
                name="password"
              />
            </FormControl>
            <Grid className={classes.submit}>
              <Button className={classes.submitBtn} type="submit"  variant="contained" size="large">
                Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
