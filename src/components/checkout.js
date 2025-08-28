import React, { useEffect, useState } from 'react';
import { getCart, checkoutCart } from '../api/api';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');

  // Load cart items from backend
  const fetchCart = async () => {
    const items = await getCart();
    setCartItems(items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty.');
      return;
    }
    try {
      const result = await checkoutCart();
      if (result.success) {
        setMessage(`Checkout completed! Order ID: ${result.orderId}`);
        await fetchCart(); // refresh cart after checkout
      } else {
        setMessage(result.message || 'Checkout failed.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setMessage('Checkout failed. Check console for details.');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.productId} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCheckout}>Checkout</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Checkout;
