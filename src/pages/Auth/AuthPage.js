import React, { useEffect, useState } from 'react';
import Iridescence from '../../components/Iridescence';
import './AuthPage.css';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signInContainer = document.querySelector('.sign-in-container');
    const signUpContainer = document.querySelector('.sign-up-container');
    const switchAuthMethod = document.getElementById('switch-auth-method');

    const handleSignUpClick = () => {
      container.classList.add('right-panel-active');
    };

    const handleSignInClick = () => {
      container.classList.remove('right-panel-active');
    };
    
    const handleSwitchAuthMethod = () => {
      if (container.classList.contains('right-panel-active')) {
        handleSignInClick();
      } else {
        handleSignUpClick();
      }
    };
    
    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);
    }
    
    if (switchAuthMethod) {
      switchAuthMethod.addEventListener('click', handleSwitchAuthMethod);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        try {
          const response = await fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem('token', data.token);
            // Redirect to the dashboard or other page
            window.location.href = `/dashboard?token=${data.token}`;
            setSuccessMessage(data.message || 'Login successful!');
          } else {
            setErrorMessage(data.detail || 'Login failed.');
          }
        } catch (err) {
          setErrorMessage('Network error. Please try again.');
        }
      });
    }

    // New sign-up form submission logic
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            setErrorMessage('');
            setSuccessMessage('');
            try {
                const response = await fetch('http://localhost:8000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                if (response.ok) {
                    setSuccessMessage('Sign up successful! Please sign in.');
                    handleSignInClick();
                } else {
                    setErrorMessage(data.detail || 'Sign up failed.');
                }
            } catch (error) {
                setErrorMessage('Network error. Please try again.');
            }
        });
    }

    // Social auth buttons
    const socialAuthButtons = document.querySelectorAll('.social-auth-button');
    socialAuthButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const provider = this.dataset.provider;
        window.location.href = `http://localhost:8000/auth/${provider}`;
      });
    });

    const signInSocialButtons = document.querySelectorAll('.sign-in-container .social');
    signInSocialButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const provider = this.querySelector('i').className.split(' ')[1].split('-')[1];
        window.location.href = `http://localhost:8000/auth/${provider}`;
      });
    });

    return () => {
      if (signUpButton && signInButton && container) {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      }
      if (switchAuthMethod) {
        switchAuthMethod.removeEventListener('click', handleSwitchAuthMethod);
      }
    };
  }, []);

  // Update the render function to include the new elements
  return (
    <div className="auth-body">
      <Iridescence 
        color={[0.2, 0.4, 0.8]}
        speed={0.8}
        amplitude={0.05}
        mouseReact={true}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      />
      <canvas id="canvas"></canvas>
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form id="signup-form">
            <h2 className="signup-heading">Get Started in Seconds</h2>
            <div className="social-buttons-container">
              <a href="#" className="social-auth-button google-login-button" data-provider="google">
                {/* SVG for Google icon */}
                Continue with Google
              </a>
              <a href="#" className="social-auth-button github-login-button" data-provider="github">
                <i className="fab fa-github"></i>
                Continue with GitHub
              </a>
            </div>
            {/* <div className="divider">
              <span className="divider-text">OR</span>
            </div> */}
            {/* <input type="email" id="signup-email" placeholder="Email" required />
            <input
              type="password"
              id="signup-password"
              placeholder="Password"
              required
            /> */}
            {/* <button type="submit" className="email-signup-button">Sign Up</button>
            <p className="switch-auth-method">
                Already have an account? <span id="switch-to-sign-in">Sign In</span>
            </p> */}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form id="login-form">
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social" data-provider="google">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social" data-provider="github">
                <i className="fab fa-github"></i>
              </a>
            </div>
            <span className="small-text">or use your account</span>
            <input type="email" id="login-email" placeholder="Email" required />
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              required
            />
            <a href="#" className="forgot">
              Forgot your password?
            </a>
            <button type="submit">Sign In</button>
            <div className="error-message" id="login-error" style={{ display: errorMessage ? 'block' : 'none' }}>
                {errorMessage}
            </div>
            <div className="success-message" id="login-success" style={{ display: successMessage ? 'block' : 'none' }}>
                {successMessage}
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Creator!</h1>
              <p>Ready to start your journey? Click the button to sign up.</p>
              <button className="ghost" id="signUp">
                  Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;