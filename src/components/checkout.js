import React from 'react';
import { checkoutCart } from '../api/api';

function Checkout({ cartItems }) {
  const handleCheckout = async () => {
    const result = await checkoutCart(cartItems);
    alert(result.message || 'Checkout complete!');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>Checkout</button>
    </div>
  );
}

export default Checkout;
