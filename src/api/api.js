import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const addToCart = async (item) => {
  const response = await axios.post(`${API_BASE_URL}/cart`, item);
  return response.data;
};

export const checkoutCart = async (cart) => {
  const response = await axios.post(`${API_BASE_URL}/checkout`, { cart });
  return response.data;
};
