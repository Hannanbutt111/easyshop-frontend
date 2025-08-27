import React, { useEffect, useState } from 'react';
import { getCart, addToCart } from './api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const savedCart = await getCart(); // call Lambda via API
      setCartItems(savedCart);
    }
    fetchCart();
  }, []);

  const handleAddToCart = async (item) => {
    const updatedCart = await addToCart(item); // updates DynamoDB
    setCartItems(updatedCart); // update state
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? <p>Cart is empty</p> : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
      {/* Example: button to add an item */}
      <button onClick={() => handleAddToCart({ name: 'Sample', price: 10 })}>
        Add Sample Item
      </button>
    </div>
  );
}

export default Cart;
