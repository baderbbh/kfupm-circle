import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfileSetup from "./pages/ProfileSetup";
import Home from "./pages/Home";
import ClubManagerHome from "./pages/ClubManagerHome";
import AdminHome from "./pages/AdminHome";

export default function App() {
  const [page, setPage] = useState("login");
  const [registration, setRegistration] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [profile, setProfile] = useState(null);

  const [accounts, setAccounts] = useState([
    {
      email: "ahmed@kfupm.edu.sa",
      password: "Circle123!",
      role: "student",
      fullName: "Ahmed Al-Dossary",
      major: "Software Engineering",
      biography:
        "Software engineering student interested in game development, user experience, and meeting people for campus activities.",
      courses: ["SWE 363", "SWE 387"],
      interests: ["Game development", "UX research"],
      hobbies: "Football, board games, hiking",
      activities: "Workshops, study sessions, hackathons",
      clubs: ["Coding Club"],
    },
    {
      email: "clubmanager@kfupm.edu.sa",
      password: "Circle123!",
      role: "club-manager",
      fullName: "Sara Mansour",
    },
    {
      email: "admin@kfupm.edu.sa",
      password: "Circle123!",
      role: "administrator",
      fullName: "Noor Al-Salem",
    },
  ]);

  function handleLogin(email, password) {
    const account = accounts.find(
      (account) =>
        account.email === email && account.password === password
    );

    if (!account) {
      return false;
    }

    if (account.role === "student") {
      setProfile({
        fullName: account.fullName,
        major: account.major,
        biography: account.biography,
        courses: account.courses,
        interests: account.interests,
        hobbies: account.hobbies,
        activities: account.activities,
        clubs: account.clubs,
      });
      setPage("home");
    } else {
      setProfile(null);
      setPage(account.role);
    }

    return true;
  }

  function handleSignOut() {
    setProfile(null);
    setRegistration(null);
    setResetEmail("");
    setPage("login");
  }

  function handleCreateAccount(details) {
    setRegistration(details);
    setPage("verify");
  }

  function handleOpenReset(email) {
    setResetEmail(email.trim().toLowerCase());
    setPage("reset-password");
  }

  function handleResetPassword(password) {
    const accountExists = accounts.some(
      (account) => account.email === resetEmail
    );

    if (!accountExists) {
      return false;
    }

    setAccounts((currentAccounts) =>
      currentAccounts.map((account) =>
        account.email === resetEmail
          ? { ...account, password }
          : account
      )
    );

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
        onAccountAccess={handleSignOut}
        onProfileChange={(details) =>
          setProfile((currentProfile) => ({ ...currentProfile, ...details }))
        }
      />
    );
  }

  if (page === "club-manager") {
    return <ClubManagerHome onSignOut={handleSignOut} />;
  }

  if (page === "administrator") {
    return <AdminHome onSignOut={handleSignOut} />;
  }

  if (page === "signup") {
    return (
      <Signup
        onBackToLogin={() => setPage("login")}
        onCreateAccount={handleCreateAccount}
        existingEmails={accounts.map((account) => account.email)}
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
      onLogin={handleLogin}
      onCreateAccount={() => setPage("signup")}
      onForgotPassword={() => setPage("forgot-password")}
    />
  );
}