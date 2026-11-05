import { useState } from "react";
import "./VerifyEmail.css";

export default function VerifyEmail({ email }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [verified, setVerified] = useState(false);
  const [verification, setVerification] = useState(() => ({
    code: "246810",
    expiresAt: Date.now() + 10 * 60 * 1000,
  }));

  function handleVerify(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setVerified(false);

    if (!/^[0-9]{6}$/.test(code)) {
      setError("Enter the six-digit verification code.");
      return;
    }

    if (code === "111111" || Date.now() > verification.expiresAt) {
      setError("This code has expired. Request another code.");
      return;
    }

    if (code !== verification.code) {
      setError("Incorrect verification code. Please try again.");
      return;
    }

    setVerified(true);
  }

  function handleResend() {
    const nextCode = verification.code === "246810" ? "654321" : "246810";

    setVerification({
      code: nextCode,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    setError("");
    setVerified(false);
    setNotice("A new demo code is ready. Use the code shown below.");
  }

  return (
    <main className="verification-page">
      <div className="verification-brand">
        <span className="verification-logo">K</span>
        <span>KFUPM Circle</span>
      </div>

      <section className="verification-card">
        <div className="verification-icon" aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M5 5h14v11H9l-4 4V5Z" />
          </svg>
        </div>

        <p className="verification-label">VERIFY YOUR UNIVERSITY EMAIL</p>
        <h1>Check your inbox</h1>
        <p className="verification-description">
          Enter the six-digit code for <strong>{email}</strong> to continue.
        </p>

        <form onSubmit={handleVerify} noValidate>
          <label htmlFor="verificationCode">Verification code</label>
          <input
            id="verificationCode"
            name="verificationCode"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            maxLength={6}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError("");
              setVerified(false);
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "verification-error" : undefined}
            required
          />

          {error && (
            <p id="verification-error" className="verification-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="verify-button">
            Verify email
          </button>
        </form>

        {verified && (
          <p className="verification-notice" role="status">
            Email verified successfully.
          </p>
        )}

        <p className="resend-prompt">
          Didn’t receive it?{" "}
          <button type="button" onClick={handleResend}>
            Resend code
          </button>
        </p>

        {notice && (
          <p className="verification-notice" role="status">
            {notice}
          </p>
        )}

        <p className="demo-code">
          Demo code: <strong>{verification.code}</strong>
          <br />
          Use 111111 for an expired code. No email is sent.
        </p>
      </section>
    </main>
  );
}