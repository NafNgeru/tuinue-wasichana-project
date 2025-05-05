import React, { useEffect, useState } from "react";
import { fetchDonations } from "../../api";

export default function CharityDashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    async function loadDonations() {
      const data = await fetchDonations();
      setDonations(data);
    }
    loadDonations();
  }, []);

  return (
    <div>
      <h1>Charity Dashboard</h1>
      <ul>
        {donations.map((donation) => (
          <li key={donation.id}>{donation.description}</li>
        ))}
      </ul>
    </div>
  );
}
