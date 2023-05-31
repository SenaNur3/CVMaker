import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import cv from "./cv";

export default combineReducers({
  auth,
  message,
  cv,
});
