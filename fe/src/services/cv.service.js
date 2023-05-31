import axios from "axios";

const API_URL = "http://localhost:3000/cv/";

const getUserCV = (username) => {
  return axios.get(API_URL + username).then((response) => {
    return response.data;
  });
};


export default {
  getUserCV
};
