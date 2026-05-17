import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AftrBody from "./components/AftrBody";
import AftrNavbar from "./components/AftrNavbar";
import Articlespage from "./components/Articlespage";
import BfrBody from "./components/BfrBody";
import BfrNavbar from "./components/BfrNavbar";
import BloodDonation from "./components/BloodDonation";
import CommunityPage from "./components/CommunityPage";
import Donate from "./components/Donate";
import Donations from "./components/Donations";
import Footer from "./components/Footer";
import ImpMedicineDon from "./components/ImpMedicineDon";
import Login from "./components/Login";
import MedEquipment from "./components/MedEquipment";
import MedForm from "./components/MedForm";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Translate from "./components/Translate";
import { auth } from "./firebase/firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  return (
    <Router>
      <div>
        {isLoggedIn ? (
          <AftrNavbar handleLogout={handleLogout} />
        ) : (
          <BfrNavbar />
        )}
        <Routes>
          <Route path="/" element={<BfrBody />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />

          {isLoggedIn ? (
            <>
              <Route path="/AftrBody" element={<AftrBody />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/MedForm" element={<MedForm />} />
              <Route path="/MedEquipment" element={<MedEquipment />} />
              <Route path="/BloodDonation" element={<BloodDonation/>} />
              <Route path="/Donations" element={<Donations/>} />
              <Route path="/Articlespage" element={<Articlespage />} />
              <Route path="/CommunityPage" element={<CommunityPage />} /> 
              <Route path="/Donate" element={<Donate />} />
              <Route path="/ImpMedicineDon" element={<ImpMedicineDon />} />
            </>
          ) : null}
        </Routes>
        <Translate />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
