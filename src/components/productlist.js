// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const prods = await getProducts();
      setProducts(prods);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const updatedCart = await addToCart({
      productId: product.productId, // must match DynamoDB
      quantity: 1
    });
    console.log("Updated cart:", updatedCart);
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price.toFixed(2)}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
