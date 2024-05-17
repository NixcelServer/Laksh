import * as types from "./order.action.type";

const initalState = {

    isLoading: false,
    isError: false,
    orders: [],
}
export const orderReducer = (state = initalState, { type,payload }) => {

    switch (type) {

      case types.GET_ORDERS:
        return { ...state, orders: payload };

    
        default: {
            return state;
          }
        }
      };