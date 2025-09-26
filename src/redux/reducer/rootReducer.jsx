import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  //Đặt lại tên reducer
  counter: counterReducer,
  user: userReducer
});

export default rootReducer;
