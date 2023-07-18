import React, {useEffect} from 'react'
import ProfileImage from '../../images/ProfileImage.jpeg';
import Cover from '../../images/Coverimage.jpg';
import {useSelector, useDispatch} from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getUser } from '../../redux/apiCall';
import './profileCard.css'

const Profile = () => {
  // const id = useLocation().pathname.split("/")[2];
  const dispatch = useDispatch();
  const currentuserid = useSelector((state) => state?.user?.user?.data?.id);
const userId = useSelector((state)=>state?.user?.user?.id);
const user = useSelector((state)=>state?.user?.currentUser?.user)
// console.log(user, userId)

  useEffect(()=>{
    getUser(dispatch, userId);
  }, [])
  const ProfilePage = true;
  return (
    <div className='Profilecard'>
      <div className="profileimages">
        <img src={user?.profilepicture} alt="profile" />
        <img src={user?.coverPicture} alt="coverimageclear
        " />
      </div>

      <div className="profileName">
        <span> {user?.firstname} {user?.lastname}</span>
        <span>@{user?.username}</span>
        <span>{user?.about}</span>
      </div>


      <div className="followstatus">
        <hr />
        <div>
          <div className="follow">
          <span>1,388</span>
            <span>Following</span>
            </div>
             {/* <div className="vertical"></div> */}
             <div className="follow">
            <span>1,471</span>
            <span>Followers</span>
            </div>
             
          {ProfilePage && (
            <>
             <div className="vl"></div>
             <div className="follow">
              {/* <span>3</span>
              <span>Posts</span> */}
             </div>
            </>
          )}
        </div>
        <hr />
      </div>
       {ProfilePage ? '' :
         <span>
         My Profile
        </span>}


     
    </div>
  )
}

export default Profile
