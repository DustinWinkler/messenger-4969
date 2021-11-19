import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  useTheme,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import WelcomeLayout from "./components/Welcome/WelcomeLayout";
import WelcomeTextInput from "./components/Welcome/WelcomeTextInput";

const Login = (props) => {
  const { user, login } = props;
  const theme = useTheme()

  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value
    const password = event.target.password.value

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <WelcomeLayout type="login">
      <form style={theme.welcomeForm} onSubmit={handleLogin}>
        <Typography style={theme.welcomeText} variant="h4">Welcome back!</Typography>
        <Grid>

          <WelcomeTextInput label="Username" />
          <WelcomeTextInput label="Password" />

          <Grid style={theme.submitBtnContainer}>
            <Button style={theme.submitBtn} type="submit"  variant="contained" size="large">
              Login
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
