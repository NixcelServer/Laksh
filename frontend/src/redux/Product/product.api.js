import axios from "axios";

export const getProductsAPI = async(payload) => {
    const res = await axios.get(`http://127.0.0.1:8000/api/getproducts/${payload}`);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getAllProductsAPI = async(payload) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/getallproducts`);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getSubCatWiseProdAPI = async(encCatId) => {
  const res = await axios.get(`http://127.0.0.1:8000/api/product-by-category/${encCatId}`);
  return res.data;
}