import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function BeneficiariesPage() {
  const { id: charityId } = useParams();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [number_of_people, setPeople] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [beneficiaryInventory, setBeneficiaryInventory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/charities/${charityId}/beneficiaries`)
      .then(response => setBeneficiaries(response.data))
      .catch(error => console.error('Error fetching beneficiaries:', error));
  }, []);

  const handleAddBeneficiary = () => {
    const newBeneficiary = { name, location, number_of_people };
    axios.post(`http://localhost:5000/charities/${charityId}/beneficiaries`, newBeneficiary)
      .then(response => {
        setBeneficiaries([...beneficiaries, response.data]);
        setName('');
        setLocation('');
        setPeople('');
      })
      .catch(error => console.error('Error adding beneficiary:', error));
  };

  const handleViewInventory = (beneficiaryId, beneficiaryName) => {
    axios.get(`http://localhost:5000/charities/${charityId}/beneficiaries/${beneficiaryId}/inventory`)
      .then(response => {
        setSelectedBeneficiary({ id: beneficiaryId, name: beneficiaryName });
        setBeneficiaryInventory(response.data);
      })
      .catch(error => console.error('Error fetching inventory:', error));
  };

  const closeSidebar = () => {
    setSelectedBeneficiary(null);
    setBeneficiaryInventory([]);
  };

  return (
    <div className="flex">

      <div className="w-64 bg-blue-100 p-5 shadow-md">
        <h3 className="text-lg font-semibold">Navigation</h3>
        <Link to={`/charity/${charityId}`} className="mt-4 block text-purple-800 font-bold hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      
      <div className="flex-grow max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Beneficiaries</h2>

        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-4 text-left font-semibold w-1/4">Name</th>
              <th className="py-3 px-4 text-left font-semibold w-1/4">Location</th>
              <th className="py-3 px-4 text-left font-semibold w-1/4">People</th>
              <th className="py-3 px-4 text-left font-semibold w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary.id} className="border-b">
                <td className="py-2 px-4">{beneficiary.name}</td>
                <td className="py-2 px-4">{beneficiary.location}</td>
                <td className="py-2 px-4">{beneficiary.number_of_people}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleViewInventory(beneficiary.id, beneficiary.name)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    View Inventory
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add form */}
        <div className="flex flex-col gap-3 mb-8">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            placeholder="Number of People"
            value={number_of_people}
            onChange={(e) => setPeople(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleAddBeneficiary}
            className="bg-purple-700 text-white w-24 py-2 rounded hover:bg-purple-900"
          >
            Add
          </button>
        </div>

        {selectedBeneficiary && (
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-xl p-6 z-50 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{selectedBeneficiary.name}'s Inventory</h3>
              <button
                onClick={closeSidebar}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                X
              </button>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-3 text-left font-medium">Item</th>
                  <th className="py-2 px-3 text-left font-medium">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaryInventory.length > 0 ? (
                  beneficiaryInventory.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2 px-3">{item.item_name}</td>
                      <td className="py-2 px-3">{item.quantity}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-3" colSpan="2">No inventory found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BeneficiariesPage;
