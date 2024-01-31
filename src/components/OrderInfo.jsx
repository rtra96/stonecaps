import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./Auth";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const OrderInformationForm = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [billingZipCode, setBillingZipCode] = useState("");

  useEffect(() => {
    // Set initial values based on user data when component mounts
    if (user && user.address) {
      setDeliveryAddress(
        `${user.address.number || ""} ${user.address.street || ""}`,
      );
      setZipCode(user.address.zipcode || "");
      setState("");
      setCity(user.address.city || "");
    }
  }, [user]);

  const validateForm = () => {
    // Validation logic to check whether all required fields have values
    return (
      deliveryAddress.trim() !== "" &&
      zipCode.trim() !== "" &&
      state.trim() !== "" &&
      city.trim() !== "" &&
      cardNumber.trim() !== "" &&
      expirationDate.trim() !== "" &&
      billingZipCode.trim() !== ""
    );
  };

  const handlePlaceOrderClick = (e) => {
    // Prevent the default behavior of the button click event
    e.preventDefault();

    // Check form validity before navigating to the confirmation page
    const isFormValid = validateForm();

    if (isFormValid) {
      // Use navigate to navigate to the confirmation page
      navigate("/confirmation");
    } else {
      // Display an error message or handle invalid form case
      alert("Please fill in all required fields before placing the order.");
    }
  };

  // Calculate order summary values
  const numberOfItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
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
            <p>
              Name: {user.name.firstname} {user.name.lastname}
            </p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>

          <div className="shipping-destination">
            <h3>Shipping Destination</h3>
            <div>
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <input
                type="text"
                id="deliveryAddress"
                placeholder="Delivery Address"
                value={deliveryAddress}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                placeholder="Enter zip code"
                value={zipCode}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter city"
                value={city}
                readOnly
              />
            </div>
          </div>

          <div className="payment-information">
            <h3>Payment Information</h3>
            <div>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                placeholder="Debit/Credit card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="expirationDate">Expiration Date</label>
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
                  <p>
                    ({item.quantity}) {item.title} - $
                    {item.price * item.quantity}
                  </p>
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
          </div>
          <div className="combined-summary centered-button">
            <button
              className="place-order"
              onClick={handlePlaceOrderClick}
              to="/confirmation"
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        // Prompt user to log in or create an account
        <div>
          <p>
            Please <Link to="/login">Log in </Link> or{" "}
            <Link to="/register">Create an Account</Link> to proceed with the
            checkout.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderInformationForm;
