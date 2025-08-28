import React, { useState } from 'react';
import { checkoutCart } from '../api/api';

function Checkout({ cartItems }) {
  const [message, setMessage] = useState('');
  const USER_ID = 'testUser'; // No trailing space!

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty.');
      return;
    }
    try {
      // Only send userId as payload
      const payload = { userId: USER_ID };
      const response = await checkoutCart(payload);
      setMessage(response.message || 'Checkout completed!');
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage('Checkout failed. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkout