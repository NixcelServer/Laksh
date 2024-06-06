import axios from "axios";
import { baseURL } from "../../utils/variables";

export const getCategoriesAPI = async() => {
    const res = await axios.get("http://127.0.0.1:8000/api/categories");
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const addCategoryAPI = async(payload) => {
    const res = await axios.post('http://127.0.0.1:8000/api/categories', payload, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const updateCategoryAPI = async(payload) => {
  const res = await axios.post('http://127.0.0.1:8000/api/categories/update', payload, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const getSubCategoriesAPI = async() => {
  const res = await axios.get("http://127.0.0.1:8000/api/sub-categories");
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}

export const addSubCategoryAPI = async(payload) => {
  const res = await axios.post("http://127.0.0.1:8000/api/sub-categories", payload);
  
  //const categories = res.data;
  //   dispatch(getCategories(categories));
    return res.data;
}


export const addKeywordAPI = async(payload) => {
    const res = await axios.post("http://127.0.0.1:8000/api/keywords", payload);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getKeywordsAPI = async() => {
    const res = await axios.get("http://127.0.0.1:8000/api/keywords");
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const getUOMAPI = async() => {
    const res = await axios.get("http://127.0.0.1:8000/api/unit-of-measurements");
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}

export const addUOMAPI = async(payload) => {
    const res = await axios.post("http://127.0.0.1:8000/api/unit-of-measurements", payload);
    
    //const categories = res.data;
    //   dispatch(getCategories(categories));
      return res.data;
}



// export const getPlywoodAPI = async (color="brown",Page=1,limit=10,order="asc",price=0) => {
//        let res = await axios.get(`${baseURL}plywood?page=${Page}&limit=${limit}&Color=${color}&price=${price}&order=${order}`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//        })
//     //    console.log(res)
//        return res?.data
// }


// export  const updateProductAPI = async(prod)=>{
//     // console.log(prod)
//     let res = await axios.patch(`${baseURL}plywood/update/${prod._id}`,prod,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })
//     return res?.data

// }

// export const deleteProductAPI =async(id)=>{
//     let res = await axios.delete(`${baseURL}plywood/delete/${id}`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })
//     return res?.data

// }

// export const postProductAPI = async(prod)=>{
//     let res = await axios.post(`${baseURL}plywood/add/`,prod,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })
//     return res?.data
// }


// get admin data 

// export const getAdminsDataAPI=async()=>{
//      let res = await axios.get(`${baseURL}admin/admindata`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': (sessionStorage.getItem('token'))
//         }
//      })
//      return res?.data?.users
// }

// export const getAdminDataAPI = async(id)=>{
//     let res = await axios.get(`${baseURL}admin/${id}`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })

//     return res?.data?.users
// }

// export const updateAdminDataAPI = async(admin)=>{
// //    console.log(admin)
//     let res = await axios.patch(`${baseURL}admin/updateAdmin/${admin._id}`,admin,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })

//     return res?.data

// }
// export const deleteAdminDataAPI = async(id)=>{
// //    console.log(admin)
//     let res = await axios.delete(`${baseURL}admin/deleteAdmin/${id}`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })

//     return res?.data

// }

// export const postAdminDataAPI=async(adminObj)=>{

//     let res = await axios.post(`${baseURL}users/register`,adminObj,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': sessionStorage.getItem('token')
//         }
//     })
//     return res?.data

// }

// export const getUsersDataAPI = async()=>{
//     // const token = 
//     // console.log(token)
//     let res = await axios.get(`${baseURL}admin/usersdata`,{
//         headers: {
//             'Content-Type': 'application/json',
//             'token': (sessionStorage.getItem('token'))
//         }
//     })

//     return res?.data?.users
// }

















