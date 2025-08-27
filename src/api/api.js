// src/api/api.js
import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';
const USER_ID = 'testUser'; // temporary hardcoded user

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data || []; // products array
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

// Fetch cart items for current user
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { userId: USER_ID }
    });
    // Safely parse Lambda response
    if (response.data && response.data.body) {
      return JSON.parse(response.data.body);
    }
    return [];
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
};

// Add item to cart
export const addToCart = async (item) => {
  try {
    const payload = {
      userId: USER_ID,
      productId: item.productId,
      quantity: item.quantity
    };
    const response = await axios.post(`${API_BASE_URL}/cart`, payload);
    if (response.data && response.data.body) {
      return JSON.parse(response.data.body);
    }
    return [];
  } catch (err) {
    console.error("Add to cart error:", err);
    return [];
  }
};

// Checkout cart
export const checkoutCart = async (cartItems) => {
  try {
    const payload = {
      userId: USER_ID,
      cart: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
    if (response.data && response.data.body) {
      return JSON.parse(response.data.body);
    }
    return { success: false };
  } catch (err) {
    console.error("Checkout error:", err);
    return { success: false };
  }
};
