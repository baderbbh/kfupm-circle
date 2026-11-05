import { useState } from "react";
import "./VerifyEmail.css";

export default function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const universityEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@kfupm\.edu\.sa$/.test(universityEmail)) {
      setError("Use your @kfupm.edu.sa email address.");
      return;
    }

    setEmail(universityEmail);
    setError("");
    setSent(true);
  }

  return (
    <main className="verification-page">
      <div className="verification-brand">
        <span className="verification-logo">K</span>
        <span>KFUPM Circle</span>
      </div>

      <section className="verification-card">
        <p className="verification-label">PASSWORD RECOVERY</p>

        {sent ? (
          <>
            <h1>Check your inbox</h1>

            <p className="verification-description">
              If an account exists for <strong>{email}</strong>, you will
              receive a password reset link.
            </p>

            <p className="demo-code">
              This is a demo. No email has been sent.
            </p>
          </>
        ) : (
          <>
            <h1>Forgot your password?</h1>

            <p className="verification-description">
              Enter your university email to request a password reset link.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="recoveryEmail">University email</label>
              <input
                id="recoveryEmail"
                name="email"
                type="email"
                placeholder="name@kfupm.edu.sa"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "recovery-error" : undefined}
                required
              />

              {error && (
                <p
                  id="recovery-error"
                  className="verification-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <button type="submit" className="verify-button">
                Send reset link
              </button>
            </form>
          </>
        )}

        <p className="resend-prompt">
          <button type="button" onClick={onBackToLogin}>
            ← Back to login
          </button>
        </p>
      </section>
    </main>
  );
}