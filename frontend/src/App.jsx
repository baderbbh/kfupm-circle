import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [page, setPage] = useState("login");

  if (page === "signup") {
    return <Signup onBackToLogin={() => setPage("login")} />;
  }

  return <Login onCreateAccount={() => setPage("signup")} />;
}