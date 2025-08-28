import React, { useState, useEffect } from 'react';
import { getCart, checkoutCart } from '../api/api';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const USER_ID = 'testUser'; // Make sure no trailing space!

  // Load cart items on component mount
  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart(USER_ID);
      setCartItems(items);
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty.');
      return;
    }
    try {
      const response = await checkoutCart(USER_ID);
      if (response.success) {
        setMessage(`Checkout completed! Order ID: ${response.orderId}`);
        setCartItems([]); // Clear local cart after successful checkout
      } else {
        setMessage(response.message || 'Checkout failed.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage('Checkout failed. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.productId} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkout;
