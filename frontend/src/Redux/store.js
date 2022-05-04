/** @format */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  entrepreneurCreateReducer,
  entrepreneurDetailsReducer,
  entrepreneurListReducer,
  entrepreneurUpdateReducer,
} from "./Reducers/EntrepreneurReducer";
import {
  adminCreateReducer,
  adminLoginReducer,
  adminsListReducer,
} from "./Reducers/AdminReducer";

const reducer = combineReducers({
  entrepreneurList: entrepreneurListReducer,
  entrepreneurDetails: entrepreneurDetailsReducer,
  adminLogin: adminLoginReducer,
  adminCreate: adminCreateReducer,
  entrepreneurCreate: entrepreneurCreateReducer,
  entrepreneurUpdate: entrepreneurUpdateReducer,
  adminsList: adminsListReducer,
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
