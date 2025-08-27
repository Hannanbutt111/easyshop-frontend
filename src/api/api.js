import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Fetch cart items for current user/session
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`);
  return response.data;
};

// Add item to cart
export const addToCart = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, item);
  return response.data;
};

// Checkout cart
export const checkoutCart = async (cart) => {
  const response = await axios.post(`${API_BASE_URL}/checkout`, { cart });
  return response.data;
};
