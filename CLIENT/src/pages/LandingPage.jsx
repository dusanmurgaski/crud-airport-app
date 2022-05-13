import React from "react";
import Navbar from "../components/Navbar";
import LoginModal from "../components/LoginModal";
import { useState } from "react";
import RegisterModal from "../components/RegisterModal";

const LandingPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegModal, setShowRegModal] = useState(true);

  return (
    <div>
      <Navbar setShowLoginModal={setShowLoginModal} />
      <RegisterModal
        showRegModal={showRegModal}
        setShowLoginModal={setShowLoginModal}
        setShowRegModal={setShowRegModal}
      />
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        setShowRegModal={setShowRegModal}
      />
    </div>
  );
};

export default LandingPage;
