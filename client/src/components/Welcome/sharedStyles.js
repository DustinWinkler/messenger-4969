import { makeStyles } from "@material-ui/core";

export const sharedStyles = makeStyles(theme => ({
  welcomeForm: {
    marginTop: theme.spacing(12),
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6)
    }
  },
  welcomeText: {
    fontWeight: 600,
    marginBottom: theme.spacing(6)
  },
  submitBtnContainer: {
    textAlign: 'center'
  },
  submitBtn: {
    marginTop: theme.spacing(6),
    padding: `${theme.spacing(3)}px ${theme.spacing(9)}px`,
    fontSize: '1.5rem',
    boxShadow: 'none'
  }
}))