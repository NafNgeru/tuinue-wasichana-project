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

    if (formData.username.length < 3) {
      setMessage('Username must be at least 3 characters long.');
      return;
    }

    // Admin login check
    if (formData.username === 'admin' && formData.password === 'admin') {
      dispatch(setUser({ username: 'admin', role: 'admin' }));
      navigate('/admin');
      return;
    }

    try {
      const response = await api.post('http://localhost:5000/auth/login', formData);
      // Assuming response contains user role and token
      const user = response.data;
      const { role } = user;
      dispatch(setUser(user));
      localStorage.setItem('user', JSON.stringify(user));

      if (role === 'donor') {
        navigate(`/donor/${user.donor.id}`);
      } else if (role === 'charity') {
        navigate(`/charity/${user.charity.id}`);
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
    <section className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label className="flex flex-col text-gray-700 font-medium">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
      </form>
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate('/register')}
          className="bg-green-600 text-white rounded px-5 py-2 hover:bg-green-700 transition duration-300"
        >
          Register
        </button>
        <button
          onClick={() => navigate('/reset-password')}
          className="bg-yellow-600 text-white rounded px-5 py-2 hover:bg-yellow-700 transition duration-300"
        >
          Forget Password
        </button>
      </div>
      {message && <p className="mt-5 text-center text-red-600 font-semibold">{message}</p>}
    </section>
  );
};

export default LoginForm;
