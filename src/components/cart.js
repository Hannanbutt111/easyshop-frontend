import React, { useEffect, useState } from 'react';
import { getCart, addToCart, checkoutCart } from '../api/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    const fetchCart = async () => {
      const savedCart = await getCart();
      setCartItems(savedCart);
    };
    fetchCart();
  }, []);

  // Add product to cart and fetch updated cart
  const handleAddSample = async () => {
    await addToCart({ productId: 'sample-1', quantity: 1 });
    const updatedCart = await getCart();
    setCartItems(updatedCart);
  };

  // Checkout
  const handleCheckout = async () => {
    const result = await checkoutCart();
    console.log('Checkout result:', result);
    if (result.success) {
      setCartItems([]); // clear cart on successful checkout
      alert(`Checkout completed! Order ID: ${result.orderId}`);
    } else {
      alert(result.message || 'Checkout failed!');
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

      <button onClick={handleAddSample}>Add Sample Item</button>
      {cartItems.length > 0 && (
        <button onClick={handleCheckout}>Checkout</button>
      )}
    </div>
  );
}

export default Cart;
