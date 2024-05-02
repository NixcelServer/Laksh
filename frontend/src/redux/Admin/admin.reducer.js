import * as types from "./admin.action.type";

const initalState = {

    isLoading: false,
    isError: true,
    categories: [],
    keywords:[],
    uom:[],
    subCategories: [],
    plyWoodProducts: [],
    totalPly:0,
    users: [],
    admins:[]
}
 
export const reducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_CATEGORIES:
        return { ...state, categories: payload };

        case types.GET_KEYWORDS:
          return { ...state, keywords: payload };  

          case types.GET_UOM:
          return { ...state, uom: payload };  

    case types.GET_SUBCATEGORIES:
        return { ...state, subCategories: payload };

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
