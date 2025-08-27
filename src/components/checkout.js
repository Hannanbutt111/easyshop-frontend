import React, { useState } from 'react';
import { checkoutCart } from '../api';

function Checkout({ cartItems }) {
  const [message, setMessage] = useState('');

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty.');
      return;
    }

    const response = await checkoutCart(cartItems);
    setMessage(response.message || 'Checkout completed!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkout;
