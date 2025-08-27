// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';
const USER_ID = 'testUser'; // temporary hardcoded user

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data; // array of products
};

// Fetch cart items for current user
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    params: { userId: USER_ID } // send userId as query param
  });
  return response.data; // array of cart items
};

// Add item to cart
export const addToCart = async ({ productId, quantity }) => {
  const payload = {
    userId: USER_ID,
    productId,
    quantity
  };

  const response = await axios.post(`${API_BASE_URL}/cart`, payload);
  return response.data; // updated cart array
};

// Checkout cart
export const checkoutCart = async (cartItems) => {
  const payload = {
    userId: USER_ID,
    cart: cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }))
  };
  const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
  return response.data;
};
