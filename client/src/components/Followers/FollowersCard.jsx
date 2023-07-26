import React, { useEffect, useState } from "react";
import { Followers } from "../../Data/FollowersData";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import {
  getFollowers,
  followUser,
  unfollowuser,
  getSuggested,
} from "../../redux/apiCall";
import "./followersCard.css";

const FollowersCard = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const dispatch = useDispatch();
  const currentuserid = useSelector((state) => state.user?.user?.id);
  const userid = useSelector((state) => state?.user?.currentUser?.user?.id);

  const user = useSelector((state) => state?.user?.currentUser?.user);
  const suggested = useSelector((state) => state?.user?.suggestedUser);
  // console.log(suggested, currentuserid, userid);

  useEffect(() => {
    getSuggested(dispatch, userid);
  }, []);

  const handleFollow = () => {
    if ((currentuserid = following)) {
      console.log("unfollowed");
      unfollowuser(dispatch, {
        followeruserId: currentuserid,
        followeduserId: userid,
      });
    } else {
      console.log("Started following");
      followUser(dispatch, {
        followeruserId: currentuserid,
        followeduserId: userid,
      });
    }
  };

  return (
    <div className="FollowersCard">
      <h3>Who is following you </h3>

      {suggested?.map((user) => {
        return (
          <div key={user.id} className="follower">
            <div>
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="pic"
                  className="followerImage"
                />
              ) : (
                <FaUserCircle />
              )}
              <div className="name">
                <span>
                  {user.firstname} {user.lastname}
                </span>
                <span>@{user.username}</span>
              </div>
            </div>

            {/* <button className='button fc-button'>
                Follow
              </button>  */}
            <button onClick={handleFollow} className="button fc-button">
              {currentuserid == suggested ? "Following" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;

// import React from 'react'
// import { Followers } from '../../Data/FollowersData'
// import './followersCard.css'
// const FollowersCard = () => {
//   return (
//     <div className='FollowersCard'>
//        <h3>Who is following you </h3>

//        {Followers.map((follower,id)=>{
//           return(
//             <div key={id} className="follower">
//               <div>
//                 <img src={follower.img} alt="" className='followerImage' />
//                 <div className="name">
//                   <span>{follower.name}</span>
//                   <span>@{follower.username}</span>
//                 </div>
//               </div>

//               <button className='button fc-button'>
//                 Follow
//               </button>
//             </div>
//           )
//        })}
//     </div>
//   )
// }

// export default FollowersCard
