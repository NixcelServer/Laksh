import axios from "axios";

export const getProductsAPI = async(payload) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/getproducts/${payload}`);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}