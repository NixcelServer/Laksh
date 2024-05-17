import * as types from "./order.action.type"
 import { getBuyleadsAPI, getOrdersAPI } from "./order.api"

 export const getOrders = (encCompanyId) => async(dispatch) => {
    try{
        console.log("in order action",encCompanyId);
        const res = await getOrdersAPI(encCompanyId);
        
        dispatch({ type: types.GET_ORDERS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};


export const getBuyleads = (encCompanyId) => async(dispatch) => {
    try{
        const res = await getBuyleadsAPI(encCompanyId);
        dispatch({ type: types.GET_BUYLEADS, payload:res});
    }catch(err){
        console.log(err);
    }
}