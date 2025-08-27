import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function ProductList({ setCartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  const handleAdd = async (product) => {
    await addToCart({ userId: 'user1', productId: product.productId, quantity: 1 });
    setCartItems(prev => [...prev, product]);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map(p => (
        <div key={p.productId}>
          <p>{p.name} - ${p.price}</p>
          <button onClick={() => handleAdd(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
