import React from 'react';
import React, { useState } from 'react';
import './Settings.css';

const SettingsPage = () => {
  return (
    <section>
      <h1>Donor Settings</h1>
      <p>Manage your account settings here.</p>
    </section>
  );
};


function Settings({ donor}) {
  const [darkmode, setDarkMode] = useState(false);
  const [formData, setformData] = useState({
    name: donor.name,
    email: donor.email,
    password:''
  });

  const [profilePic, setProfilePic] = useState(null);

  const toggleTheme = () => {
    setDarkMode(! darkMode);
    document.body.className = !darkMode ? 'darkMode':'';
  };

  const handleInputChange = (e) =>{
    setFoarmData({...formData,  [e.target.name]: e.target.value });
  };


const handleFInputChange = (e) =>{
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleFileChange = (e) => {
  setProfilePic(e.target.files[0]);
};

const handleSubmit = (e) => {
  e.preventDefault();
};

const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (profilePic) {
      data.append('profile_pic', profilePic);
    }

    fetch(`/donors/${donor.id}/update`, {
      method: 'PUT',
      body: data
    })
      .then(res => res.json())
      .then(data => alert('Profile updated successfully!'))
      .catch(err => console.error('Update failed:', err));
  };

  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <button className="toggle-btn" onClick={toggleTheme}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <form onSubmit={handleSubmit}>
        <label>
          Profile/Org Picture:
          <input type="file" onChange={handleFileChange} />
        </label>

        <label>
          Name:
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </div>
  );


export default Settings;


