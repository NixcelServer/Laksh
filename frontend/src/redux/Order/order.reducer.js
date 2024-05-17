import * as types from "./order.action.type";

const initalState = {

    isLoading: false,
    isError: false,
    orders: [],
    buyleads:[],
}
export const orderReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_ORDERS:
        return { ...state, orders: payload };

      case types.GET_BUYLEADS:
        return {...state,buyleads:payload }  
    
        default: {
            return state;
          }
        }
      };