// src/components/Cart.js
import React, { useEffect, useState } from 'react';
import { getCart, addToCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Fetch the cart on component mount
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

  // Add item to cart
  const handleAddToCart = async (item) => {
    try {
      const updatedCart = await addToCart({
        productId: item.productId, // must match DynamoDB table
        quantity: 1
      });
      setCartItems(updatedCart); // update state with returned cart
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
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

      {/* Example button to add a sample product */}
      <button
        onClick={() =>
          handleAddToCart({ productId: 'sample-1', name: 'Sample Item', price: 10 })
        }
      >
        Add Sample Item
      </button>
    </div>
  );
}

export default Cart;
