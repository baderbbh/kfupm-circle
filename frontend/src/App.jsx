import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  const [page, setPage] = useState("login");
  const [registration, setRegistration] = useState(null);

  function handleCreateAccount(details) {
    setRegistration(details);
    setPage("verify");
  }

  if (page === "verify") {
    return <VerifyEmail email={registration.email} />;
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
    return <ForgotPassword onBackToLogin={() => setPage("login")} />;
  }

  return (
    <Login
      onCreateAccount={() => setPage("signup")}
      onForgotPassword={() => setPage("forgot-password")}
    />
  );
}