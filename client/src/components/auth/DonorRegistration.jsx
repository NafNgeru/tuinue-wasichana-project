import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DonorRegistration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: userType || 'individual',
  });
  const [message, setMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: userType || 'individual' }));
  }, [userType]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    if (e.target.name === 'username') {
      setUsernameAvailable(true);
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await api.get(`/auth/check-username/${username}`);
      setUsernameAvailable(response.data.available);
      return response.data.available;
    } catch {
      setUsernameAvailable(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    if (!usernameAvailable) {
      setMessage('Username already taken. Please try another.');
      return;
    }
    const isAvailable = await checkUsername(formData.username);
    if (!isAvailable) {
      setMessage('Username already taken. Please try another.');
      return;
    }
    try {
      await api.post('/donors/register', formData);
      setMessage('Registration successful!');
      setFormData({name: '', email: '', username: '', password: '', confirmPassword: '', phone: '', userType: userType || 'individual'});
    } catch {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section className="max-w-md mx-auto p-4 auth-container">
      <h2 className="text-2xl font-bold mb-4">Donor Registration - {formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          Donor Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`border rounded px-3 py-2 mt-1 ${usernameAvailable ? 'border-gray-300' : 'border-red-600'}`}
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
        <label className="flex flex-col">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <label className="flex flex-col">
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mt-1"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 text-blue-600 underline hover:text-blue-800"
      >
        Already have an account? Login
      </button>
      {message && <p className={`mt-4 ${usernameAvailable ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </section>
  );
};

export default DonorRegistration;
