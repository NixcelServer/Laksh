

 import * as types from "./admin.action.type"
 import { getCategoriesAPI, addCategoryAPI, getKeywordsAPI, addKeywordAPI, getUOMAPI, addUOMAPI, getSubCategoriesAPI, addSubCategoryAPI, updateCategoryAPI } from "./admin.api"
// import { deleteAdminDataAPI, deleteProductAPI, getAdminsDataAPI, getPlywoodAPI, getUsersDataAPI, postAdminDataAPI, postProductAPI, updateAdminDataAPI, updateProductAPI } from "./admin.api"

// export const getPlywoodProducts =(color,Page,limit,order,price)=>async (dispatch)=>{
//     console.log(color,Page,limit)
     
//     dispatch({type:types.GET_PRODUCT_LOADING})
    
//     try {
//             let data = await getPlywoodAPI(color,Page,limit,order,price)
    
//             dispatch({type:types.GET_PRODUCT_SUCCESS,payload:data})
//         // }
//         // console.log("data",data)
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }
// export const updatePlywoodProducts =(prod)=>async (dispatch)=>{
    
//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await updateProductAPI(prod)

//         dispatch({type:types.UPDATE_PRODUCT_SUCCESS})
//         dispatch(getPlywoodProducts())
//         // console.log(data)
//     } catch (err) {
//         // console.log(err)
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }

// export const deleteProductProduct=(id)=>async(dispatch)=>{
//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await deleteProductAPI(id)

//         dispatch({type:types.DELETE_PRODUCT_SUCCESS})
//         dispatch(getPlywoodProducts())
//         // console.log(data)
//     } catch (err) {
//         // console.log(err)
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }

// export const postProduct=(prod)=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await postProductAPI(prod)

//         dispatch({type:types.POST_PRODUCT_SUCCESS})
//         dispatch(getPlywoodProducts())
//         // console.log(data)
//     } catch (err) {
//         // console.log(err)
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }

// }

// export const getAdminData = ()=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await getAdminsDataAPI()
//         // console.log(data)
//         dispatch({type:types.GET_ADMINS_SUCCESS,payload:data})
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }

// export const updateAdminData = (admin)=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await updateAdminDataAPI(admin)
//         // console.log("data",data)
//         // dispatch({type:types.GET_ADMINS_SUCCESS,payload:data})
//         dispatch(getAdminData("admin"))
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }
// export const deleteAdminData = (id)=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await deleteAdminDataAPI(id)
//         // console.log("data",data)
//         // dispatch({type:types.GET_ADMINS_SUCCESS,payload:data})
//         dispatch(getAdminData("admin"))
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }
// export const postAdminData = (adminObj)=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await postAdminDataAPI(adminObj)
//         // console.log("data",data)
//         // dispatch({type:types.GET_ADMINS_SUCCESS,payload:data})
//         dispatch(getAdminData("admin"))
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// }

// export const getUsersData = ()=>async(dispatch)=>{

//     dispatch({type:types.GET_PRODUCT_LOADING})

//     try {
//         let data = await getUsersDataAPI()
//         // console.log(data)
//         dispatch({type:types.GET_USERS_SUCCESS,payload:data})
//     } catch (err) {
//         dispatch({type:types.GET_PRODUCT_ERROR})
//     }
// } 

export const getCategories = () => async(dispatch) => {
    try{
        
        const res = await getCategoriesAPI();
        dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const addCategory = (payload) => async(dispatch) => {
    try{
        
        const res = await addCategoryAPI(payload);
      //  dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const updateCategory = (payload) => async(dispatch) => {
    try{
        
        const res = await updateCategoryAPI(payload);
      //  dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const setCategories = (categories) => async(dispatch) => {
    dispatch({ type: types.SET_CATEGORIES, payload:categories});
    

  };
  


export const getSubCategories = () => async(dispatch) => {
    try{
        
        const res = await getSubCategoriesAPI();
        dispatch({ type: types.GET_SUBCATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const addSubCategory = (payload) => async(dispatch) => {
    try{
        
        const res = await addSubCategoryAPI(payload);
      //  dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getKeywords = () => async(dispatch) => {
    try{
        
        const res = await getKeywordsAPI();
        dispatch({ type: types.GET_KEYWORDS, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const addKeyword = (payload) => async(dispatch) => {
    try{
        
        const res = await addKeywordAPI(payload);
      //  dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const getUOM = () => async(dispatch) => {
    try{
        
        const res = await getUOMAPI();
        dispatch({ type: types.GET_UOM, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const addUOM = (payload) => async(dispatch) => {
    try{
        
        const res = await addUOMAPI(payload);
      //  dispatch({ type: types.GET_CATEGORIES, payload:res});
    } catch(err) {
        console.log(err);
        // dispatch({ type: types.ERROR, payload: err.response.data.error });
    }
};

export const setImages = (payload) => async(dispatch) => {
    try{
        dispatch({ type:types.SET_ADV_IMG,payload:payload});
    }catch(err){
        console.log(err);
    }
}

