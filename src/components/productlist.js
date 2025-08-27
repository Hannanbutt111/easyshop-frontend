// src/components/ProductList.js
import React, { useEffect, useState } from 'react';

// Base API URL for your API Gateway
const API_BASE = "https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev";

// Fetch all products
async function getProducts() {
  try {
    const res = await fetch(`${API_BASE}/products`);
    if (!res.ok) throw new Error(`GET products failed: ${res.status}`);
    const data = await res.json();
    return data; // array of products
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}

// Add item to cart via POST /cart
async function addToCart({ userId, productId, quantity }) {
  try {
    const res = await fetch(`${API_BASE}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, productId, quantity })
    });
    if (!res.ok) throw new Error(`Add to cart failed: ${res.status}`);
    const data = await res.json();
    return data; // updated cart array
  } catch (err) {
    console.error("Error adding to cart:", err);
    return [];
  }
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const USER_ID = 'testUser'; // temporary hardcoded user

  useEffect(() => {
    async function fetchProducts() {
      const prods = await getProducts();
      setProducts(prods);
    }
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const updatedCart = await addToCart({
      userId: USER_ID,
      productId: product.id,
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
