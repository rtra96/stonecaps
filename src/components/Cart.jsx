import React from 'react';
import { CartContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Calculate order summary values
  const numberOfItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingAndHandling = 10;
  const totalBeforeTax = totalPrice + shippingAndHandling;
  const taxRate = 0.1;
  const taxAmount = totalBeforeTax * taxRate;
  const grandTotal = totalBeforeTax + taxAmount;
  const roundedNumberOfItems = numberOfItems.toFixed(0); // Round to 0 decimal places
  const roundedTotalPrice = totalPrice.toFixed(2); // Round to 2 decimal places
  const roundedShippingAndHandling = shippingAndHandling.toFixed(2); // Round to 2 decimal places
  const roundedTotalBeforeTax = totalBeforeTax.toFixed(2); // Round to 2 decimal places
  const roundedGrandTotal = grandTotal.toFixed(2);

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Link to="/">
          <p>Your cart is empty. Click to return home.</p>
        </Link>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} style={{ maxHeight: '100px', maxWidth: '150px' }} />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <div>
                <label>quantity:</label>
                <input
                  className="cutie-input"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <br />
              <button onClick={() => removeFromCart(item.id)}>Remove From Cart</button>
            </div>
          ))}
          <br />

          {/* Order Summary */}
          <div className="order-summary-card">
            <h3>Order Summary</h3>
            <hr />
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
          <div className="cart-buttons">
            <button onClick={clearCart}>Clear Cart</button>
            <button onClick={() => navigate('/checkout')}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
