import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import "../../styles/DonationPage.css";
import paypalLogo from "../../assets/paypal_888870.png";



const Modal = ({ message, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
      <p className="text-gray-800 mb-4">{message}</p>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);


const DonationPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [donationType, setDonationType] = useState("one-time");

  const { donorId, charityId } = useParams(); 

  const quickAmounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  const handleQuickAmountClick = (value) => {
    setAmount(value);
    setSelectedQuickAmount(value);
  };

  const handleSetReminder = () => {
    if (donationType === "monthly") {
      setModalMessage("Monthly donation reminder has been set!");
    } else {
      setModalMessage("Reminder is only available for monthly donations.");
    }
    setShowModal(true);
  };
  

  const isMonthly = donationType === "monthly";

  const handleBackendDonation = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/donors/${donorId}/donate/${charityId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          charity_id: parseInt(charityId), 
          amount: parseFloat(amount),
          frequency: isMonthly ? "monthly" : "one-time",
          anonymous: anonymous,
          repeat_donation: isMonthly,
          reminder_set: isMonthly,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Donation failed.");
      }

      console.log("Donation recorded:", result);
    } catch (err) {
      console.error("Backend donation error:", err);
      setModalMessage("Donation succeeded with PayPal, but saving to backend failed.");
      setShowModal(true);
    }
  };

  return (
    <section className="donation-container">
      <div className="donation-left">
        <img
          src={paypalLogo} alt="PayPal Logo" className="paypal-logo"
        />
      </div>

      <div className="donation-right">
        <h1>Make a Donation</h1>

        <div className="quick-amounts">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className={`amount-button ${
                selectedQuickAmount === amt ? "selected" : ""
              }`}
              onClick={() => handleQuickAmountClick(amt)}
              aria-label={`Quick amount ${amt}`}
            >
              ${amt}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="$.00"
          className="amount-input"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setSelectedQuickAmount(null);
          }}
          aria-label="Custom donation amount"
        />

        <div className="options">
          <label className="option-label">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
            Donate Anonymously
          </label>

          <label className="option-label">
            <input
              type="radio"
              name="donation-type"
              checked={donationType === "one-time"}
              onChange={() => setDonationType("one-time")}
            />
            One Time Donation
          </label>

          <label className="option-label">
            <input
              type="radio"
              name="donation-type"
              checked={donationType === "monthly"}
              onChange={() => setDonationType("monthly")}
            />
            Monthly Donation
          </label>
        </div>

        <div className="buttons-row">
          <button className="reminder-button" onClick={handleSetReminder}>
            Set Reminder
          </button>
        </div>

        <div className="paypal-button-wrapper">
          <PayPalButtons
            style={{ layout: "vertical" }}
            disabled={!amount || isNaN(amount) || Number(amount) <= 0}
            forceReRender={[amount]}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toString(),
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(async (details) => {
                setModalMessage(`Donation successful! Thank you, ${details.payer.name.given_name}.`);
                setShowModal(true);

                await handleBackendDonation(); 
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout error:", err);
              setModalMessage("An error occurred during payment.");
              setShowModal(true);

            }}
          />
        </div>
      </div>
      {showModal && (
  <Modal
    message={modalMessage}
    onClose={() => {
      setShowModal(false);
      setModalMessage("");
    }}
  />
)}
    </section>
  );
};

export default DonationPage;