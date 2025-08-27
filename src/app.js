// src/api/api.js
import axios from "axios";

const API_BASE_URL = "https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev";
const USER_ID = "testUser"; // temporary hardcoded user

const parseLambdaBody = (response) => {
  try {
    return JSON.parse(response.data.body || "[]");
  } catch (err) {
    console.error("Failed to parse Lambda response:", err, response.data);
    return [];
  }
};

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data || [];
};

// Fetch cart
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    params: { userId: USER_ID },
  });
  return parseLambdaBody(response);
};

// Add item to cart
export const addToCart = async (item) => {
  const payload = { userId: USER_ID, productId: item.productId, quantity: item.quantity };
  const response = await axios.post(`${API_BASE_URL}/cart`, payload);
  return parseLambdaBody(response);
};

// Checkout
export const checkoutCart = async (cartItems) => {
  const payload = {
    userId: USER_ID,
    cart: cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    })),
  };
  const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
  return parseLambdaBody(response);
};
