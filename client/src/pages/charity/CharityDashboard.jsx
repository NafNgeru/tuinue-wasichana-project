import React, { useEffect, useState } from "react";
import { fetchDonations } from "../../api"; // Adjust path based on your project structure

export default function CharityDashboard() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetchDonations().then(setDonations);
  }, []);

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const anonymousDonations = donations
    .filter(d => d.donor_name === "Anonymous")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex min-h-screen bg-blue-50 w-full h-full">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-100 shadow-md p-4 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Tuinue Wasichana</h2>
        <nav className="space-y-4 mt-20">
          {["Dashboard", "Donors", "Beneficiaries", "Inventory", "Stories"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="block w-44 bg-purple-800 text-white font-medium px-4 py-2 text-center rounded-xl hover:bg-purple-700 mx-auto"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto h-screen">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Charity Dashboard</h1>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-gray-600">Total Donations</h3>
            <p className="text-2xl font-bold text-blue-600">KSh {totalDonations.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-gray-600">Donations</h3>
            <p className="text-2xl font-bold text-blue-600">KSh {(totalDonations - anonymousDonations).toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="text-gray-600">Anonymous Donations</h3>
            <p className="text-2xl font-bold text-blue-600">KSh {anonymousDonations.toLocaleString()}</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Donors</h2>
            <ul className="space-y-2">
              {donations.map((donation) => (
                <li key={donation.id} className="flex justify-between text-gray-700">
                  <span>{donation.donor_name}</span>
                  <span>KSh {donation.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
