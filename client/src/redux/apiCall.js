import { apiDomain } from "../Utility/Utils";
//import the reducers from slice
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  registerStart,
  registerSuccess,
  registerFailure,
} from "./authSlice";
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

// userRegistration
export const registerUser = async (dispatch, user) => {
  try {
    console.log(user);
    dispatch(registerStart());
    const response = await fetch(`${apiDomain}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    console.log(response.ok, result);
    if (result.status === "failure" || !response.ok) {
      if (result.message === "User already exists") {
        alert("User already exists Please Register using other username");

        dispatch(registerFailure(result));
      }
    } else {
      dispatch(registerSuccess(result));
      alert("Registered successfully being redirected to login page");
      toast.success(`successfully registered`, {
        position: "top-center",
      });
    }
  } catch (err) {
    dispatch(registerFailure());
    console.log(err);
  }
};

// Login user

export const login = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const response = await fetch(`${apiDomain}/auth/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    console.log(response.ok, result);
    if (result.status === "failure" || !response.ok) {
      console.log();
      alert(`${result.message} Use correct credentials`);
      dispatch(loginFailure(result));
    } else {
      dispatch(loginSuccess(result));
      alert("logged in successfully being redirected to main page");
      toast.success(`successfully logged in`, {
        position: "top-center",
      });
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const loggedout = function (dispatch) {
  dispatch(logout());
  alert("logged out successfully");
  toast.info(`logged out successfully`, {
    position: "top-center",
  });
};

// Psots Requests
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch(retrievingStart());
  try {
    const { data } = await fetch({ apiDomain }.getTimelinePosts(id), {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    dispatch(retrievingSuccess(data));
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