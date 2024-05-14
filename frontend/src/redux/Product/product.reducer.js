import { GET_PRODUCTS, SET_PRODUCT_DETAILS } from './product.action.type';

const initialState = {
  productDetails: [],
  products: [],
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetails: action.payload,
      };

      case GET_PRODUCTS:
          return { ...state, products: action.payload };  

    default:
      return state;
  }
};




// export const selectedProductsReducer = (state = {}, { type, payload }) => {
//   console.log(type);
//   switch (type) {
//     case ActionTypes.SELECTED_PRODUCT:
//       return { ...state, ...payload };
//     case ActionTypes.REMOVE_SELECTED_PRODUCT:
//       return {};
//     default:
//       return state;
//   }
// };