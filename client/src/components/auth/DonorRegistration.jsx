import React, { useState } from 'react';
import api from '../../services/api';

const DonorRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'individual', // default to individual
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/donors/register', formData);
      setMessage('Registration successful!');
      setFormData({name: '', email: '', password: '', userType: 'individual'});
    } catch {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <section className="registration-page max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Donor Registration</h2>
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
        <fieldset className="flex flex-col gap-2">
          <legend>User Type:</legend>
          <label>
            <input
              type="radio"
              name="userType"
              value="individual"
              checked={formData.userType === 'individual'}
              onChange={handleChange}
            />
            Individual
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="organization"
              checked={formData.userType === 'organization'}
              onChange={handleChange}
            />
            Organization
          </label>
        </fieldset>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </section>
  );
};

export default DonorRegistration;
