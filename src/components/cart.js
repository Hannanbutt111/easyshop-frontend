import React, { useEffect, useState } from 'react';
import { getCart, addToCart, checkoutCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    async function fetchCart() {
      const savedCart = await getCart();
      setCartItems(savedCart);
    }
    fetchCart();
  }, []);

  // Add sample product to cart
  const handleAddSample = async () => {
    const updatedCart = await addToCart({
      productId: 'sample-1',
      quantity: 1
    });
    setCartItems(updatedCart);
  };

  // Checkout
  const handleCheckout = async () => {
    const result = await checkoutCart(cartItems);
    console.log("Checkout result:", result);
    setCartItems([]); // clear cart on checkout
    alert(result.message || "Checkout successful!");
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

      <button onClick={handleAddSample}>Add Sample Item</button>
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}

export default Cart;
