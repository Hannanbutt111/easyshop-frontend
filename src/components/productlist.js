// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const prods = await getProducts();
        setProducts(prods);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const updatedCart = await addToCart({
        productId: product.productId,
        quantity: 1
      });
      console.log('Updated cart:', updatedCart);
      alert(`Added ${product.name} to cart`);
    } catch (err) {
      console.error('Add to cart error:', err);
      alert('Failed to add item');
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {loading ? <p>Loading products...</p> : null}
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
