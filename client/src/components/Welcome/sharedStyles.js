import { makeStyles } from "@material-ui/core";

export const sharedStyles = makeStyles(theme => ({
  welcomeForm: {
    marginTop: '100px',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '50px'
    }
  },
  welcomeText: {
    fontWeight: 600,
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
}))