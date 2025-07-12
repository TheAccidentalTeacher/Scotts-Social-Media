import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const { login, error, isLoading, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Clear errors when component mounts or when user starts typing
  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (formData.email || formData.password) {
      clearError();
      setFormErrors({});
    }
  }, [formData, clearError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      // Error is handled by the auth context
      console.log('Login failed:', result.error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="background-pattern"></div>
      </div>
      
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <div className="brand-logo">
              <span className="brand-emoji">👨‍🏫</span>
            </div>
            <h1>Welcome Back!</h1>
            <p>Sign in to your Accidental Teacher account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <FiMail className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
              </div>
              {formErrors.email && (
                <span className="form-error">{formErrors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${formErrors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formErrors.password && (
                <span className="form-error">{formErrors.password}</span>
              )}
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-lg login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FiLoader className="spinner" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="signup-text">
              Need help getting started? Contact support for assistance setting up your account.
            </p>
          </div>
        </div>

        <div className="login-info">
          <h2>The Accidental Teacher</h2>
          <p className="tagline">Empowering Educators, One Vibe-Code at a Time</p>
          
          <div className="features">
            <div className="feature">
              <div className="feature-icon">📅</div>
              <div className="feature-content">
                <h3>AI-Powered Content Calendar</h3>
                <p>Generate engaging content ideas for the next 3 months</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <div className="feature-content">
                <h3>Multi-Platform Publishing</h3>
                <p>Schedule and post to 8+ social media platforms</p>
              </div>
            </div>
            
            <div className="feature">
              <div className="feature-icon">📊</div>
              <div className="feature-content">
                <h3>Advanced Analytics</h3>
                <p>Track engagement and optimize your content strategy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
