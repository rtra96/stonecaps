import React from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const navigate = useNavigate();

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} style={{ maxHeight: '100px', maxWidth: '150px' }} />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <div>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <br />
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
