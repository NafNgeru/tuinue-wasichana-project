import React, { useEffect, useState } from "react";
import axios from "axios";

const CharityDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/donations")
      .then((response) => {
        setDonations(response.data);
        const sum = response.data.reduce((acc, item) => acc + item.amount, 0);
        setTotal(sum);
      })
      .catch((error) => console.error("Error fetching donations:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-200 p-4 font-bold text-lg">Charity Dashboard</header>

      <div className="flex flex-1">
        
        <aside className="w-48 bg-white border-r p-4 space-y-4">
          {["Donations", "Donors", "Inventory", "Stories", "Beneficiaries"].map((item) => (
            <button key={item} className="w-full bg-purple-800 text-white py-2 rounded">
              {item}
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6">
          <h2 className="text-xl font-bold text-center mb-6">Donations</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold border-b">Name</h3>
              {donations.map((d) => (
                <p key={d.id} className="py-1">{d.donor_name}</p>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold border-b">Amount</h3>
              {donations.map((d) => (
                <p key={d.id} className="py-1">KES {d.amount.toLocaleString()}</p>
              ))}
            </div>
          </div>

          
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold border-b w-fit mx-auto">Total Donations</h3>
            <p className="mt-2 text-2xl font-semibold text-green-600">KES {total.toLocaleString()}</p>
          </div>
        </main>
      </div>

      
      {/* <footer className="bg-blue-200 p-4 flex justify-around items-center mt-4 text-sm">
        <div className="flex items-center gap-2">
          📧 tuinuewasichana@mail.co.ke
        </div>
        <div className="flex items-center gap-2">
          📞 +254712345678
        </div>
        <div className="flex items-center gap-4">
          <span>📘 Tuinue Wasichana</span>
          <span>🐦 Tuinue Wasichana</span>
        </div>
      </footer> */}
    </div>
  );
};

export default CharityDashboard;
