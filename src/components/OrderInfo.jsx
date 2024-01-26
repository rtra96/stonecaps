import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./Auth";
import { Link } from "react-router-dom";
import '../App.css';

const OrderInformationForm = () => {
  const { user } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [shippingDestination, setShippingDestination] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");

  // Function to handle the checkout process
  const handleCheckout = () => {
    // Implement checkout logic using shippingDestination, zipCode, state, city,
    // cardNumber, expirationDate, billingZipCode
    console.log('Checkout logic goes here');
  };

  // Calculate order summary values
  const numberOfItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingAndHandling = 10;
  const totalBeforeTax = totalPrice + shippingAndHandling;
  const taxRate = 0.1;
  const taxAmount = totalBeforeTax * taxRate;
  const grandTotal = totalBeforeTax + taxAmount;
  const roundedNumberOfItems = numberOfItems.toFixed(0);
  const roundedTotalPrice = totalPrice.toFixed(2);
  const roundedShippingAndHandling = shippingAndHandling.toFixed(2);
  const roundedTotalBeforeTax = totalBeforeTax.toFixed(2);
  const roundedGrandTotal = grandTotal.toFixed(2);

  return (
    <div className="order-information-container">
      <h2>Order Information</h2>

      {user ? (
        // Display user information if logged in
        <div className="order-information-grid">
          <div className="user-information">
            <p>Name: {user.name.firstname}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>

          <div className="shipping-destination">
            <h3>Shipping Destination</h3>
            <div>
              <label htmlFor="deliveryAddress">Delivery Address..</label>
              <input
                type="text"
                id="deliveryAddress"
                placeholder="Enter delivery address"
                value={shippingDestination}
                onChange={(e) => setShippingDestination(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code..............</label>
              <input
                type="text"
                id="zipCode"
                placeholder="Enter zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="state">State....................</label>
              <input
                type="text"
                id="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city">City.......................</label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>

          <div className="payment-information">
            <h3>Payment Information</h3>
            <div>
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                placeholder="Debit/Credit card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="text"
                placeholder="MM/YYYY"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="billingZipCode">Billing Zip Code:</label>
              <input
                type="text"
                placeholder="Enter billing zip code"
                value={billingZipCode}
                onChange={(e) => setBillingZipCode(e.target.value)}
              />
            </div>
          </div>

          <div className="combined-summary">
            <div className="order-review">
              <h3>Order Review</h3>
              {cartItems.map((item) => (
                <div key={item.id}>
                  <p>{item.title} - ${item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="order-summary-card">
              <h3>Order Summary</h3>
              <div className="order-summary-item">
                <span>Total Items:</span>
                <span>{roundedNumberOfItems}</span>
              </div>
              <div className="order-summary-item">
                <span>Total price:</span>
                <span>${roundedTotalPrice}</span>
              </div>
              <div className="order-summary-item">
                <span>Shipping & Handling:</span>
                <span>${roundedShippingAndHandling}</span>
              </div>
              <div className="order-summary-item">
                <span>Total before tax:</span>
                <span>${roundedTotalBeforeTax}</span>
              </div>
              <div className="order-summary-item">
                <span>Grand total with tax:</span>
                <span>${roundedGrandTotal}</span>
              </div>
            </div>
          </div >
          <div className="combined-summary centered-button">
            <button onClick={handleCheckout}>Place Order</button>
          </div>
        </div>
      ) : (
        // Prompt user to log in or create an account
        <div>
          <p>Please log in or create an account to proceed with the checkout.</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/register">Create an Account</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderInformationForm;
