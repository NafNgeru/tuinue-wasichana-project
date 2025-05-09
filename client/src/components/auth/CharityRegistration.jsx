import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

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
  });
  const [logoFile, setLogoFile] = useState(null);
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

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
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
      const formPayload = new FormData();
      formPayload.append('username', formData.username);
      formPayload.append('email', formData.email);
      formPayload.append('password', formData.password);
      formPayload.append('name', formData.name);
      formPayload.append('phone', formData.phone);
      formPayload.append('userType', formData.userType);
      if (logoFile) {
        formPayload.append('logo', logoFile);
      }

      await api.post('http://localhost:5000/auth/register_charity', formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Registration successful!');
      setFormData({name: '', email: '', username: '', password: '', phone: '', userType: userType || 'individual'});
      setLogoFile(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-center">Charity Registration - {formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" encType="multipart/form-data">
        <label className="flex flex-col text-gray-700 font-medium">
          Charity Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charity name"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`border rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 ${usernameAvailable ? 'border-gray-300 focus:ring-blue-500' : 'border-red-600 focus:ring-red-500'}`}
            placeholder="Choose a username"
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
            placeholder="Create a password"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Logo:
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-6 py-3 hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className="mt-6 bg-gray-600 text-white rounded px-6 py-3 hover:bg-gray-700 transition duration-300 w-full"
      >
        Login
      </button>
      {message && <p className={`mt-5 text-center font-semibold ${usernameAvailable ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </section>
  );
};

export default CharityRegistration;
