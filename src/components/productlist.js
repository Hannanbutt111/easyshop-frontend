// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { getProducts, addToCart, getCart } from '../api/api';

function ProductList({ setCartItems }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on load
  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
        // Fetch current cart for user
        const cartData = await getCart();
        setCartItems(cartData || []);
      } catch (err) {
        console.error('Error fetching products or cart:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [setCartItems]);

  const handleAddToCart = async (product) => {
    try {
      const updatedCart = await addToCart({
        productId: product.productId,
        quantity: 1
      });
      setCartItems(updatedCart); // Update cart in App state
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <div key={product.productId}>
            <p>{product.name || product.productId} - ${product.price || 'N/A'}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;
