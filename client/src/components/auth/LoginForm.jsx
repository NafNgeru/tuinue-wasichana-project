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

    // if (formData.username.length < 3) {
    //   setMessage('Username must be at least 4 characters long.');
    //   return;
    // }

    // Admin login check
    if (formData.username === 'admin' && formData.password === 'admin') {
      dispatch(setUser({ username: 'admin', role: 'admin' }));
      navigate('/admin');
      return;
    }

    try {
      const response = await api.post('http://localhost:5000/auth/login', formData);
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

  return (
    <section className="max-w-md mx-auto p-4 auth-container">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 auth-form">
        <label className="flex flex-col">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div className="auth-links mt-4 flex gap-4 justify-center">
        <button onClick={() => navigate('/register')} className="underline text-blue-600 hover:text-blue-800">Register</button>
        <button onClick={() => navigate('/reset-password')} className="underline text-blue-600 hover:text-blue-800">Reset Password</button>
      </div>
      {message && <p className="mt-4 text-red-600 text-center">{message}</p>}
    </section>
  );
};

export default LoginForm;
