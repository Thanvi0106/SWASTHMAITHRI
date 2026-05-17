import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: 24,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: 500,
    margin: 'auto',
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 16,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Updated auth listener for v9
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      // ✅ Corrected login syntax
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', email);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/aftrbody" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Login
              </Typography>
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                onClick={handleLoginClick}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
