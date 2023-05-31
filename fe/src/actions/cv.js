import {
  GET_CV_SUCCESS,
  GET_CV_FAIL,
} from "./types";

import CVService from "../services/cv.service";

export const getUserCVFunc = (username) => (dispatch) => {
  return CVService.getUserCV(username).then(
    (data) => {
      console.log('getUserCVFunc: ', data)
      dispatch({
        type: GET_CV_SUCCESS,
        payload: {userCV: data},
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_CV_FAIL,
      });
    
      return Promise.reject();
    }
  );
};
