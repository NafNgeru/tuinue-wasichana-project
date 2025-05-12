import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/Beneficiary.css';
import { Link, useParams } from 'react-router-dom';

function BeneficiariesPage() {
  const { id:charityId } = useParams();
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
    axios.post(`http://localhost:5000/charities/${charityId}/beneficiaries, newBeneficiary`)
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
    <div className='page-layout'>
       <div className="left-sidebar">
         <h3>Navigation</h3>
         <Link to={`/charity/${charityId}`} className="sidebar-link">← Back to Dashboard</Link>
       </div>
    <div className="beneficiaries-page">
      <h2 className='beneficiary-title'>Beneficiaries</h2>
      <table className="beneficiaries-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>People</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaries.map((beneficiary) => (
            <tr key={beneficiary.id} className="beneficiary-row">
              <td>{beneficiary.name}</td>
              <td>{beneficiary.location}</td>
              <td>{beneficiary.number_of_people}</td>
              <td>
                <button
                  className="view-button"
                  onClick={() => handleViewInventory(beneficiary.id, beneficiary.name)}
                >
                  View Inventory
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  <div className="add-form">
    <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
    />
    <input
      type="number"
      placeholder="Number of People"
      value={number_of_people}
      onChange={(e) => setPeople(e.target.value)}
    />
    <button onClick={handleAddBeneficiary}>Add</button>
  </div>

  {selectedBeneficiary && (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3>{selectedBeneficiary.name}'s Inventory</h3>
          <button className="close-button" onClick={closeSidebar}>X</button>
        </div>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaryInventory.length > 0 ? (
              beneficiaryInventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.item_name}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No inventory found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )}
</div>
</div>
  );
}

export default BeneficiariesPage;