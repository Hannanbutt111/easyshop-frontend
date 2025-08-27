import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';
const USER_ID = 'testUser'; // you can change this or make it dynamic

// Fetch all products
export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

// Fetch cart items for current user
export const getCart = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart`, {
    params: { userId: USER_ID }
  });
  return response.data;
};

// Add item to cart
export const addToCart = async (item) => {
  const payload = { ...item, userId: USER_ID };
  const response = await axios.post(`${API_BASE_URL}/cart`, payload);
  return response.data;
};

// Checkout cart
export const checkoutCart = async (cart) => {
  const payload = {
    userId: USER_ID,
    cart: cart.map(item => ({ productId: item.productId, quantity: item.quantity }))
  };
  const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
  return response.data;
};
