// src/components/Cart.js
import React, { useEffect, useState } from 'react';

// Base API URL for your API Gateway
const API_BASE = "https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev";

// Fetch cart items from GET /cart
async function getCart(userId) {
  try {
    const res = await fetch(`${API_BASE}/cart?userId=${userId}`);
    if (!res.ok) throw new Error(`GET cart failed: ${res.status}`);
    const data = await res.json();
    return data; // should be array of items
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
}

// Add item to cart via POST /cart
async function addToCart({ userId, productId, quantity }) {
  try {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, productId, quantity })
    });
    if (!res.ok) throw new Error(`Add to cart failed: ${res.status}`);
    const data = await res.json();
    return data; // updated cart array
  } catch (err) {
    console.error("Error adding to cart:", err);
    return [];
  }
}

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const USER_ID = 'testUser'; // temporary hardcoded user

  // Fetch the cart on component mount
  useEffect(() => {
    async function fetchCart() {
      const savedCart = await getCart(USER_ID);
      setCartItems(savedCart);
    }
    fetchCart();
  }, []);

  // Add item to cart
  const handleAddToCart = async (item) => {
    const updatedCart = await addToCart({
      userId: USER_ID,
      productId: item.id,
      quantity: 1
    });
    setCartItems(updatedCart);
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
