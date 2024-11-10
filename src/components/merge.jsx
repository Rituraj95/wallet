import React, { useState } from "react";
import './first.css';
import './second.css';
import './walletConfirmation.css'

const PaymentSuccessPage = ({ onBackToWallet }) => (
  <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
    <header>
      <h1>Payment Successful!</h1>
    </header>
    <div className="wallet-confirmation">
      <button className="back-button">&lt;</button>
      <div className="confirmation-content">
        <div className="checkmark">&#10004;</div>
        <h2>Credits Added to Wallet</h2>
        <div className="details-card">
          <p><strong>Order ID</strong> <span>#HJDVUY2387JHWE</span></p>
          <p><strong>Credits</strong> <span>15,000</span></p>
          <p><strong>Paid Via</strong> <span>PhonePe UPI</span></p>
          <p><strong>Amount</strong> <span>₹14,500</span></p>
          <p><strong>Convenience Fees</strong> <span>₹0</span></p>
          <p className="paid-amount"><strong>Paid Amount</strong> <span>₹14,500</span></p>
        </div>
        <button className="view-balance-button">View Updated Balance</button>
      </div>
    </div>
    <button onClick={onBackToWallet} className="back-to-wallet-button">
      Back to Wallet
    </button>
  </div>
);

const PaymentPage = ({ onPaymentDone }) => (
  <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
    <header>
      <button className="back-button" onClick={onPaymentDone}>❮ Back</button>
      <h1>Payment Gateway</h1>
    </header>
    <p>Complete your payment securely.</p>
    <div className="payment-options">
      <p>Payment methods:</p>
      <button className="payment-button">Credit Card</button>
      <button className="payment-button">Debit Card</button>
      <button className="payment-button">UPI</button>
      <button className="payment-button">Net Banking</button>
    </div>
    <button onClick={onPaymentDone} className="pay-button" style={{ marginTop: '20px' }}>
      Pay
    </button>
  </div>
);

const MergePage = ({ user, onLogout }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [manualAmount, setManualAmount] = useState("");
  const [currentPage, setCurrentPage] = useState("wallet");

  const handleProceedToPay = () => {
    setCurrentPage("payment");
  };

  const handlePaymentDone = () => {
    setCurrentPage("success");
  };

  const handleBackToWallet = () => {
    setCurrentPage("wallet");
  };

  return (
    <>
      {currentPage === "wallet" && (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
          <div className="wallet-container">
            <header className="wallet-header">
              <button className="back-button">❮</button>
              <h1>My Wallet</h1>
            </header>

            <div className="user-info">
              <img
                className="profile-pic"
                src={user.image} // Replace with the actual image URL
                alt="Profile"
              />
              <div className="user-details">
                <h2>{user.firstName} {user.lastName}!</h2>
                <p>{user.phone}</p>
              </div>
              <span className="verified-badge">Verified</span>
            </div>

            <div className="credits-info">
              <h3>Available Credits</h3>
              <p className="credit-value">0</p>
              <p>Credits can be used for all bookings, food orders, events.</p>
              <button className="credits-button">What are Credits?</button>
            </div>

            <div className="credits-container">
              <header className="credits-header">
                <h1>All credits to your wallet</h1>
                <span className="conversion-rate">1 Credit = 1</span>
              </header>

              <p className="description">Choose from our most purchased options</p>

              <div className="credit-options">
                <label className={`credit-option ${selectedOption === 15000 ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="credits"
                    value={15000}
                    onChange={() => setSelectedOption(15000)}
                  />
                  <div className="credit-details">
                    <p>
                      <strong>15000 Credits</strong>
                      <span className="discount">30% off</span>
                    </p>
                    <p>
                      with <span className="strikethrough">15000</span>{" "}
                      <strong>14500 Credits</strong>
                    </p>
                  </div>
                </label>

                <label className={`credit-option ${selectedOption === 10000 ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="credits"
                    value={10000}
                    onChange={() => setSelectedOption(10000)}
                  />
                  <div className="credit-details">
                    <p>
                      <strong>10000 Credits</strong>
                      <span className="discount">20% off</span>
                    </p>
                    <p>
                      with <span className="strikethrough">10000</span>{" "}
                      <strong>9500 Credits</strong>
                    </p>
                  </div>
                </label>
              </div>

              <p className="or-text">or</p>

              <div className="manual-input">
                <p>Enter amount Manually</p>
                <input
                  type="number"
                  placeholder="Enter here"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                />
              </div>

              <button
                className="proceed-button"
                disabled={!selectedOption && !manualAmount}
                onClick={handleProceedToPay}
              >
                Proceed to Pay
              </button>
            </div>

            <button onClick={onLogout} style={{ padding: '10px 20px', marginTop: '20px' }}>
              Logout
            </button>
          </div>
        </div>
      )}

      {currentPage === "payment" && <PaymentPage onPaymentDone={handlePaymentDone} />}
      {currentPage === "success" && <PaymentSuccessPage onBackToWallet={handleBackToWallet} />}
    </>
  );
};

export default MergePage;
