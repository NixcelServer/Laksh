import { SET_PRODUCT_DETAILS, GET_PRODUCTS } from "./product.action.type";
import { getProductsAPI } from "./product.api";

export const setProductDetails = (details) => {
  return {
    type: SET_PRODUCT_DETAILS,
    payload: details,
  };
};

export const getProducts = (payload) => async (dispatch) => {
  try {
    const res = await getProductsAPI(payload);
    dispatch({ type: GET_PRODUCTS, payload: res });
  } catch (err) {
    console.log(err);
    // Dispatch an error action or handle the error in some way
  }
};
