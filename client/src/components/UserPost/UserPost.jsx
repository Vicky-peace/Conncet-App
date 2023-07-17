import React, {useState} from "react";
import Comment from "../../images/comment.png";
import Share from "../../images/share.png";
import Heart from "../../images/like.png";
import NotLike from "../../images/notlike.png";
import { getPosts } from "../../redux/apiCall";
import { useSelector } from "react-redux";

import "./userpost.css";
const UserPost = ({ data }) => {
  const { user } = useSelector((state) => state.user.user);

 



    
  return (
       
    <div className="Post">
    <img src={data.image} alt="" />

    <div className="postsReactions">
      <img src={data.liked ? Heart : NotLike} alt="" />
      <img src={Comment} alt="" />
   
      <img src={Share} alt="" />
    </div>

    <span style={{ color: "var(--gray" }}>{data.likes} Likes</span>
    <div className="detail">
      <span>
        <b>{data.name}</b>
      </span>
      <span> {data.desc}</span>
    </div>
  </div>
  );
};

export default UserPost;
