import { getSubCategoriesAPI } from '../Admin/admin.api';
//import axios from "axios";

export const getUserSubCategoriesAPI = async (encCatId) => {
    try {
        const res = await getSubCategoriesAPI(encCatId); // Call the API function from admin.api.js
        return res.data;
    } catch (error) {
        console.error('Error fetching user subcategories:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
  }

  