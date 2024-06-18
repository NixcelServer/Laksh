import axios from "axios";
import { baseURL } from "../../utils/variables";


export const getProductsAPI = async(payload) => {
    const res = await axios.get(`${baseURL}api/getproducts/${payload}`);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getAllProductsAPI = async(payload) => {
  const res = await axios.get(`${baseURL}api/getallproducts`);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getSubCatWiseProdAPI = async(encCatId) => {
  const res = await axios.get(`${baseURL}api/product-by-category/${encCatId}`);
  return res.data;
}