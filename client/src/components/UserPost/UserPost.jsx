import React, { useState } from "react";
import Comment from "../../images/comment.png";
import Share from "../../images/share.png";
import Heart from "../../images/like.png";
import NotLike from "../../images/notlike.png";
import { likePost } from "../../redux/apiCall";
import { useSelector, useDispatch} from "react-redux";

import "./userpost.css";
const UserPost = ({data}) => {
  const { user } = useSelector((state) => state?.user?.user);
  const  {postsdata} = useSelector((state)=> state?.post?.posts)
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(data.likes);
  const [likes, setLikes] = useState(data.likes);

  const handleLike = () => {
    likePost(dispatch);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <img src={data.image} alt="" />

      <div className="postsReactions">
        <img
          src={liked ? Heart : NotLike}
          style={{ cursor: "pointer" }}
          onClick={handleLike}
          alt=""
        />
        <img src={Comment} alt="" />

        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray" }}>{data.likes} Likes</span>
      <div className="detail">
        <span>
          <b>{data.username}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default UserPost;
