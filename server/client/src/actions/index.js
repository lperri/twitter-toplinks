import axios from "axios";
import { FETCH_USER } from "./types";

/*
fetchUser is an action creater.
The purpose of redux-thunk is to inspect whatever value we return from this action creator.
If redux-thunk sees we return a function as opposed to a normal action, which is expected by redux,
it will automatically call that function and pass in dispatch as an argument.
*/

export const fetchUser = () => async (dispatch) => {
  // we do not want to dispatch an action until this
  // AJAX request is completed
  const res = await axios.get("/api/login/status");
  dispatch({ type: FETCH_USER, payload: res.data });
};
