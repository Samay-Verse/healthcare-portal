import React, { useEffect, useState } from 'react';
import Iridescence from '../../components/Iridescence';
import './AuthPage.css';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const signInContainer = document.querySelector('.sign-in-container');
    
    const handleSignUpClick = () => {
      // First hide the sign-in content
      if (signInContainer) {
        signInContainer.style.opacity = '0';
        signInContainer.style.visibility = 'hidden';
      }
      
      // After a short delay, move the container
      setTimeout(() => {
        container.classList.add('right-panel-active');
      }, 300);
    };

    const handleSignInClick = () => {
      // Remove the right-panel-active class first
      container.classList.remove('right-panel-active');
      
      // After the slide animation completes, show the sign-in content
      setTimeout(() => {
        if (signInContainer) {
          signInContainer.style.opacity = '1';
          signInContainer.style.visibility = 'visible';
        }
      }, 600); // Match the CSS transition duration
    };

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await response.json();
          if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = `preferences.html?token=${data.token}`;
          }

          if (response.ok) {
            window.location.href = `ChatUI.html?token=${data.token}`;
          } else {
            errorElement.textContent = data.message || 'Login failed';
            errorElement.style.display = 'block';
          }
        } catch (err) {
          errorElement.textContent = 'Network error. Please try again.';
          errorElement.style.display = 'block';
        }
      });
    }

    const socialAuthButtons = document.querySelectorAll('.social-auth-button');
    socialAuthButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const provider = this.dataset.provider;
        window.location.href = `http://localhost:3000/auth/${provider}`;
      });
    });
    
    const signInSocialButtons = document.querySelectorAll('.sign-in-container .social');
     signInSocialButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const provider = this.querySelector('i').className.split(' ')[1].split('-')[1];
        window.location.href = `http://localhost:3000/auth/${provider}`;
      });
    });

    return () => {
      if (signUpButton && signInButton && container) {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      }
    };
  }, []);

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
          <form>
            <h2 className="signup-heading">Get Started in Seconds</h2>
            <a href="#" className="social-auth-button google-login-button" data-provider="google">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="google-icon"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Continue with Google
            </a>
            <a href="#" className="social-auth-button github-login-button" data-provider="github">
                <i className="fab fa-github"></i>
                Continue with GitHub
            </a>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form id="login-form">
            <h1>Sign In</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social">
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
            <div className="error-message" id="login-error"></div>
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