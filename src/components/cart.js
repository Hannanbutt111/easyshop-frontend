// src/components/Cart.js
import React, { useEffect, useState } from "react";
import { getCart, addToCart, checkoutCart } from "../api/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchCart() {
      const savedCart = await getCart();
      setCartItems(savedCart);
    }
    fetchCart();
  }, []);

  const handleAddToCart = async (item) => {
    const updatedCart = await addToCart({ productId: item.id, quantity: 1 });
    setCartItems([...updatedCart]); // new array to trigger re-render
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Cart is empty");
    const result = await checkoutCart(cartItems);
    alert("Checkout successful!");
    setCartItems([]); // clear cart after checkout
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
      <button
        onClick={() =>
          handleAddToCart({ id: "sample-1", name: "Sample Item", price: 10 })
        }
      >
        Add Sample Item
      </button>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
