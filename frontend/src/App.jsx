import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";

export default function App() {
  const [page, setPage] = useState("login");
  const [registration, setRegistration] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [demoPassword, setDemoPassword] = useState("Circle123!");
  const [profile, setProfile] = useState(null);

  function handleCreateAccount(details) {
    setRegistration(details);
    setPage("verify");
  }

  function handleOpenReset(email) {
    setResetEmail(email);
    setPage("reset-password");
  }

  function handleResetPassword(password) {
    if (resetEmail !== "student@kfupm.edu.sa") {
      return false;
    }

    setDemoPassword(password);
    return true;
  }

    function handleSaveProfile(details) {
      setProfile(details);
      setPage("home");
    }

  if (page === "verify") {
    return (
      <VerifyEmail
        email={registration.email}
        onVerified={() => setPage("profile-setup")}
      />
    );
  }

  if (page === "profile-setup") {
      return (
        <ProfileSetup
          fullName={registration.fullName}
          onComplete={handleSaveProfile}
        />
      );
    }

    if (page === "home") {
      return (
        <Home
          profile={profile}
          onAccountAccess={() => setPage("login")}
        />
      );
    }

  if (page === "signup") {
    return (
      <Signup
        onBackToLogin={() => setPage("login")}
        onCreateAccount={handleCreateAccount}
      />
    );
  }

  if (page === "forgot-password") {
    return (
      <ForgotPassword
        onBackToLogin={() => setPage("login")}
        onOpenReset={handleOpenReset}
      />
    );
  }

  if (page === "reset-password") {
    return (
      <ResetPassword
        onResetPassword={handleResetPassword}
        onBackToLogin={() => setPage("login")}
      />
    );
  }

  return (
    <Login
      demoPassword={demoPassword}
      onCreateAccount={() => setPage("signup")}
      onForgotPassword={() => setPage("forgot-password")}
    />
  );
}