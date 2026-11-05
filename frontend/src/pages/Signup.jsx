import "./Login.css";
import "./Signup.css";

export default function Signup({ onBackToLogin }) {
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

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-field">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">University email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@kfupm.edu.sa"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                aria-describedby="password-hint"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Enter your password again"
                autoComplete="new-password"
                required
              />
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