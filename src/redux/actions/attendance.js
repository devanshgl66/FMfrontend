import axios from "axios";
import {
  SEE_ATTENDANCE,
  SEE_ATTENDANCE_ERROR,
  SEE_ATTENDANCE_LOADING,
} from "../ActionType";

export const markAttendance = (details) => async (dispatch) => {
  try {
    let fd = new FormData();
    for (var it in details) fd.append(it, details[it]);
    for (var i = 0; i < details.images.length; i++)
      fd.append(`image${i}`, details.images[i]);
    const { data } = await axios.post("/attendance/addAttendance", fd);
    console.log(data);
    return null;
  } catch (error) {
    const errorStr =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return errorStr;
  }
};
export const seeAttendance = (details) => async (dispatch) => {
  try {
    await dispatch({ type: SEE_ATTENDANCE_LOADING });
    const { data } = await axios.get("/class/addClass", { params: details });
    // console.log(data)
    await dispatch({ type: SEE_ATTENDANCE, payload: data });
    return { ...data, success: true };
  } catch (error) {
    const errorStr =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    await dispatch({ type: SEE_ATTENDANCE_ERROR, paylaod: errorStr });
    return { err: errorStr, success: false };
  }
};
