import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/auth.css';

const DonorRegistration = () => {
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
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
      setFormData({name: '', email: '', username: '', password: '', phone: '', userType: userType || 'individual'});
    } catch {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section className="auth-section max-w-md mx-auto p-4">
      <h2 className="auth-title">Donor Registration - {formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label className="auth-label">
          Donor Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="auth-input"
          />
        </label>
        <label className="auth-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="auth-input"
          />
        </label>
        <label className="auth-label">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`auth-input ${usernameAvailable ? '' : 'auth-input-error'}`}
          />
        </label>
        <label className="auth-label">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="auth-input"
          />
        </label>
        <label className="auth-label">
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="auth-input"
          />
        </label>
        <button
          type="submit"
          className="auth-button"
        >
          Register
        </button>
      </form>
      {message && <p className={`auth-message ${usernameAvailable ? 'auth-message-success' : 'auth-message-error'}`}>{message}</p>}
    </section>
  );
};

export default DonorRegistration;
