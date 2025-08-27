import React from 'react';
import ProductList from './components/productlist';
import Cart from './components/cart';

function App() {
  return (
    <div>
      <h1>EasyShop</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
