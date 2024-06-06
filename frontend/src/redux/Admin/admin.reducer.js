import * as types from "./admin.action.type";
//import { SELECT_CATEGORY } from './actions';
const initalState = {

    isLoading: false,
    isError: true,
    categories: [],
    selectedCategories:[],
    keywords:[],
    uom:[],
    subCategories: [],
    advImages:[],
    users: [],
    admins:[],
   
   
    
}
 
export const reducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_CATEGORIES:
        return { ...state, categories: payload };

        case types.SET_CATEGORIES:
      return {
        ...state,
        selectedCategories: payload,
      };

        case types.GET_KEYWORDS:
          return { ...state, keywords: payload };  

          case types.GET_UOM:
          return { ...state, uom: payload };  

    case types.GET_SUBCATEGORIES:
        return { ...state, subCategories: payload };

        case types.SET_ADV_IMG:
        return { ...state, advImages: payload };

    case type.SELECT_CATEGORY:
      return {
          ...state,
          selectedCategory: action.payload
      };
      // case SET_SELECTED_CATEGORY:
      //   return {
      //     ...state,
      //     selectedCategory: action.payload,
      //   };
        

//         case types.GET_PRODUCT_LOADING:
//             return {
//                     ...state,
//                     isLoading: true,
//                     isError: false
//                 }
            
//         case types.GET_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading:false,
//                 isError:false,
//                 plyWoodProducts:payload?.data,
//                 totalPly:payload.totalPages

//             }
//         case types.DELETE_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading:false,
//                 isError:false,
//             }
//         case types.POST_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading:false,
//                 isError:false,
//             }
//         case types.UPDATE_PRODUCT_SUCCESS:
//             return {
//                 ...state,
//                 isLoading:false,
//                 isError:false,   
//             }


// case types.GET_PRODUCT_ERROR:
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };

//     // admin

//     case types.GET_ADMINS_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         admins: payload,
//       };
//     case types.GET_USERS_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         users: payload,
//       };

    default: {
      return state;
    }
  }
};
