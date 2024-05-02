import { RESET_SELL } from "../sell/sell.type";
import { loginAPI, signAPI, adminLoginAPI } from "./auth.api";
import * as types from "./auth.type";

export const Signin = (payload) => async (dispatch) => {
  try {
    await signAPI(payload);
    dispatch({ type: types.SIGNUP });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.ERROR, payload: err.response.data.message });
  }
};

export const Log = (payload) => async (dispatch) => {
  try {
    const res = await loginAPI(payload);
    // console.log(res);
    dispatch({ type: types.LOGIN, payload: res });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.ERROR, payload: err.response.data.error });
  }
};

export const AdminLog = (payload) => async (dispatch) => {
  try {
    const res = await adminLoginAPI(payload);
    // console.log(res);
    dispatch({ type: types.ADMIN_LOGIN, payload: res });
  } catch (err) {
    console.log(err);
    dispatch({ type: types.ERROR, payload: err.response.data.error });
  }
};

export const setSignFalse = () => ({
  type: types.SET_SIGN_FALSE,
});

export const setErrorFalse = () => ({
  type: types.SET_SIGN_FALSE,
});

export const authLogout = () => (dispatch) => {
  dispatch({ type: types.RESET_AUTH });
  dispatch({type:RESET_SELL})
};
