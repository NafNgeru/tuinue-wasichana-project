import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { apiFetch } from '../utils/api';

const DonationHistory = () => {
  const id = useParams();
  const [donations, setDonations] = useState([]);
  const [charities, setCharities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const darkMode = useSelector((state) => state.auth.darkMode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donationData = await fetch(`http://127.0.0.1:5000/donor/${id}/donations`);
        setDonations(donationData);
        const charityData = await fetch(`http://127.0.0.1:5000/donor/${id}/charities`);
        const charityMap = charityData.reduce((map, charity) => {
          map[charity.id] = charity.name;
          return map;
        }, {});
        setCharities(charityMap);
        setLoading(false);
      } catch (err) {
        setError('Failed to load donation history. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        Loading Donation History...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>My Donation History</h2>
      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <div>
          <table role="grid">
            <thead>
              <tr>
                <th scope="col">Charity</th>
                <th scope="col">Amount (USD)</th>
                <th scope="col">Date</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td>{charities[donation.charity_id] || 'Unknown'}</td>
                  <td>${donation.amount.toFixed(2)}</td>
                  <td>{new Date(donation.date).toLocaleDateString()}</td>
                  <td>{donation.repeat_donation ? 'Recurring' : 'One-Time'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;