import React, { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../api/api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const prods = await getProducts();
      setProducts(prods);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const updatedCart = await addToCart({
        productId: product.productId,
        quantity: 1
      });
      setCart(updatedCart);
      console.log('Updated cart:', updatedCart);
    } catch (err) {
      console.error('Add to cart error:', err);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.productId}>
              {product.name} - ${product.price}
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
