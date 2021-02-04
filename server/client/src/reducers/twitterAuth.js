import { FETCH_USER } from "../actions/types";

export default function (state = null, action) {
  // make redux store aware of whether or not the user is logged in
  // 3 possible return values:
  //      null if loading (we don't know yet so don't show anything),
  //      false if logged out,
  //      User model if logged in
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
