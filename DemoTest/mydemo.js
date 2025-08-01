import React, { useEffect, useState } from 'react';
import Iridescence from '../../components/Iridescence';
import './AuthPage.css';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set initial state - show sign in by default
    const signInContainer = document.querySelector('.sign-in-container');
    const signUpContainer = document.querySelector('.sign-up-container');
    
    if (signInContainer && signUpContainer) {
      signInContainer.classList.add('active');
      signUpContainer.classList.remove('active');
    }

    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        setIsLoading(true);
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorElement = document.getElementById('login-error');
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Signing In...';
        
        try {
          const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
          
          const data = await response.json();
          
          if (response.ok && data.token) {
            localStorage.setItem('token', data.token);
            
            // Show success state
            submitButton.textContent = 'Success! Redirecting...';
            submitButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Redirect after a brief delay
            setTimeout(() => {
              window.location.href = `preferences.html?token=${data.token}`;
            }, 1000);
          } else {
            throw new Error(data.message || 'Login failed');
          }
        } catch (err) {
          errorElement.textContent = err.message || 'Network error. Please try again.';
          errorElement.style.display = 'block';
          
          // Reset button
          submitButton.disabled = false;
          submitButton.textContent = 'Sign In';
          
          // Hide error after 5 seconds
          setTimeout(() => {
            errorElement.style.display = 'none';
          }, 5000);
        } finally {
          setIsLoading(false);
        }
      });
    }

    // Handle social authentication
    const socialAuthButtons = document.querySelectorAll('.social-auth-button');
    socialAuthButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const provider = this.dataset.provider;
        
        // Add loading state
        const originalText = this.textContent;
        this.textContent = `Connecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)}...`;
        this.style.opacity = '0.7';
        
        // Redirect to OAuth
        window.location.href = `http://localhost:3000/auth/${provider}`;
      });
    });
    
    // Handle legacy social buttons in sign-in form
    const signInSocialButtons = document.querySelectorAll('.sign-in-container .social');
    signInSocialButtons.forEach((button) => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const iconClass = this.querySelector('i').className;
        let provider = '';
        
        if (iconClass.includes('google')) {
          provider = 'google';
        } else if (iconClass.includes('github')) {
          provider = 'github';
        }
        
        if (provider) {
          window.location.href = `http://localhost:3000/auth/${provider}`;
        }
      });
    });

    // Cleanup function
    return () => {
      if (loginForm) {
        loginForm.removeEventListener('submit', () => {});
      }
    };
  }, []);

  const toggleForm = () => {
    const signInContainer = document.querySelector('.sign-in-container');
    const signUpContainer = document.querySelector('.sign-up-container');
    
    if (signInContainer && signUpContainer) {
      if (isSignUp) {
        // Switch to sign in
        signUpContainer.classList.remove('active');
        signUpContainer.classList.add('switching');
        
        setTimeout(() => {
          signInContainer.classList.add('active');
          signInContainer.classList.add('switching');
          signUpContainer.classList.remove('switching');
        }, 200);
        
        setTimeout(() => {
          signInContainer.classList.remove('switching');
        }, 600);
      } else {
        // Switch to sign up
        signInContainer.classList.remove('active');
        signInContainer.classList.add('switching');
        
        setTimeout(() => {
          signUpContainer.classList.add('active');
          signUpContainer.classList.add('switching');
          signInContainer.classList.remove('switching');
        }, 200);
        
        setTimeout(() => {
          signUpContainer.classList.remove('switching');
        }, 600);
      }
    }
    
    setIsSignUp(!isSignUp);
  };

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
      
      <div className="container">
        <div className="auth-card">
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form>
              <h2 className="signup-heading">Create Account</h2>
              <p className="subtitle">Join thousands of users and start your journey today</p>
              
              <div className="social-auth-section">
                <a href="#" className="social-auth-button google-login-button" data-provider="google">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="social-icon"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  Continue with Google
                </a>
                
                <a href="#" className="social-auth-button github-login-button" data-provider="github">
                  <i className="fab fa-github social-icon"></i>
                  Continue with GitHub
                </a>
              </div>
              
              <div className="toggle-section">
                <p className="toggle-text">Already have an account?</p>
                <button type="button" className="toggle-button" onClick={toggleForm}>
                  Sign In
                </button>
              </div>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container active">
            <form id="login-form">
              <h1>Welcome Back</h1>
              <p className="subtitle">Sign in to your account to continue</p>
              
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-github"></i>
                </a>
              </div>
              
              <div className="divider">
                <span className="divider-text">or continue with email</span>
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="login-email">Email Address</label>
                <input 
                  type="email" 
                  id="login-email" 
                  placeholder="Enter your email" 
                  required 
                />
              </div>
              
              <div className="input-group">
                <label className="input-label" htmlFor="login-password">Password</label>
                <input 
                  type="password" 
                  id="login-password" 
                  placeholder="Enter your password" 
                  required 
                />
              </div>
              
              <a href="#" className="forgot">Forgot your password?</a>
              
              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <div className="error-message" id="login-error"></div>
              
              <div className="toggle-section">
                <p className="toggle-text">Don't have an account?</p>
                <button type="button" className="toggle-button" onClick={toggleForm}>
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;