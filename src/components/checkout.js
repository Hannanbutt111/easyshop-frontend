import React, { useState } from 'react';
import { checkoutCart } from '../api/api';
function Checkout({ cartItems }) {
  const [message, setMessage] = useState('');
  const USER_ID = 'testUser '; // This should match your user/session
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty.');
      return;
    }
    try {
      // Prepare the payload directly as expected by the API
      const payload = {
        userId: USER_ID,
        cart: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };

            const response = await checkoutCart(payload); // Pass the payload directly
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