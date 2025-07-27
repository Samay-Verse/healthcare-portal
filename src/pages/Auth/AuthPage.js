import React, { useState } from "react";
import "./AuthPage.css"; // Import the external CSS fileimport Iridescence from "../../components/Iridescence";

const LoginPage = () => {
  const [username, setUsername] = useState("Aya_99@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Sample validation logic - you can replace with real auth
    if (username !== "Aya_99@gmail.com" || password !== "password") {
      setError(true);
    } else {
      setError(false);
      alert("Logged in");
    }
  };

  return (
    <div className="container" aria-label="Hospital login page with animated doctor illustration and login form">
      {/* Animated background */}
      <Iridescence 
        className="auth-background"
        color={[0.2, 0.6, 1.0]} // Blue theme to match hospital branding
        speed={0.8}
        amplitude={0.15}
        mouseReact={true}
      />

      <section className="left" aria-labelledby="welcome-heading">
        <h1 id="welcome-heading">
          HELLO<span className="highlight">!</span>
        </h1>
        {/* Corrected typo from "entre" to "enter" */}
        <p>Please enter your details to continue</p>

        <div className="doctor-wrapper" aria-hidden="true">
          <div className="doctor">
            <div className="coat"></div>
            <div className="coat-shadow"></div>
            <div className="coat-shadow-right"></div>
            <div className="stethoscope-circle"></div>
            <div className="stethoscope-inner"></div>
            <div className="stethoscope-tube-left"></div>
            <div className="stethoscope-tube-right"></div>
            <div className="stethoscope-ear-tip left"></div>
            <div className="stethoscope-ear-tip right"></div>
            <div className="body"></div>
            <div className="head">
              <div className="hair"></div>
              <div className="ear left"></div>
              <div className="ear right"></div>
              <div className="eyes">
                <div className="eye left">
                  <div className="pupil"></div>
                </div>
                <div className="eye right">
                  <div className="pupil"></div>
                </div>
              </div>
              <div className="nose"></div>
              <div className="mouth"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="decor-circle decor-circle1"></div>
        <div className="decor-circle decor-circle2"></div>
        <div className="decor-circle decor-circle3"></div>
        <div className="ring ring1"></div>
        <div className="ring ring2"></div>
      </section>

      <section className="right" aria-label="User login form">
        <div className="logo" aria-level="1" role="heading">
          LOGO Hospital
        </div>
        <form onSubmit={handleLogin} noValidate>
          <label htmlFor="username-input">Username or E-mail</label>
          <input
            id="username-input"
            type="email"
            aria-describedby="username-help"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />

          <label htmlFor="password-input">Password</label>
          <div className={error ? "password-wrapper error" : "password-wrapper"}>
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-describedby={error ? "password-error" : undefined}
              aria-invalid={error}
              required
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={handlePasswordToggle}
              className="toggle-password"
              tabIndex={-1}
            >
              {showPassword ? (
                <svg width="18" height="18" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                  <path d="M17.94 17.94a10 10 0 0 1-14-14M1 1l22 22" />
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <div id="password-error" className="error-message" role="alert">
              The username or password is incorrect
            </div>
          )}

          <button type="submit" className="login-btn" aria-label="Log in to your account">Log in</button>
        </form>

        <div className="links">
          {/* Corrected typo from "Forget" to "Forgot" */}
          <a href="#forgot-password" onClick={(e) => e.preventDefault()}>
            Forgot Password?
          </a>
        </div>
        <div className="bottom-text">
          {/* Improved grammar */}
          Don't have an account?{" "}
          <a href="#sign-up" onClick={(e) => e.preventDefault()}>
            Sign Up
          </a>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;