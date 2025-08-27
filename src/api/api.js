    // For getCart function:
export const getCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, {
      params: { userId: USER_ID }
    });
    // CORRECTED: Directly return response.data as it's already parsed JSON
    if (response.data) return response.data;
    return [];
  } catch (err) {
    console.error("Error fetching cart:", err);
    return [];
  }
};
// For addToCart function:
export const addToCart = async (item) => {
  try {
    const payload = {
      userId: USER_ID,
      productId: item.productId,
      quantity: item.quantity
    };
    const response = await axios.post(`${API_BASE_URL}/cart`, payload);
    // CORRECTED: Directly return response.data as it's already parsed JSON
    if (response.data) return response.data;
    return [];
  } catch (err) {
    console.error("Add to cart error:", err);
    return [];
  }
};
// For checkoutCart function (if it also returns direct JSON):
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
    // CORRECTED: Directly return response.data as it's already parsed JSON
    if (response.data) return response.data;
    return { message: "Checkout failed" }; // Or whatever default you want if data is empty
  } catch (err) {
    console.error("Checkout error:", err);
    return { message: "Checkout error" };
  }
};