import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/InventoryPage.css";
import { useParams } from "react-router-dom";

const InventoryPage = () => {
  const { id: charityId } = useParams();
  axios.defaults.baseURL = "http://localhost:5000";

  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    item_name: "",
    quantity: "",
    beneficiary_id: "", 
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]); 

  useEffect(() => {
    if (charityId) {
      fetchInventory();
      fetchBeneficiaries();
    }
  }, [charityId]);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/charities/${charityId}/inventory`);
      setInventory(res.data);
    } catch (error) {
      setError("Failed to fetch inventory");
      console.error("Failed to fetch inventory", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBeneficiaries = async () => {
    try {
      const res = await axios.get(`/charities/${charityId}/beneficiaries`);
      setBeneficiaries(res.data);
    } catch (error) {
      setError("Failed to fetch beneficiaries");
      console.error("Failed to fetch beneficiaries", error);
    }
  };

  const handleAddOrUpdateItem = async () => {
    if (!newItem.item_name || !newItem.quantity || !newItem.beneficiary_id) {
      setError("Please provide item name, quantity, and select a beneficiary");
      return;
    }

setLoading(true);
try {
  if (editMode) {
    await axios.put(
      `/charities/${charityId}/inventory/${editingId}`,
      {
        ...newItem,
        quantity: parseInt(newItem.quantity),
      }
    );
  } else {
    await axios.post(`/charities/${charityId}/inventory`, {
      ...newItem,
      quantity: parseInt(newItem.quantity),
    });
  }

  fetchInventory();
  setNewItem({ item_name: "", quantity: "", beneficiary_id: "" });
  setEditMode(false);
  setEditingId(null);
  setError(null);
} catch (error) {
  setError(editMode ? "Update failed" : "Add item failed");
  console.error(editMode ? "Update failed" : "Add item failed", error);
} finally {
  setLoading(false);
}
  };

  const handleEditItem = (item) => {
    setEditMode(true);
    setEditingId(item.id);
    setNewItem({
      item_name: item.item_name,
      quantity: item.quantity,
      beneficiary_id: item.beneficiary_id || "", 
    });
  };

  const handleDeleteItem = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/charities/${charityId}/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      setError("Delete item failed");
      console.error("Delete item failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Inventory Page</h2>

  {error && <div className="error-message">{error}</div>}
  {loading && <div className="loading-message">Loading...</div>}

  <div className="inventory-table">
    <div className="inventory-header">
      <div>Item</div>
      <div>Quantity</div>
      <div>Status</div>
      <div>Action</div>
    </div>

    {inventory.map((item) => (
      <div key={item.id} className="inventory-row">
        <div>{item.item_name}</div>
        <div>{item.quantity}</div>
        <div>{item.quantity > 0 ? "Delivered" : "Pending"}</div>
        <div>
          <button
            className="edit-button"
            onClick={() => handleEditItem(item)}
          >
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="input-section">
    <input
      type="text"
      placeholder="Item Name"
      className="input-field"
      value={newItem.item_name}
      onChange={(e) =>
        setNewItem({ ...newItem, item_name: e.target.value })
      }
    />
    <input
      type="number"
      placeholder="Quantity"
      className="input-field"
      value={newItem.quantity}
      onChange={(e) =>
        setNewItem({ ...newItem, quantity: e.target.value })
      }
    />
    <select
      className="input-field"
      value={newItem.beneficiary_id}
      onChange={(e) =>
        setNewItem({ ...newItem, beneficiary_id: e.target.value })
      }
    >
      <option value="">Select Beneficiary</option>
      {beneficiaries.map((beneficiary) => (
        <option key={beneficiary.id} value={beneficiary.id}>
          {beneficiary.name}
        </option>
      ))}
    </select>
    <div className="button-group">
      <button className="action-button" onClick={handleAddOrUpdateItem}>
        {editMode ? "Update Item" : "Add Item"}
      </button>
    </div>
  </div>
</div>
  );
};

export default InventoryPage;