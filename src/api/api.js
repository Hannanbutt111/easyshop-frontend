import axios from "axios";

const API_BASE_URL = "https://k41qbcto52.execute-api.us-east-1.amazonaws.com/Dev";
const USER_ID = "testUser"; // ✅ Remove trailing space

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

// Fetch cart items for current user
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { userId: USER_ID }, // send userId as query param
    });
    return response.data || [];
  } catch (err) {
    console.error("Error fetching cart:", err.response?.data || err.message);
    return [];
  }
};

// Add item to cart
export const addToCart = async (item) => {
  try {
    if (!item || !item.productId || !item.quantity) {
      throw new Error("Invalid item object");
    }

    const payload = {
      userId: USER_ID,
      productId: item.productId,
      quantity: item.quantity,
    };

    const response = await axios.post(`${API_BASE_URL}/cart`, payload);
    return response.data || [];
  } catch (err) {
    console.error("Add to cart error:", err.response?.data || err.message);
    return [];
  }
};

// Checkout cart
export const checkoutCart = async () => {
  try {
    const payload = { userId: USER_ID }; // Lambda only expects userId
    const response = await axios.post(`${API_BASE_URL}/checkout`, payload);
    return response.data || { message: "Checkout failed" };
  } catch (err) {
    console.error("Checkout error:", err.response?.data || err.message);
    return { message: "Checkout error" };
  }
};
