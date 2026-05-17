import { Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, database } from "../firebase/firebase";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: 16,
    marginLeft: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    boxShadow: 3,
    backgroundColor: "#fff",
    maxWidth: 500,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError("User not authenticated.");
        return;
      }

      try {
        const userRef = ref(database, `users/${user.uid}`); // ✅ v9 syntax
        const snapshot = await get(userRef); // ✅ get() replaces once('value')
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setError("User data not found.");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <Typography variant="body2" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {userData ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Profile
            </Typography>
            <Typography variant="body1">Username: {userData.username}</Typography>
            <Typography variant="body1">Email: {userData.email}</Typography>
            <Typography variant="body1">
              Phone Number: {userData.phoneNumber}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        )}
      </Paper>
    </div>
  );
};

export default Profile;
