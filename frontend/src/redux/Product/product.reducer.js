import { GET_ALL_PRODUCTS, GET_PRODUCTS, GET_PRODUCTS_BY_SUBCATEGORY, SELECTED_PRODUCTS, SET_PRODUCT_DETAILS } from './product.action.type';

const initialState = {
  productDetails: [],
  products: [],
  allProducts: [],
  selectedProducts:[],
  productsBySubCategory:[],
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
          
          case GET_ALL_PRODUCTS:
            return { ...state, allProducts: action.payload };     

            case SELECTED_PRODUCTS:
          return {...state, selectedProducts:action.payload};

          case GET_PRODUCTS_BY_SUBCATEGORY:
            return { ...state, productsBySubCategory:action.payload}

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