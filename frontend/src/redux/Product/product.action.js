import { SET_PRODUCT_DETAILS } from "./Product/product.action.type";

export const setProductDetails = (details) => {
  return {
    type:SET_PRODUCT_DETAILS,
    payload: details,
  };
};

// export const selectedProduct = (product) => {
//   return {
//     type: ActionTypes.SELECTED_PRODUCT,
//     payload: product,
//   };
// };
// export const removeSelectedProduct = () => {
//   return {
//     type: ActionTypes.REMOVE_SELECTED_PRODUCT,
//   };
// };