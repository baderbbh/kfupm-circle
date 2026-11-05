import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";

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

  return <Login onCreateAccount={() => setPage("signup")} />;
}