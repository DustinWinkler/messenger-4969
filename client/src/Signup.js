import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import WelcomeLayout from "./components/Welcome/WelcomeLayout";
import WelcomeTextInput from "./components/Welcome/WelcomeTextInput";
import { sharedStyles } from "./components/Welcome/sharedStyles";

const Login = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = sharedStyles()

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
    <WelcomeLayout type="register">
      <form className={classes.welcomeForm} onSubmit={handleRegister}>
          <Typography className={classes.welcomeText} variant="h4">Create an account.</Typography>
          <Grid>
            <WelcomeTextInput label="Username" />
            <WelcomeTextInput label="E-mail address" name="email" type="email" />
            <WelcomeTextInput label="Password" error={formErrorMessage.confirmPassword} />
            <WelcomeTextInput label="Confirm Password" type="password" name="confirmPassword" error={formErrorMessage.confirmPassword} />
            
            <Grid className={classes.submitBtnContainer}>
              <Button className={classes.submitBtn} type="submit" variant="contained" size="large">
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
    </WelcomeLayout>
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
