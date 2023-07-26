import React, { useState , useEffect} from "react";
import Comment from "../../images/comment.png";
import Share from "../../images/share.png";
import Heart from "../../images/like.png";
import NotLike from "../../images/notlike.png";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BsThreeDots } from 'react-icons/bs';
import Comments from "../comments/Comments";
import { getLikePost,createlikepost,deletelikepost } from "../../redux/apiCall";
import {
  getFollowers
} from "../../redux/apiCall";

import "./userpost.css";
const UserPost = ({  post }) => {
  const  user  = useSelector((state) => state?.user?.currentUser?.user);
  const comments = useSelector((state) => state?.comment?.comments);
  // const post = useSelector((state) => state?.post?.posts?.data);
  const token = useSelector((state)=>state?.user.user.accessToken);
  const likedpost = useSelector((state) => state?.likes?.likes)
  const dispatch = useDispatch();
 

  const [likedPost, setLikedPost] = useState();
  const [likedPst, setLikedPst] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  
 

  const liked = false;

 


  const handleDelete = () => {
   console.log("deleted");
   deletePost(post.id,dispatch,token)
  }

  return (
    <div className="Post">
      <img src={post.image} alt="" />
      <div className="postsReactions">
        {/* Show the BsThreeDots icon */}
        <div className="deleteIcon">
          <BsThreeDots size={32} color="black" /> 
          
        </div>

       
      </div>

      <div className="postsReactions">
  
        <img
          src={liked ? Heart : NotLike}
          style={{ cursor: "pointer" }}
          alt=""
        />
    
        <div className="item" onClick={() =>setCommentOpen(!commentOpen) }>
        <img src={Comment} alt="" />
        {comments?.length} 
        </div>
      

        <img src={Share} alt="" />

       
        
      </div>

      <span style={{ color: "var(--gray" }}>{post.likes} Likes</span>
      <div className="detail">
        <span>
          <Link to={`/profile`}style={{ textDecoration: "none" }}>
            <b>{post.username}</b>
          </Link>
        </span>
        <span> {post.desc}</span>
       
      </div>
      {commentOpen && <Comments postId={post?.id} />}
    
     
      
    </div>
  );
};

export default UserPost;
