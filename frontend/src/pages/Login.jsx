import { useState } from "react";
import "./Login.css";

export default function Login({
  onCreateAccount,
  onForgotPassword,
  demoPassword,
}) {
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  function handleLogin(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    setError("");
    setSignedIn(false);

if (email !== "student@kfupm.edu.sa" || password !== demoPassword) {
      setError("Incorrect email or password. Please try again.");
      return;
    }

    setSignedIn(true);
  }

  return (
    <main className="login-page">
      <section className="login-intro">
        <div className="login-brand">
          <span className="brand-icon">K</span>
          <span>KFUPM Circle</span>
        </div>

        <div className="intro-content">
          <p className="intro-label">YOUR UNIVERSITY COMMUNITY</p>
          <h1>
            Find your people.
            <br />
            Do more together.
          </h1>
          <p className="intro-description">
            Connect through shared courses, interests, clubs, and campus
            activities.
          </p>
        </div>

        <div className="intro-footer">
          <div className="student-avatars" aria-hidden="true">
            <span>AA</span>
            <span>KQ</span>
            <span>SM</span>
          </div>
          <p>Built for the KFUPM student community</p>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-content">
          <p className="welcome-label">WELCOME BACK</p>
          <h2>Sign in to KFUPM Circle</h2>
          <p className="login-description">
            Enter your university account details.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="email">University email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@kfupm.edu.sa"
                autoComplete="username"
                pattern=".+@kfupm[.]edu[.]sa"
                title="Use your KFUPM email address, such as name@kfupm.edu.sa."
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" />
                Remember me
              </label>
              <button
                type="button"
                className="text-button"
                onClick={onForgotPassword}
                >
                Forgot password?
                </button>
            </div>

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            {signedIn && (
              <p className="login-success" role="status">
                Demo sign-in successful.
              </p>
            )}

            <button type="submit" className="sign-in-button">
              Sign in
            </button>
          </form>

          <div className="signup-prompt">
            <span>New to KFUPM Circle?</span>
            <button
            type="button"
            className="text-button"
            onClick={onCreateAccount}
            >
            Create an account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}