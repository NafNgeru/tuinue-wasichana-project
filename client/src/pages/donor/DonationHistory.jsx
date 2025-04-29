import React, { useEffect, useState} from "react";
import './DonationHistory.css';

const DonationHistory = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        fetch('http:/localhost:5000/donors/donations')
        .then(res => res.json())
        .then(data => {
            setDonations(data);
            setLoading(false);
        })    
        .catch (err => {
            console.error("Failed to fetch donations:", err);
            setLoading(false);

            });
    }, []);

    if (loading) return <div className="loading"> Loading Donation History...</div>;

    return(
        <div clasName="donation-history-container">
            <h2>My Donation History</h2>
            {donations.lenght === 0 ? (
                <p>No donations found.</p>
            ) : (  
                
                <table className="donation-table">
                    <thead>
                        <tr>
                            <th>Charity</th>
                            <th>Amount (USD)</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation, index) => (
                            <tr key={index}>
                                <td>{donation.charity_name}</td>
                                <td>${donation.amount.toFixed(2)}</td>
                                <td>{new Date(donation.date).toLocaleDateString()}</td>
                                <td>{donation.repeat_donation ? "Recurring" : "One-time"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );          
};

export default DonationHistory;
