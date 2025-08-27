import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api';

function ProductList({ setCartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const updatedCart = await addToCart(product);
    setCartItems(updatedCart);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product, idx) => (
        <div key={idx}>
          <p>{product.name} - ${product.price}</p>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
