import React from 'react';
import { useCart } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <Link to ="/"><p>Your cart is empty. Click to return home.</p></Link>
        
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.image} alt={item.title} style={{ maxHeight: '100px', maxWidth: '150px' }} />
              <p>{item.title}</p>
              <p>Price: ${item.price}</p>
              <div>
                <label>quantity:</label>
                <input className ="cutie-input"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove From Cart</button>
            </div>
          ))}
          <br />
         <div className="cart-buttons"> 
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
