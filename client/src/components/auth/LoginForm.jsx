import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { setUser } from '../../features/auth/authSlice';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.username.length < 5) {
      setMessage('Username must be at least 6 characters long.');
      return;
    }

    // Admin login check
    if (formData.username === 'admin' && formData.password === 'admin') {
      dispatch(setUser({ username: 'admin', role: 'admin' }));
      navigate('/admin');
      return;
    }

    try {
      const response = await api.post('/auth/login', formData);
      // Assuming response contains user role and token
      const { role } = response.data;
      dispatch(setUser(response.data));

      if (role === 'donor') {
        navigate('/donor');
      } else if (role === 'charity') {
        navigate('/charity');
      } else if (role === 'admin') {
        navigate('/admin');
      } else {
        setMessage('Unknown user role');
      }
    } catch {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleResetPasswordClick = () => {
    navigate('/reset-password');
  };

  return (
    <section className="section max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col text-gray-700 font-semibold">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={6}
            className="border border-gray-300 rounded px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-semibold">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="button"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleRegisterClick}
          className="button"
          type="button"
        >
          Register
        </button>
        <button
          onClick={handleResetPasswordClick}
          className="link-button"
          type="button"
        >
          Forgot Password?
        </button>
      </div>
    </section>
  );
};

export default LoginForm;
