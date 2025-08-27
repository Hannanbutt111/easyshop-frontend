import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';
const USER_ID = 'testUser'; // temporary hardcoded user

// Helper to safely parse Lambda body
const parseBody = (response) => {
  if (response.data && typeof response.data.body === 'string') {
    return JSON.parse(response.data.body);
  }
  return response.data || [];
};

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data; // products array
};

// Fetch cart items
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, { params: { userId: USER_ID } });
  return parseBody(response);
};

// Add item to cart
export const addToCart = async (item) => {
  const payload = {
    userId: USER_ID,
    productId: item.productId,
    quantity: item.quantity
  };
  const response = await axios.post(`${API_BASE_URL}/cart`, payload);
  return parseBody(response); // updated cart array
};

// Checkout cart
export const checkoutCart = async (cartItems) => {
  const payload = {
    userId: USER_ID,
    cart: cartItems.map(item => ({ productId: item.productId, quantity: item.quantity }))
  };
  const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
  return parseBody(response); // { success: true, orderId: ... }
};
