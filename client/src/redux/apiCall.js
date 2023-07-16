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
  uploadPostSuccess
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
    alert('Invalid Credentials Please input correct credentials');
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

export const createPost = async (dispatch,data) =>{
  console.log(data, "post info");
  dispatch(uploadStart());
  try{
    const postVal = await axios.post(`${apiDomain}/post`,data);
    console.log(postVal.data.status);
    if(postVal.data.status == "success"){
      alert("Post uploaded successfully")
      dispatch( uploadSuccess());
    } else{
      alert("Post not uploaded please try again")
    }
    dispatch(uploadPostSuccess(data))
  } catch(error){
    dispatch(uploadFail())
  }
}