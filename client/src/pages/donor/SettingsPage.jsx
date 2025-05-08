import React, { useState } from 'react';

function Settings({ donor }) {
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: donor.name,
    email: donor.email,
    password: ''
  });
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setProfilePic(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (profilePic) data.append('profile_pic', profilePic);

    fetch(`/donors/${donor.id}/update`, {
      method: 'PUT',
      body: data
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then(() => setMessage('Profile updated successfully!'))
      .catch(err => {
        setError('Update failed. Please try again.');
        console.error(err);
      })
      .finally(() => setLoading(false));

      if (!donor) return <div>Error: Donor data not provided</div>;
  };

  return (
    <div className={`settings-container ${darkMode ? 'dark' : ''}`}>
      <h2>Account Settings</h2>
      <button className="toggle-btn" onClick={toggleTheme}>
        Switch to {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Profile/Org Picture:
          <input type="file" onChange={handleFileChange} />
        </label>
        <label>Name:
          <input name="name" type="text" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>Email:
          <input name="email" type="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>Password:
          <input name="password" type="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <button type="submit" disabled={loading}>Update Profile</button>
      </form>
    </div>
  );
}

export default Settings;

