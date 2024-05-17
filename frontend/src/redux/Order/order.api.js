
import axios from "axios";

export const getOrdersAPI = async(payload) => {
   
    const res = await axios.get(`http://127.0.0.1:8000/api/my-orders/${payload}`);

    
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getBuyleadsAPI = async(encCompanyId) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/buyleads/${encCompanyId}`);
  return res.data;
}

