import { useState } from "react";
import "./Login.css";
import "./Signup.css";

export default function Signup({
  onBackToLogin,
  onCreateAccount,
  existingEmails,
}) {
  const [errors, setErrors] = useState({});

  function handleSignup(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const fullName = form.get("fullName").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Enter your full name.";
    }

    if (!email) {
      newErrors.email = "Enter your university email.";
    } else if (!/^[^\s@]+@kfupm\.edu\.sa$/.test(email)) {
      newErrors.email = "Use your @kfupm.edu.sa email address.";
    } else if (existingEmails.includes(email)) {
      newErrors.email = "An account with this email already exists.";
    }

    if (!password) {
      newErrors.password = "Enter a password.";
    } else if (
      password.length < 8 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      newErrors.password =
        "Use at least 8 characters, including a letter and number.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords must match.";
    }

    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];

    if (firstError) {
      event.currentTarget.elements.namedItem(firstError).focus();
      return;
    }

    onCreateAccount({ fullName, email });
  }

  return (
    <main className="login-page signup-page">
      <section className="login-intro">
        <div className="login-brand">
          <span className="brand-icon">K</span>
          <span>KFUPM Circle</span>
        </div>

        <div className="intro-content">
          <p className="intro-label">JOIN YOUR CAMPUS COMMUNITY</p>
          <h1>
            Meaningful connections start
            <br />
            with something in common.
          </h1>
          <p className="intro-description">
            Find classmates, activity companions, and communities across KFUPM.
          </p>
        </div>

        <div className="intro-footer">
          <p>Available to verified KFUPM students only.</p>
        </div>
      </section>

      <section className="login-form-panel">
        <div className="login-form-content">
          <button
            type="button"
            className="back-to-login"
            onClick={onBackToLogin}
          >
            ← Back to login
          </button>

          <h2>Create your account</h2>
          <p className="login-description">
            Use your university email to get started.
          </p>

          <form onSubmit={handleSignup} noValidate>
            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "name-error" : undefined}
                required
              />
              {errors.fullName && (
                <p id="name-error" className="field-error">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="email">University email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@kfupm.edu.sa"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                required
              />
              {errors.email && (
                <p id="email-error" className="field-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password
                    ? "password-hint password-error"
                    : "password-hint"
                }
                required
              />
              {errors.password && (
                <p id="password-error" className="field-error">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword ? "confirm-error" : undefined
                }
                required
              />
              {errors.confirmPassword && (
                <p id="confirm-error" className="field-error">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <p id="password-hint" className="password-hint">
              At least 8 characters, including a letter and number.
            </p>


            <button type="submit" className="sign-in-button">
              Create account
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}