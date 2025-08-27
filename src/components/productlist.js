// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function ProductList({ setCartItems }) {
  const [products, setProducts] = useState([]);
  const USER_ID = 'testUser'; // temporary hardcoded user

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const updatedCart = await addToCart({
        userId: USER_ID,
        productId: product.productId, // must match DynamoDB key
        quantity: 1
      });
      setCartItems(updatedCart); // update cart in App state
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product, idx) => (
          <div key={idx}>
            <p>{product.name} - ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
