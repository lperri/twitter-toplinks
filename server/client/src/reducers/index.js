import { combineReducers } from "redux";
import twitterAuth from "./twitterAuth";

export default combineReducers({
  auth: twitterAuth,
});
