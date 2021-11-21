import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'

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
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '0px',
    }
  },
  bubble: {
    width: '100px',
    alignSelf: 'center',
    marginBottom: theme.spacing(4)
  },
  converse: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10)
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
  redirectContainer: {
    width: 'max-content',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: `${theme.spacing(2)}px auto`,
      textAlign: 'center'
    }
  },
  redirect: {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    padding: `${theme.spacing(3)}px ${theme.spacing(5)}px`,
    minWidth: '200px',
    boxShadow: '0 0 20px #dae2ea',
    fontSize: '20px',
    borderRadius: '10px',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1)
    }
  }
}))

const WelcomeLayout = (props) => {
  const history = useHistory()
  const classes = useStyles()

  const loginRedirect = (
    <Grid container item className={classes.redirectContainer}>
      <Typography variant="h6">Don't have an account?</Typography>
      <Button variant="contained" className={classes.redirect} onClick={() => history.push("/register")}>Create account</Button>
    </Grid>
  )

  const signupRedirect = (
    <Grid container item className={classes.redirectContainer}>
      <Typography variant="h6">Need to log in?</Typography>
      <Button variant="contained" className={classes.redirect} onClick={() => history.push("/login")}>Login</Button>
    </Grid>
  )

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
        {props.type === 'register' ? signupRedirect : loginRedirect}
        {props.children}
      </Grid>
    </Grid>
  )
}

export default WelcomeLayout
