import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";
import "../../styles/DonationPage.css";

const DonationPage = () => {
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
      alert("Monthly donation reminder has been set!");
    } else {
      alert("Reminder is only available for monthly donations.");
    }
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
      alert("Donation succeeded with PayPal, but saving to backend failed.");
    }
  };

  return (
    <section className="donation-container">
      <div className="donation-left">
        <img
          src="src/assets/paypal_888870.png"
          alt="PayPal Logo"
          className="paypal-logo"
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
                alert(
                  `Donation successful! Thank you, ${details.payer.name.given_name}.`
                );
                await handleBackendDonation(); 
              });
            }}
            onError={(err) => {
              console.error("PayPal Checkout error:", err);
              alert("An error occurred during payment.");
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
