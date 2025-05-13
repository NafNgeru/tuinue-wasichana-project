import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

export default function CharityDashboard() {
  const [donations, setDonations] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/donations/${id}`);
        if (!response.ok) throw new Error("Failed to fetch donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, [id]);

  const handleLogout = () => {
    dispatch(setUser(null));
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const anonymousDonations = donations
    .filter((d) => d.donor_name === "Anonymous")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[400px] bg-blue-100 p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-10">Tuinue Wasichana</h2>
        <nav className="flex flex-col gap-4">
          <Link
            to={`/charity/${id}`}
            className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400"
          >
            Dashboard
          </Link>
          <Link
            to={`/charity/${id}/beneficiaries`}
            className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400"
          >
            Beneficiaries
          </Link>
          <Link
            to={`/charity/${id}/inventory`}
            className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400"
          >
            Inventory
          </Link>
          <Link
            to={`/charity/${id}/stories`}
            className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400"
          >
            Stories
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 bg-[#445d82] text-white w-full py-3 rounded-xl hover:bg-purple-800"
        >
          Logout
        </button>
      </aside>

      
      {/* Main Content */}
<main className="flex-1 p-8">
  <div className="max-w-screen-lg mx-auto">
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800">Charity Dashboard</h1>
    </header>

    {/* Summary Cards - Centered */}
    <section className="flex flex-wrap justify-center gap-6 mb-10">
      <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:z-10 transition duration-300 w-[300px]">
        <h3 className="text-gray-700 mb-2">Donations</h3>
        <p className="text-xl font-bold text-blue-600">
          $ {(totalDonations - anonymousDonations).toLocaleString()}
        </p>
      </div>
      <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:z-10 transition duration-300 w-[300px]">
        <h3 className="text-gray-700 mb-2">Anonymous Donations</h3>
        <p className="text-xl font-bold text-blue-600">
          $ {anonymousDonations.toLocaleString()}
        </p>
      </div>
      <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:z-10 transition duration-300 w-[300px]">
        <h3 className="text-gray-700 mb-2">Total Donations</h3>
        <p className="text-xl font-bold text-blue-600">
          $ {totalDonations.toLocaleString()}
        </p>
      </div>
    </section>

    {/* Donors List - Centered */}
    <section className="flex justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Donors
        </h2>
        <ul className="divide-y divide-gray-200">
          {donations.map((donation) => (
            <li
              key={donation.id}
              className="flex justify-between py-2 text-gray-700"
            >
              <span>{donation.donor_name}</span>
              <span>$ {donation.amount.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </div>
</main>

    </div>
  );
}
