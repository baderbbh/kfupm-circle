export default function Login() {
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
          <p className="login-description">Enter your university account details.</p>

          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-field">
              <label htmlFor="email">University email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@kfupm.edu.sa"
                autoComplete="username"
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
              <button type="button" className="text-button">
                Forgot password?
              </button>
            </div>

            <button type="submit" className="sign-in-button">
              Sign in
            </button>
          </form>

          <div className="signup-prompt">
            <span>New to KFUPM Circle?</span>
            <button type="button" className="text-button">
              Create an account
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}