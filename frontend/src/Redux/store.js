/** @format */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  entrepreneurDetailsReducer,
  entrepreneurListReducer,
} from "./Reducers/EntrepreneurReducer";
import { adminCreateReducer, adminLoginReducer } from "./Reducers/AdminReducer";

const reducer = combineReducers({
  entrepreneurList: entrepreneurListReducer,
  entrepreneurDetails: entrepreneurDetailsReducer,
  adminLogin: adminLoginReducer,
  adminCreate:adminCreateReducer,
});


const adminInfoFromLocalStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const initialState = {
  adminLogin: {
    adminInfo: adminInfoFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
