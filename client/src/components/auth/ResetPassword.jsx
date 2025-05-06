import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for reset password logic
    setMessage('If this email is registered, you will receive reset instructions.');
  };

  return (
    <section className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Send Reset Instructions
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
      >
        Login
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </section>
  );
};

export default ResetPassword;
