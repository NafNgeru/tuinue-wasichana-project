import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../../assets/styles/auth.css';

const CharityRegistration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phone: '',
    userType: userType || 'individual',
    logo: null,
  });
  const [message, setMessage] = useState('');
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: userType || 'individual' }));
  }, [userType]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === 'username') {
        setUsernameAvailable(true);
      }
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await api.get(`http://localhost:5000/auth/check-username/${username}`);
      setUsernameAvailable(response.data.available);
      return response.data.available;
    } catch (error) {
      console.error("Error checking:", error);
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
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('username', formData.username);
      data.append('password', formData.password);
      data.append('phone', formData.phone);
      data.append('userType', formData.userType);
      if (formData.logo) {
        data.append('logo', formData.logo);
      }

      await api.post('http://localhost:5000/charity/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Registration successful!');
      setFormData({ name: '', email: '', username: '', password: '', phone: '', userType: userType || 'individual', logo: null });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section className="auth-container">
      <h2>Charity Registration - {formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>
          Charity Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={usernameAvailable ? '' : 'input-error'}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Logo:
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate('/login')} className="login-button" type="button">
        Already have an account? Login
      </button>
      {message && <p className={usernameAvailable ? 'text-green-600' : 'text-red-600'}>{message}</p>}
    </section>
  );
};

export default CharityRegistration;
