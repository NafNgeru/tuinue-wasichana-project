import React, { useState } from "react";
// import "./Header.jsx";
// import "./Footer.jsx";
import "../../styles/DonationPage.css";

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [donationType, setDonationType] = useState("one-time"); // "one-time" or "monthly"

  const quickAmounts = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  const handleQuickAmountClick = (value) => {
    setAmount(value);
    setSelectedQuickAmount(value);
  };

  const handleDonate = () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    alert(
      `Donating $${amount}${
        anonymous ? " anonymously" : ""
      } as a ${donationType} donation.`
    );
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

          <button className="paypal-donate-button" onClick={handleDonate}>
            <img
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
              alt="Donate with PayPal"
              className="paypal-donate-image"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DonationPage;
