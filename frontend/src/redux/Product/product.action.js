import { SET_PRODUCT_DETAILS, GET_PRODUCTS, GET_ALL_PRODUCTS, SELECTED_PRODUCTS } from "./product.action.type";
import { getAllProductsAPI, getProductsAPI } from "./product.api";

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

export const getAllProducts = () => async () => {
  try {
    const res = await getAllProductsAPI();
    dispatch({ type: GET_ALL_PRODUCTS, payload: res });
  } catch (err) {
    console.log(err);
    // Dispatch an error action or handle the error in some way
  }
}

export const setSelectedProducts = (limitedProducts) => async(dispatch) => {
  dispatch({ type: SELECTED_PRODUCTS, payload:limitedProducts});
  

};