import * as types from "./order.action.type"
 import { getOrdersAPI } from "./order.api"

 export const getOrders = (encCompanyId) => async(dispatch) => {
    try{
        
        const res = await getOrdersAPI(encCompanyId);
        
        dispatch({ type: types.GET_ORDERS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};