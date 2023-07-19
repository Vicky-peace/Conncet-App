// import React, {useEffect, useState} from 'react'
// import { Followers } from '../../Data/FollowersData'
// import { useSelector, useDispatch } from 'react-redux';
// import {getFollowers, followUser, unfollowuser } from '../../redux/apiCall';
// import './followersCard.css'

// const FollowersCard = () => {
//   const [openUpdate, setOpenUpdate] = useState(false);
//   const dispatch = useDispatch()
//   const currentuserid = useSelector((state) => state.user?.user?.data?.id);
//   const userid = useSelector((state) => state?.user?.currentUser?.user?.id);
 
//   const user = useSelector((state) => state?.user?.currentUser?.user);
//   const following = useSelector((state) => state?.follow?.follow);
//   console.log(following, currentuserid,userid)

// useEffect(() =>{
//   getFollowers(dispatch, userid)
// }, [])

// // const handleFollow = () => {
// //   if(currentuserid = following){
// //     console.log('unfollowed');
// //     unfollowuser(dispatch, { followeruserId: currentuserid, followeduserId: userid })
// //   } else{
// //     console.log('Started following')
// //     followUser(dispatch,{followeruserId: currentuserid, followeduserId: userid})
// //   }
// // }


//   return (
//     <div className='FollowersCard'>
//        <h3>Who is following you </h3>

//        {Followers?.map((follow,id)=>{
//           return(
//             <div key={id} className="follower">
//               <div>
//                 <img src={follow.img} alt="pic" className='followerImage' />
//                 <div className="name">
//                   <span>{follow.name}</span>
//                   <span>@{follow?.username}</span>
//                 </div>
//               </div>

//               <button className='button fc-button'>
//                 Follow
//               </button> 
//              {/* <button onClick={handleFollow}>
//               {currentuserid == following ? "Following" : "Follow"}
//             </button> */}
//             </div>
//           )
//        })}
//     </div>
//   )
// }

// export default FollowersCard


import React from 'react'
import { Followers } from '../../Data/FollowersData'
import './followersCard.css'
const FollowersCard = () => {
  return (
    <div className='FollowersCard'>
       <h3>Who is following you </h3>

       {Followers.map((follower,id)=>{
          return(
            <div key={id} className="follower">
              <div>
                <img src={follower.img} alt="" className='followerImage' />
                <div className="name">
                  <span>{follower.name}</span>
                  <span>@{follower.username}</span>
                </div>
              </div>

              <button className='button fc-button'>
                Follow
              </button>
            </div>
          )
       })}
    </div>
  )
}

export default FollowersCard
