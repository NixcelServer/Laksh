

import { legacy_createStore, combineReducers, compose, applyMiddleware } from "redux";
import authReducer from './auth/auth.reducer'
import sellReducer from "./sell/sell.reducer"




import thunk from "redux-thunk";
import { reducer as adminReducer } from "./Admin/admin.reducer";
import { bulbReducer } from "./BulbAdmin/bulbadmin.reducer";
import { machineReducer } from "./MachineAdmin/machineadmin.reducer";
import {productReducer}from "./Product/product.reducer";
import { orderReducer } from "./Order/order.reducer";
import { orderReducer } from "./Order/order.reducer";

const root_reducer = combineReducers({
	authReducer,
	sellReducer,
  masterData: adminReducer,
  bulb: bulbReducer,
  machine: machineReducer,
  productReducer,
  orderReducer
  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  root_reducer,
  composeEnhancers(applyMiddleware(thunk))
);
