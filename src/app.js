import React, { useState } from 'react';
import ProductList from './components/productlist';
import Cart from './components/cart';
import Checkout from './components/checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div>
      <h1>EasyShop</h1>
      <ProductList setCartItems={setCartItems} />
      <Cart cartItems={cartItems} />
      <Checkout cartItems={cartItems} />
    </div>
  );
}

export default App;
