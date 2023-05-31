// Karşılama kartının beslendiği API
import moment from "moment";
import "moment-timezone";


import {  isBetween, isTodayBirthday } from "./time";


export function getWelcomeMessage() {

  const birthDate = "12.12.1995";
  const name = "Mehmet Dilmen";

  const result = {
    name,
    message: "",
    type: "none",
  };
  if (birthDate !== null) {
    const isBirthday = isTodayBirthday(birthDate);
    if (isBirthday) {
      result.type = "birthday";
      return result;
    }
  }

  const isMorning = isBetween("05:00", "10:59");
  if (isMorning) {
    result.type = "morning";
    return result;
  }

  const isDaytime = isBetween("11:00", "16:59");
  if (isDaytime) {
    result.type = "day";
    return result;
  }

  const isEvening = isBetween("17:00", "23:59");
  if (isEvening) {
    result.type = "evening";
    return result;
  }

  const isNight = isBetween("00:00", "04:59");
  if (isNight) {
    result.type = "night";
    return result;
  }
}
