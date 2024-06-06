import { SET_SELECTED_CATEGORY ,GET_SUBCATEGORIES} from "./user.action.type";
//import {GET_SUBCATEGORIES} from "./user.action.type"
const initalState = {

    isLoading: false,
    isError: true,
    selectedCategory: null,
    subcategories: []
}

export const userReducer = (state = initalState, action) => {

    switch (action.type) {

case SET_SELECTED_CATEGORY:
    return {...state, 
        selectedCategory:action.payload,
    };
        case GET_SUBCATEGORIES:
      return {
        ...state,
        subcategories: action.payload  ,
      };
    

    default:
        return state;
    }
    };
    
    
  
 
