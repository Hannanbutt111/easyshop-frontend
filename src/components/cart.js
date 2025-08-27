// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { getCart, addToCart, checkoutCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart on mount
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const savedCart = await getCart();
        setCartItems(savedCart);
      } catch (err) {
        console.error('Error fetching cart:', err);
      }
      setLoading(false);
    }
    fetchCart();
  }, []);

  // Add item to cart
  const handleAddToCart = async (item) => {
    try {
      const updatedCart = await addToCart({
        productId: item.id,
        quantity: 1
      });
      setCartItems(updatedCart);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Checkout
  const handleCheckout = async () => {
    try {
      const response = await checkoutCart(cartItems);
      alert('Checkout successful!');
      setCartItems([]); // empty cart
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed');
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {loading ? <p>Loading cart...</p> : null}
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.productId} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() =>
          handleAddToCart({ id: 'sample-1', name: 'Sample Item', price: 10 })
        }
      >
        Add Sample Item
      </button>

      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}

export default Cart;
