import React, { useEffect, useState } from 'react';
import { getCart, checkoutCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      try {
        const savedCart = await getCart();
        setCartItems(savedCart);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
    }
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    try {
      const result = await checkoutCart(cartItems);
      console.log('Checkout result:', result);
      setCartItems([]); // empty cart after checkout
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId}>
              {item.productId} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && <button onClick={handleCheckout}>Checkout</button>}
    </div>
  );
}

export default Cart;
