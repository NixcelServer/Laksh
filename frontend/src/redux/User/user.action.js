
import * as types from "./user.action.type";
import { getUserSubCategoriesAPI  } from './user.api';

export const setSelectedCategory = (limitedCategories) => async(dispatch) => {
    dispatch({ type: types.SET_SELECTED_CATEGORY, payload:limitedCategories});

try {
    // Call the API function to fetch subcategories associated with the selected category
    const subCategories = await getUserSubCategoriesAPI (limitedCategories); // Pass the selected category or its ID to the API function
    // Dispatch an action to store the fetched subcategories in the state
    dispatch({ type: types.GET_SUBCATEGORIES, payload: subCategories });
} catch (error) {
    console.error('Error fetching subcategories:', error);
    // Optionally, dispatch an error action or handle the error appropriately
    // dispatch({ type: types.ERROR, payload: error.response.data.error });
}

};

