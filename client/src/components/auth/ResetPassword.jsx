import React, { useState } from 'react';
import '../../styles/auth.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for reset password logic
    setMessage('If this email is registered, you will receive reset instructions.');
  };

  return (
    <section className="auth-section max-w-md mx-auto p-4">
      <h2 className="auth-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
        </label>
        <button
          type="submit"
          className="auth-button"
        >
          Send Reset Instructions
        </button>
      </form>
      {message && <p className="auth-message auth-message-success">{message}</p>}
    </section>
  );
};

export default ResetPassword;
