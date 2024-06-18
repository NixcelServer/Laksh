import axios from 'axios'
import { baseURL } from "../../utils/variables";

export const signAPI =async (payload)=>{
    const res = await axios.post(`${baseURL}api/register`, payload);
    return res.data
}

export const loginAPI =async (payload)=>{
    const res = await axios.post(`${baseURL}api/logsin`, payload);
    console.log("Response:", res);
        return res.data
}

export const adminLoginAPI =async (payload)=>{
    const res = await axios.post(`${baseURL}api/login`, payload);
    console.log("Response:", res);
        return res.data
}