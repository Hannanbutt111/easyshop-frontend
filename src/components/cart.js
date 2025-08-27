import React, { useEffect, useState } from 'react';
import { getCart, addToCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const USER_ID = 'testUser'; // temporary hardcoded user

  // Fetch the cart on component mount
  useEffect(() => {
    async function fetchCart() {
      try {
        const savedCart = await getCart(); // uses GET with query param
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
        productId: item.id, // unique product ID
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
          handleAddToCart({ id: 'sample-1', name: 'Sample Item', price: 10 })
        }
      >
        Add Sample Item
      </button>
    </div>
  );
}

export default Cart;
