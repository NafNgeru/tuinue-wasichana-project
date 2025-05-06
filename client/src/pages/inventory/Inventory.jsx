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
    beneficiary_name: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (charityId) {
      fetchInventory();
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

  const handleAddOrUpdateItem = async () => {
    if (!newItem.item_name || !newItem.quantity) {
      setError("Please provide both item name and quantity");
      return;
    }

setLoading(true);
try {
  if (editMode) {
    await axios.put(
      (`/charities/${charityId}/inventory/${editingId}`),
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
  setNewItem({ item_name: "", quantity: "", beneficiary_name: "" });
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
      beneficiary_name: item.beneficiary_name || "",
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

  {error && <div className="error-message">{error}</div>} {/* Display error messages */}
  {loading && <div className="loading-message">Loading...</div>} {/* Display loading message */}

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
    <input
      type="text"
      placeholder="Beneficiary Name (optional)"
      className="input-field"
      value={newItem.beneficiary_name}
      onChange={(e) =>
        setNewItem({ ...newItem, beneficiary_name: e.target.value })
      }
    />
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