import { apiDomain } from "../Utility/Utils";
//import the reducers from slice
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  getUserSuccess,
} from "./userSlice";
import {
  uploadStart,
  uploadSuccess,
  uploadFail,
  uploadPostSuccess,
  retrievingStart,
  retrievingSuccess,
  retrievingFail,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure
} from "./postSlice";

import {
  likeStart,
  likeSuccess,
  likeFailure,
  createlikesSuccess,
  dislikeSuccess,
} from "./likeSlice";

import {
  followStart,
  followSuccess,
  followFailure,
  createFollowSuccess,
  unfollowSuccess
} from './followSlice';

import {
  commentStart,
  commentSuccess,
  commentFailure,
  createCommentSuccess,
} from "./commentSlice";


import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Login user

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await axios.post(`${apiDomain}/auth/login`, user);
    if (data.token) {
      dispatch(loginSuccess(data));
      alert("Logged in successfully");
    }
  } catch ({ response }) {
    dispatch(loginFailure());
    alert("Invalid Credentials Please input correct credentials");
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
// export const getTimelinePosts = (id) => async (dispatch) => {
//   dispatch(retrievingStart());
//   try {
//     const response = await axios.get(`${apiDomain}/timeline/id`);
//     dispatch(retrievingSuccess(response.data));
//     alert("Timeline posts retrieved successfully");
//   } catch (error) {
//     console.log(error);
//     dispatch(retrievingFail());
//   }
// };

export const createPost = async (dispatch, data) => {
  console.log(data, "post info");
  dispatch(uploadStart());
  try {
    const postVal = await axios.post(`${apiDomain}/post`, data);
    console.log(postVal.data.status);
    if (postVal.data.status == "success") {
      alert("Post uploaded successfully");
    } else {
      alert("Post not uploaded please try again");
    }
    dispatch(uploadPostSuccess(data));
  } catch (error) {
    dispatch(uploadFail());
  }
};

// Get posts
export const getPosts = async (dispatch) => {
  dispatch(retrievingStart());
  try {
    const { data } = await axios.get(`${apiDomain}/post`);
    console.log(data);
    dispatch(retrievingSuccess(data));
  } catch (error) {
    dispatch(retrievingFail(error));
  }
};

// Delete post
export const deletePost = async (id,dispatch, token) =>{
  console.log(id,token);
  dispatch(deletePostStart());
  try{
    await axios.post(`${apiDomain}/post/${id}`,token);
    alert("Post deleted successfully")
  } catch(error){
    dispatch(deletePostFailure(error))
    
  }
}
// likepost
// export const likePost=(id, userId)=>axios.put(`${apiDomain}/like${id}`, {userId: userId})

export const likePost = async (dispatch, data) => {
  dispatch(likeStart());
  try {
    const likeVal = await axios.put(`${apiDomain}/like${id}`, data);
    console.log(likeVal);
    dispatch(likeSuccess());
  } catch (error) {
    dispatch(likeFailure());
  }
};

// Get user
export const getUser = async (dispatch, id) => {
  try {
    const { data } = await axios.get(`${apiDomain}/user/${id}`);
    console.log(data);
    dispatch(getUserSuccess(data));
  } catch (error) {
    console.log(error);
  }
};

// update user

export const updateUserProfile = async (dispatch,user,dataVal) => {
  const id = user.id;
  console.log(id, dataVal);
  dispatch(updateUserStart());
  try {
    const {data} = await axios.put(`${apiDomain}/user/${id}`,dataVal);
    console.log(data);
    dispatch(updateUserSuccess(dataVal));
    alert('User updated successfully')
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

export const getFollowers = async (dispatch,id) =>{
  dispatch(followStart());
  try{
    const {data} = await axios.get(`${apiDomain}/follow/${id}`);
    console.log(data)
    dispatch(followSuccess(data));
  } catch(error){
  dispatch(followFailure());
  }
}

// follow user
export const followUser = async ( dispatch,data) =>{
  console.log(data)
  try{
    const follow = await axios.post(`${apiDomain}/follow`,data);
    console.log(follow.data.status);
    if(follow.data.status == "followed"){
      alert('followed');
    }else{
      alert('Something went wrong')
      dispatch(createFollowSuccess(1));
    }
  } catch(error){
    dispatch(followFailure())
  }
  
}

export const unfollowuser = async (dispatch,data) => {
  console.log(data);
  try{
    const result = await axios.post(`${apiDomain}/unfollow`, data);
    console.log(result.data.status);
    if(result.data.status == "unfollowed"){
      alert('unfollowed')
    } else{
      alert('Something went wrong');
    }
    dispatch(unfollowSuccess());
  } catch(error){
    dispatch(followFailure());
  }
};


// Get comments
export const getComments = async (dispatch,postId) => {
  dispatch(commentStart());
  console.log(postId);
  try{
    const {data} = await axios.get(`${apiDomain}/comment/${postId}`);
    console.log(data);
    dispatch(commentSuccess(data));

  } catch(error){
   dispatch(commentFailure());
  }
}

// Create comments
export const createComment = async (dispatch,data) =>{
  console.log(data, "comment info");
  dispatch(commentStart());
  try{
      const dataVal = await axios.post(`${apiDomain}/comment`,data);
      console.log(dataVal.data.status);
      if (dataVal.data.status == "success") {
        toast.success(`Comment uploaded`, {
          position: "top-center",
        });
      } else {
        toast.warning(`comment not uploaded`, {
          position: "top-center",
        });
      }
      dispatch(createCommentSuccess(data));
  }catch(error){
    dispatch(commentFailure());
  }
}