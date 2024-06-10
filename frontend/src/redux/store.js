import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import authReducer from './auth/auth.reducer'
import sellReducer from "./sell/sell.reducer"

import thunk from "redux-thunk";
import { reducer as adminReducer } from "./Admin/admin.reducer";
import { bulbReducer } from "./BulbAdmin/bulbadmin.reducer";
import { machineReducer } from "./MachineAdmin/machineadmin.reducer";
import {productReducer}from "./Product/product.reducer";
import { orderReducer } from "./Order/order.reducer";
import { userReducer } from "./User/user.reducer";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch {
    // ignore write errors
  }
};

const persistedState = loadState();

const root_reducer = combineReducers({
	authReducer,
	sellReducer,
  masterData: adminReducer,
  bulb: bulbReducer,
  machine: machineReducer,
  productReducer,
  orderReducer,
  userReducer
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  root_reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});
// export const store = legacy_createStore(
//   root_reducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
