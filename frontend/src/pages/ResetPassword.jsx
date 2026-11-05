import { useState } from "react";
import "./VerifyEmail.css";

export default function ResetPassword({
  onResetPassword,
  onBackToLogin,
}) {
  const [errors, setErrors] = useState({});
  const [complete, setComplete] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    const newErrors = {};

    if (
      password.length < 8 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      newErrors.password =
        "Use at least 8 characters, including a letter and number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your new password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];

    if (firstError) {
      event.currentTarget.elements.namedItem(firstError).focus();
      return;
    }

    const updated = onResetPassword(password);

    if (!updated) {
      setErrors({
        account: "This demo account was not found.",
      });
      return;
    }

    setComplete(true);
  }

  return (
    <main className="verification-page">
      <div className="verification-brand">
        <span className="verification-logo">K</span>
        <span>KFUPM Circle</span>
      </div>

      <section className="verification-card">
        <p className="verification-label">PASSWORD RECOVERY</p>

        {complete ? (
          <>
            <h1>Password updated</h1>
            <p className="verification-description" role="status">
              You can now sign in with your new password.
            </p>
            <button
              type="button"
              className="verify-button"
              onClick={onBackToLogin}
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <h1>Set a new password</h1>
            <p className="verification-description" id="reset-hint">
              Use at least 8 characters, including a letter and number.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="reset-field">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password
                      ? "reset-hint password-error"
                      : "reset-hint"
                  }
                  required
                />
                {errors.password && (
                  <p id="password-error" className="verification-error">
                    {errors.password}
                  </p>
                )}
              </div>

              <div className="reset-field">
                <label htmlFor="confirmPassword">Confirm new password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password again"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword ? "confirm-error" : undefined
                  }
                  required
                />
                {errors.confirmPassword && (
                  <p id="confirm-error" className="verification-error">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {errors.account && (
                <p className="verification-error" role="alert">
                  {errors.account}
                </p>
              )}

              <button type="submit" className="verify-button">
                Reset password
              </button>
            </form>

            <p className="resend-prompt">
              <button type="button" onClick={onBackToLogin}>
                ← Back to login
              </button>
            </p>
          </>
        )}
      </section>
    </main>
  );
}