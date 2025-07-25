import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    // Backend URL from environment variables
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:5000';

    // Professional business testimonials/features
    const slidesData = [
        {
            icon: '🏥',
            title: 'Enterprise Healthcare Solutions',
            description: 'Streamline your healthcare operations with our comprehensive management platform trusted by leading medical institutions worldwide.'
        },
        {
            icon: '👨‍⚕️',
            title: 'Expert Medical Network',
            description: 'Connect with certified healthcare professionals and access specialized medical expertise across multiple disciplines and specialties.'
        },
        {
            icon: '📊',
            title: 'Advanced Analytics Dashboard',
            description: 'Make data-driven decisions with real-time insights, performance metrics, and comprehensive reporting tools for better outcomes.'
        },
        {
            icon: '🔒',
            title: 'HIPAA-Compliant Security',
            description: 'Your data is protected with enterprise-grade security, encryption, and full compliance with healthcare regulations and standards.'
        },
        {
            icon: '⚡',
            title: '24/7 Premium Support',
            description: 'Get immediate assistance from our dedicated support team whenever you need help with your healthcare operations and workflows.'
        }
    ];

    // Auto-rotate slides
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
        }, 4000);
        return () => clearInterval(slideInterval);
    }, [slidesData.length]);

    // Custom alert function
    const showAlert = (message, type = 'info') => {
        const alertBox = document.createElement('div');
        alertBox.className = `custom-alert custom-alert-${type}`;
        alertBox.innerHTML = `
            <div class="alert-content">
                <div class="alert-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</div>
                <span>${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            if (alertBox.parentNode) {
                alertBox.remove();
            }
        }, 5000);
    };

    // Form validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    // Form handlers
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;

        // Client-side validation
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            setIsLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            showAlert('Password must be at least 6 characters long.', 'error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/user-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': BACKEND_URL
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('Welcome back! Login successful', 'success');
                setTimeout(() => {
                    navigate(data.redirect || '/dashboard');
                }, 1500);
            } else {
                showAlert(data.error || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Login request failed:', error);
            showAlert('Network error. Please check your connection and try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const name = e.target.signupName.value;
        const email = e.target.signupEmail.value;
        const password = e.target.signupPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        // Client-side validation
        if (name.trim().length < 2) {
            showAlert('Name must be at least 2 characters long.', 'error');
            setIsLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            setIsLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            showAlert('Password must be at least 6 characters long.', 'error');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            showAlert('Passwords do not match.', 'error');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BACKEND_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': BACKEND_URL
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                showAlert('Account created successfully! Please login to continue.', 'success');
                setTimeout(() => {
                    setActiveTab('login');
                }, 1500);
            } else {
                showAlert(data.error || 'Signup failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Signup request failed:', error);
            showAlert('Network error. Please check your connection and try again.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${BACKEND_URL}/login`;
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
                
                :root {
                    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                    --font-display: 'Manrope', var(--font-sans);
                    --ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
                    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

                    --bg-primary: #ffffff;
                    --bg-secondary: #fdfdff;
                    --text-primary: #1a202c;
                    --text-secondary: #525f7f;
                    --border-primary: #eef2f7;
                    --shadow-sm: 0 2px 4px rgba(50, 50, 93, 0.05), 0 1px 2px rgba(0, 0, 0, 0.05);
                    --shadow-md: 0 7px 14px rgba(50, 50, 93, 0.08), 0 3px 6px rgba(0, 0, 0, 0.06);
                    --shadow-lg: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.08);

                    --blue-bg: #eef6ff; --blue-fg: #2563eb; --blue-btn: #3b82f6; --blue-btn-hover: #2563eb; --blue-ring: rgba(59, 130, 246, 0.5);
                    --green-bg: #f0fdf4; --green-fg: #16a34a; --green-btn: #22c55e; --green-btn-hover: #16a34a; --green-ring: rgba(34, 197, 94, 0.5);
                    --purple-bg: #faf5ff; --purple-fg: #9333ea; --purple-btn: #a855f7; --purple-btn-hover: #9333ea; --purple-ring: rgba(168, 85, 247, 0.5);
                    --red-fg: #e11d48; --red-bg-hover: #e11d48;
                    --orange-fg: #ea580c; --orange-bg: #fff7ed;
                }

                @media (prefers-color-scheme: dark) {
                    :root {
                        --bg-primary: #0b1120; --bg-secondary: #1d273a; --text-primary: #e2e8f0;
                        --text-secondary: #94a3b8; --border-primary: #38475f;
                        --shadow-sm: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
                        --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -4px rgba(0, 0, 0, 0.15);
                        --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.2);
                        --red-fg: #f87171; --red-bg-hover: #ef4444;
                    }
                }

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body {
                    font-family: var(--font-sans);
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    line-height: 1.6;
                    overflow-x: hidden;
                }

                .auth-container {
                    min-height: 100vh;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
                }

                /* Left Panel - Brand & Features */
                .brand-panel {
                    background: linear-gradient(135deg, var(--blue-btn) 0%, var(--purple-btn) 100%);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 4rem 3rem;
                    color: white;
                    position: relative;
                    overflow: hidden;
                }

                .brand-panel::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                    opacity: 0.3;
                }

                .brand-header {
                    position: relative;
                    z-index: 2;
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }

                .brand-icon {
                    width: 3rem;
                    height: 3rem;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .brand-name {
                    font-family: var(--font-display);
                    font-size: 1.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .brand-tagline {
                    font-size: 1.125rem;
                    opacity: 0.9;
                    font-weight: 400;
                    line-height: 1.5;
                }

                .features-showcase {
                    position: relative;
                    z-index: 2;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 2rem 0;
                }

                .feature-slide {
                    text-align: center;
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.6s var(--ease-out-expo);
                    position: absolute;
                    width: 100%;
                }

                .feature-slide.active {
                    opacity: 1;
                    transform: translateY(0);
                }

                .feature-icon {
                    font-size: 3.5rem;
                    margin-bottom: 1.5rem;
                    display: block;
                }

                .feature-title {
                    font-family: var(--font-display);
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                    line-height: 1.3;
                }

                .feature-description {
                    font-size: 1rem;
                    opacity: 0.9;
                    line-height: 1.6;
                    max-width: 24rem;
                }

                .slide-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    position: relative;
                    z-index: 2;
                }

                .slide-dot {
                    width: 0.5rem;
                    height: 0.5rem;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    transition: all 0.3s var(--ease-in-out-cubic);
                }

                .slide-dot.active {
                    background: white;
                    transform: scale(1.2);
                }

                /* Right Panel - Auth Forms */
                .auth-panel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    background: var(--bg-primary);
                }

                .auth-card {
                    width: 100%;
                    max-width: 28rem;
                    background: var(--bg-secondary);
                    border-radius: 1.5rem;
                    padding: 3rem 2.5rem;
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border-primary);
                }

                .auth-header {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .auth-title {
                    font-family: var(--font-display);
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.02em;
                }

                .auth-subtitle {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .auth-tabs {
                    display: flex;
                    background: var(--bg-primary);
                    border-radius: 0.75rem;
                    padding: 0.25rem;
                    margin-bottom: 2rem;
                    border: 1px solid var(--border-primary);
                }

                .tab-button {
                    flex: 1;
                    padding: 0.75rem 1rem;
                    background: transparent;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s var(--ease-in-out-cubic);
                    color: var(--text-secondary);
                }

                .tab-button.active {
                    background: var(--blue-btn);
                    color: white;
                    box-shadow: var(--shadow-sm);
                }

                .auth-form {
                    display: none;
                }

                .auth-form.active {
                    display: block;
                }

                .form-group {
                    margin-bottom: 1.25rem;
                }

                .form-label {
                    display: block;
                    font-weight: 500;
                    color: var(--text-primary);
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .input-container {
                    position: relative;
                }

                .form-input {
                    width: 100%;
                    padding: 0.875rem 1rem;
                    border: 1.5px solid var(--border-primary);
                    border-radius: 0.75rem;
                    font-size: 0.95rem;
                    font-family: var(--font-sans);
                    background: var(--bg-primary);
                    color: var(--text-primary);
                    transition: all 0.2s var(--ease-in-out-cubic);
                }

                .form-input:focus {
                    outline: none;
                    border-color: var(--blue-btn);
                    box-shadow: 0 0 0 3px var(--blue-ring);
                }

                .form-input::placeholder {
                    color: var(--text-secondary);
                }

                .password-toggle {
                    position: absolute;
                    right: 0.75rem;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    color: var(--text-secondary);
                    cursor: pointer;
                    padding: 0.25rem;
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }

                .password-toggle:hover {
                    color: var(--blue-btn);
                }

                .form-options {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    font-size: 0.85rem;
                }

                .checkbox-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-secondary);
                }

                .checkbox-container input[type="checkbox"] {
                    width: auto;
                    margin: 0;
                }

                .forgot-link {
                    color: var(--blue-btn);
                    text-decoration: none;
                    font-weight: 500;
                    transition: color 0.2s;
                }

                .forgot-link:hover {
                    color: var(--blue-btn-hover);
                    text-decoration: underline;
                }

                .submit-button {
                    width: 100%;
                    padding: 0.875rem;
                    background: var(--blue-btn);
                    color: white;
                    border: none;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.2s var(--ease-in-out-cubic);
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }

                .submit-button:hover:not(:disabled) {
                    background: var(--blue-btn-hover);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-md);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .button-spinner {
                    display: inline-block;
                    width: 1rem;
                    height: 1rem;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .divider {
                    text-align: center;
                    margin: 1.5rem 0;
                    position: relative;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    font-weight: 500;
                }

                .divider::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: var(--border-primary);
                    z-index: 1;
                }

                .divider span {
                    background: var(--bg-secondary);
                    padding: 0 1rem;
                    position: relative;
                    z-index: 2;
                }

                .google-button {
                    width: 100%;
                    padding: 0.875rem;
                    background: var(--bg-primary);
                    border: 1.5px solid var(--border-primary);
                    border-radius: 0.75rem;
                    font-weight: 500;
                    font-size: 0.95rem;
                    cursor: pointer;
                    transition: all 0.2s var(--ease-in-out-cubic);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    color: var(--text-primary);
                }

                .google-button:hover {
                    background: var(--bg-secondary);
                    border-color: var(--text-secondary);
                    transform: translateY(-1px);
                    box-shadow: var(--shadow-sm);
                }

                .google-icon {
                    width: 1.25rem;
                    height: 1.25rem;
                }

                /* Custom Alert Styles */
                .custom-alert {
                    position: fixed;
                    top: 1.5rem;
                    right: 1.5rem;
                    z-index: 1000;
                    background: white;
                    border-radius: 0.75rem;
                    padding: 1rem 1.25rem;
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border-primary);
                    min-width: 20rem;
                    max-width: 25rem;
                    animation: slideIn 0.3s var(--ease-out-expo), slideOut 0.3s var(--ease-out-expo) 4.7s forwards;
                }

                .alert-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .alert-icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.875rem;
                    flex-shrink: 0;
                }

                .alert-close {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    padding: 0;
                    margin-left: auto;
                    transition: color 0.2s;
                }

                .alert-close:hover {
                    color: var(--text-primary);
                }

                .custom-alert-success .alert-icon {
                    background: var(--green-bg);
                    color: var(--green-fg);
                }

                .custom-alert-error .alert-icon {
                    background: #fef2f2;
                    color: var(--red-fg);
                }

                .custom-alert-info .alert-icon {
                    background: var(--blue-bg);
                    color: var(--blue-fg);
                }

                .custom-alert span {
                    color: var(--text-primary);
                    font-weight: 500;
                    font-size: 0.9rem;
                    flex: 1;
                }

                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }

                /* Form Validation Styles */
                .form-input.error {
                    border-color: var(--red-fg);
                    box-shadow: 0 0 0 3px rgba(225, 29, 72, 0.1);
                }

                .form-input.success {
                    border-color: var(--green-fg);
                    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
                }

                .password-strength {
                    margin-top: 0.5rem;
                    font-size: 0.8rem;
                }

                .strength-indicator {
                    display: flex;
                    gap: 0.25rem;
                    margin-bottom: 0.25rem;
                }

                .strength-bar {
                    height: 0.25rem;
                    flex: 1;
                    background: var(--border-primary);
                    border-radius: 0.125rem;
                    transition: background-color 0.3s;
                }

                .strength-bar.weak { background: var(--red-fg); }
                .strength-bar.medium { background: var(--orange-fg); }
                .strength-bar.strong { background: var(--green-fg); }

                .strength-text {
                    color: var(--text-secondary);
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .auth-container {
                        grid-template-columns: 1fr;
                    }

                    .brand-panel {
                        padding: 2rem;
                        min-height: 50vh;
                    }

                    .features-showcase {
                        margin: 1rem 0;
                    }

                    .feature-slide {
                        position: static;
                    }

                    .auth-card {
                        margin-top: -2rem;
                        border-top-left-radius: 2rem;
                        border-top-right-radius: 2rem;
                    }
                }

                @media (max-width: 640px) {
                    .brand-panel {
                        padding: 1.5rem;
                        text-align: center;
                    }

                    .auth-card {
                        padding: 2rem 1.5rem;
                        margin: 0 1rem;
                        margin-top: -2rem;
                    }

                    .auth-title {
                        font-size: 1.75rem;
                    }

                    .custom-alert {
                        right: 1rem;
                        left: 1rem;
                        min-width: auto;
                        max-width: none;
                    }

                    .form-options {
                        flex-direction: column;
                        gap: 0.75rem;
                        align-items: flex-start;
                    }
                }

                @media (max-width: 480px) {
                    .brand-panel {
                        padding: 1rem;
                    }

                    .auth-card {
                        padding: 1.5rem 1rem;
                        margin: 0 0.5rem;
                        margin-top: -1rem;
                    }

                    .feature-icon {
                        font-size: 2.5rem;
                    }

                    .feature-title {
                        font-size: 1.25rem;
                    }

                    .feature-description {
                        font-size: 0.9rem;
                    }
                }

                /* Loading State */
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    backdrop-filter: blur(2px);
                }

                .loading-spinner {
                    width: 3rem;
                    height: 3rem;
                    border: 3px solid var(--border-primary);
                    border-top-color: var(--blue-btn);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                /* Focus States */
                .tab-button:focus-visible,
                .submit-button:focus-visible,
                .google-button:focus-visible,
                .password-toggle:focus-visible {
                    outline: 2px solid var(--blue-btn);
                    outline-offset: 2px;
                }

                /* Accessibility */
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                /* Animation for form switching */
                .auth-form {
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all 0.3s var(--ease-out-expo);
                }

                .auth-form.active {
                    display: block;
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Hover effects for interactive elements */
                .slide-dot:hover {
                    background: rgba(255, 255, 255, 0.7);
                    transform: scale(1.1);
                }

                .checkbox-container:hover {
                    color: var(--text-primary);
                }

                /* Success/Error input styling */
                .input-feedback {
                    font-size: 0.8rem;
                    margin-top: 0.25rem;
                    display: none;
                }

                .input-feedback.show {
                    display: block;
                }

                .input-feedback.error {
                    color: var(--red-fg);
                }

                .input-feedback.success {
                    color: var(--green-fg);
                }
            `}</style>

            <div className="auth-container">
                {/* Left Panel - Brand & Features */}
                <div className="brand-panel">
                    <div className="brand-header">
                        <div className="brand-logo">
                            <div className="brand-icon">🏥</div>
                            <div className="brand-name">VandanaHub</div>
                        </div>
                        <p className="brand-tagline">
                            Empowering healthcare professionals with cutting-edge technology and comprehensive management solutions.
                        </p>
                    </div>

                    <div className="features-showcase">
                        {slidesData.map((slide, index) => (
                            <div
                                key={index}
                                className={`feature-slide ${index === currentSlide ? 'active' : ''}`}
                            >
                                <span className="feature-icon" role="img" aria-label={slide.title}>
                                    {slide.icon}
                                </span>
                                <h3 className="feature-title">{slide.title}</h3>
                                <p className="feature-description">{slide.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="slide-indicators">
                        {slidesData.map((_, index) => (
                            <button
                                key={index}
                                className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Panel - Auth Forms */}
                <div className="auth-panel">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h1 className="auth-title">
                                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="auth-subtitle">
                                {activeTab === 'login' 
                                    ? 'Sign in to your account to continue' 
                                    : 'Join thousands of healthcare professionals'
                                }
                            </p>
                        </div>

                        <div className="auth-tabs" role="tablist">
                            <button
                                className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => setActiveTab('login')}
                                role="tab"
                                aria-selected={activeTab === 'login'}
                                aria-controls="login-form"
                            >
                                Sign In
                            </button>
                            <button
                                className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
                                onClick={() => setActiveTab('signup')}
                                role="tab"
                                aria-selected={activeTab === 'signup'}
                                aria-controls="signup-form"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Login Form */}
                        <form
                            id="login-form"
                            className={`auth-form ${activeTab === 'login' ? 'active' : ''}`}
                            onSubmit={handleLoginSubmit}
                            role="tabpanel"
                            aria-labelledby="login-tab"
                        >
                            <div className="form-group">
                                <label className="form-label" htmlFor="loginEmail">
                                    Email Address
                                </label>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        id="loginEmail"
                                        name="loginEmail"
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        required
                                        autoComplete="email"
                                        aria-describedby="email-help"
                                    />
                                </div>
                                <div className="input-feedback" id="email-help"></div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="loginPassword">
                                    Password
                                </label>
                                <div className="input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="loginPassword"
                                        name="loginPassword"
                                        className="form-input"
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        aria-describedby="password-help"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => togglePasswordVisibility('password')}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                                <div className="input-feedback" id="password-help"></div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" id="remember-me" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="forgot-link">Forgot password?</a>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button" 
                                disabled={isLoading}
                                aria-describedby="login-status"
                            >
                                {isLoading && <span className="button-spinner" aria-hidden="true"></span>}
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>

                            <div className="divider">
                                <span>or continue with</span>
                            </div>

                            <button 
                                type="button" 
                                onClick={handleGoogleLogin} 
                                className="google-button"
                                disabled={isLoading}
                            >
                                <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        </form>

                        {/* Signup Form */}
                        <form
                            id="signup-form"
                            className={`auth-form ${activeTab === 'signup' ? 'active' : ''}`}
                            onSubmit={handleSignupSubmit}
                            role="tabpanel"
                            aria-labelledby="signup-tab"
                        >
                            <div className="form-group">
                                <label className="form-label" htmlFor="signupName">
                                    Full Name
                                </label>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="signupName"
                                        name="signupName"
                                        className="form-input"
                                        placeholder="Enter your full name"
                                        required
                                        autoComplete="name"
                                        minLength="2"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="signupEmail">
                                    Email Address
                                </label>
                                <div className="input-container">
                                    <input
                                        type="email"
                                        id="signupEmail"
                                        name="signupEmail"
                                        className="form-input"
                                        placeholder="Enter your email address"
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="signupPassword">
                                    Password
                                </label>
                                <div className="input-container">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="signupPassword"
                                        name="signupPassword"
                                        className="form-input"
                                        placeholder="Create a strong password"
                                        required
                                        autoComplete="new-password"
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => togglePasswordVisibility('password')}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="input-container">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-input"
                                        placeholder="Confirm your password"
                                        required
                                        autoComplete="new-password"
                                        minLength="6"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showConfirmPassword ? '🙈' : '👁️'}
                                    </button>
                                </div>
                            </div>

                            <div className="form-options">
                                <label className="checkbox-container">
                                    <input type="checkbox" required id="terms-agreement" />
                                    <span>
                                        I agree to the{' '}
                                        <a href="#" className="forgot-link">Terms of Service</a>
                                        {' '}and{' '}
                                        <a href="#" className="forgot-link">Privacy Policy</a>
                                    </span>
                                </label>
                            </div>

                            <button 
                                type="submit" 
                                className="submit-button" 
                                disabled={isLoading}
                            >
                                {isLoading && <span className="button-spinner" aria-hidden="true"></span>}
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                            </button>

                            <div className="divider">
                                <span>or continue with</span>
                            </div>

                            <button 
                                type="button" 
                                onClick={handleGoogleLogin} 
                                className="google-button"
                                disabled={isLoading}
                            >
                                <svg className="google-icon" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthPage;