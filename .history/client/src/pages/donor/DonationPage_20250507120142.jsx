import React, { useState } from "react";
import axios from "axios"; // Added axios
import { PayPalButtons } from "@paypal/react-paypal-js"; // Added PayPal integration
import "../../styles/DonationPage.css";

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [donationType, setDonationType] = useState("one-time");

  const quickAmounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  const handleQuickAmountClick = (value) => {
    setAmount(value);
    setSelectedQuickAmount(value);
  };

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/donations", {
        amount: parseFloat(amount),
        anonymous: anonymous,
        frequency: donationType,
      });

      alert("Donation submitted successfully!");

      // Reset the form
      setAmount("");
      setSelectedQuickAmount(null);
      setAnonymous(false);
      setDonationType("one-time");
    } catch (error) {
      console.error("Donation error:", error);
      alert("Failed to submit donation.");
    }
  };

  const handleSetReminder = () => {
    if (donationType === "monthly") {
      alert("Monthly donation reminder has been set!");
    } else {
      alert("Reminder is only available for monthly donations.");
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
        <h1>MAKE A DONATION</h1>

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

        {/* PayPal Donation Button */}
        {/*<button className="paypal-donate-button" onClick={handleDonate}>
          <img
            src="src/assets/paypal donate.jpg"
            alt="Donate with PayPal"
            className="paypal-donate-image"
          />
        </button>*/}

        {/* PayPal Button for payments */}
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
              return actions.order.capture().then((details) => {
                alert(
                  `Donation successful! Thank you, ${details.payer.name.given_name}.`
                );
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
