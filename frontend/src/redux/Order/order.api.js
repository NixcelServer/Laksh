
import axios from "axios";
import { baseURL } from "../../utils/variables";


export const getOrdersAPI = async(payload) => {
   
    const res = await axios.get(`${baseURL}api/my-orders/${payload}`);

    
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getBuyleadsAPI = async(encCompanyId) => {
  const res = await axios.get(`${baseURL}api/buyleads/${encCompanyId}`);
  return res.data;
}

