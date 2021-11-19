import { createMuiTheme } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({})

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    button: {
      textTransform: "none",
      letterSpacing: 0,
      fontWeight: "bold"
    }
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold"
      }
    }
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#B0B0B0" }
  },
  welcomeForm: {
    marginTop: '150px',
    maxWidth: '1200px',
    [breakpoints.down('sm')]: {
      marginTop: '50px'
    }
  },
  welcomeText: {
    fontWeight: 900,
    marginBottom: '50px'
  },
  submitBtnContainer: {
    textAlign: 'center'
  },
  submitBtn: {
    backgroundColor: '#3a8dff',
    color: 'white',
    marginTop: '50px',
    padding: '20px 70px',
    fontSize: '20px',
    boxShadow: 'none'
  }
});
