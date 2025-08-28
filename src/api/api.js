import axios from 'axios';
const API_BASE_URL = 'https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev';
const USER_ID = 'testUser '; // temporary hardcoded user
// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data || []; // Return the data or an empty array if no data
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; // Return an empty array in case of error
  }
};
// Fetch cart items for current user
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { userId: USER_ID }
    });
    return response.data || []; // Return the data or an empty array if no data
  } catch (err) {
    console.error("Error fetching cart:", err);
    return []; // Return an empty array in case of error
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
    return response.data || []; // Return the data or an empty array if no data
  } catch (err) {
    console.error("Add to cart error:", err);
    return []; // Return an empty array in case of error
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
    return response.data || { message: "Checkout failed" }; // Return the data or a failure message
  } catch (err) {
    console.error("Checkout error:", err);
    return { message: "Checkout error" }; // Return an error message in case of error
  }
};