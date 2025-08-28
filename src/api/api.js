import axios from 'axios';

const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data || [];
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

// Fetch cart items for a given user
export const getCart = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { userId }
    });
    return response.data || [];
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
};

// Add item to cart
export const addToCart = async (userId, item) => {
  try {
    const payload = {
      userId,
      productId: item.productId,
      quantity: item.quantity
    };
    const response = await axios.post(`${API_BASE_URL}/cart`, payload);
    return response.data || [];
  } catch (err) {
    console.error("Add to cart error:", err);
    return [];
  }
};

// Checkout cart — only send userId
export const checkoutCart = async (userId) => {
  try {
    const payload = { userId };
    const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
    return response.data || { message: "Checkout failed" };
  } catch (err) {
    console.error("Checkout error:", err);
    return { message: "Checkout error" };
  }
};
