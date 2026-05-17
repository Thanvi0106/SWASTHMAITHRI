import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, database } from '../firebase/firebase';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  },
  paper: {
    padding: 32,
    borderRadius: 16,
    marginTop: 40,
    marginBottom: 40,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    maxWidth: 500,
    margin: 'auto',
  },
  form: { width: '100%' },
  button: { marginTop: 16 },
  terms: { marginTop: 8 },
  successMessage: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#4caf50',
    color: '#fff',
    borderRadius: 4,
    textAlign: 'center',
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSignUp = async () => {
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms.');
      return;
    }

    try {
      // ✅ Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created:", user);

      // ✅ Save additional info to Realtime Database
      await set(ref(database, 'users/' + user.uid), {
        username,
        phoneNumber,
        email,
      });

      setSuccessMessage('Successfully signed up!');
      setEmail('');
      setUsername('');
      setPhoneNumber('');
      setPassword('');
      setConfirmPassword('');
      setAgreeTerms(false);

      console.log('User signed up and data saved:', email, username, phoneNumber);

      // ✅ Redirect to login page
      setTimeout(() => setRedirectToLogin(true), 1500);
    } catch (error) {
      console.error("Signup error:", error.message);
      setError(error.message);
    }
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={classes.root}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          {successMessage && (
            <Typography variant="body2" className={classes.successMessage}>
              {successMessage}
            </Typography>
          )}
          <Paper className={classes.paper}>
            <form className={classes.form} noValidate autoComplete="off">
              <Typography variant="h4" align="center" gutterBottom>
                Sign Up
              </Typography>
              <TextField label="Email" type="email" fullWidth margin="normal"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField label="Username" fullWidth margin="normal"
                value={username} onChange={(e) => setUsername(e.target.value)} />
              <TextField label="Phone Number" fullWidth margin="normal"
                value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <TextField label="Password" type="password" fullWidth margin="normal"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <TextField label="Confirm Password" type="password" fullWidth margin="normal"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <FormControlLabel
                control={<Checkbox checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />}
                label="I consent to the sharing of my email address."
              />
              {error && <Typography variant="body2" color="error" align="center">{error}</Typography>}
              <Button variant="contained" color="primary" fullWidth className={classes.button} onClick={handleSignUp}>
                Sign Up
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
