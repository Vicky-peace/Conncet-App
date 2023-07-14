import { apiDomain } from "../Utility/Utils";
//import the reducers from slice
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  // registerStart,
  // registerSuccess,
  // registerFailure,
} from "./userSlice";
import {
  uploadStart,
  uploadSuccess,
  uploadFail,
  retrievingStart,
  retrievingSuccess,
  retrievingFail,
} from "./postSlice";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


// Login user

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const {data} = await axios.post(`${apiDomain}/auth/login`, user)
    if(data.token){
      dispatch(loginSuccess(data));
      alert("Logged in successfully")
    }
   
  } catch ({response}) {
    dispatch(loginFailure());
    alert(response.data.error);
  }
};
export const logOut = function (dispatch) {
  dispatch(logout());
  alert("logged out successfully");
  toast.info(`logged out successfully`, {
    position: "top-center",
  });
};

// Posts Requests
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch(retrievingStart());
  try {
    const response = await axios.get(`${apiDomain}/timeline/${id}`);
    dispatch(retrievingSuccess(response.data));
    alert("Timeline posts retrieved successfully");
  } catch (error) {
    console.log(error);
    dispatch(retrievingFail());
  }
};
// uploading post
export const uploadPost = (data) => async (dispatch) =>{
  dispatch(uploadStart());
  try{
    const newPost = await fetch(`${apiDomain}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    dispatch(uploadSuccess(newPost.data));
  }catch (error) {
    console.log(error);
    dispatch(uploadFail());
  }

}