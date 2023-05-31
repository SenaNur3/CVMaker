import { GET_CV_SUCCESS } from "../actions/types";

const cv = [];

const initialState = cv;

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log("payload: ", type, payload, state);
  switch (type) {
    case GET_CV_SUCCESS:
      return {
        ...state,
        userCV: payload.userCV[0],
      };
    default:
      return state;
  }
}
