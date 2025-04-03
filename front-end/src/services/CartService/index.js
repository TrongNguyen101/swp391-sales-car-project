import * as request from "../../utils/AccessoryRequest";

export const postAddProductToCart = async (
  token,
  accessoryId,
  accessoryName,
  accessoryPrice,
  accessoryImage,
  userId
) => {
  try {
    const response = await request.post(
      "api/Cart/addAccessoryToCart",
      {
        productId: accessoryId,
        productName: accessoryName,
        Price: accessoryPrice,
        Quantity: 1,
        ImageUrl: accessoryImage,
        UserId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error at CartService:", error.response.data);
    return error.response.data;
  }
};

export const getAllCartItems = async (token) => {
  try {
    const response = await request.get("/api/Cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.value;
  } catch (error) {
    return error.response;
  }
};

export const updateCartItems = async (token, cartItems) => {
  try {
    const response = await request.post(
      "/api/Cart/updateItemQuantity",
      cartItems,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.value;
  } catch (error) {
    return error.response.data.value;
  }
};

export const deleteCartItem = async (cartItemId) => {
  try {
    const token = localStorage.getItem("Bearer");
    const response = await request.deletebyId(
      `/api/Cart/delete/${cartItemId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.value;
  } catch (error) {
    return error.response;
  }
};

export const getAllProductsIsOutOfStock = async (userId) => {
  try {
    const response = await request.get(`/api/Cart/getListProductsOutOfStock/${userId}`);
    return response.data.value;
  } catch (error) {
    return error.response;
  }
};

