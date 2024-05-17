import axios from "axios";

export const getOrdersAPI = async(encCompanyId) => {
    console.log("ec",encCompanyId);
    const res = await axios.get(`http://127.0.0.1:8000/api/my-orders/${encCompanyId}`);

    
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}