import React from 'react'
import ProfileImage from '../../images/ProfileImage.jpeg';
import Cover from '../../images/Coverimage.jpg';
import './profileCard.css'
const Profile = () => {

  const ProfilePage = true;
  return (
    <div className='Profilecard'>
      <div className="profileimages">
        <img src={ProfileImage} alt="" />
        <img src={Cover} alt="" />
      </div>

      <div className="profileName">
        <span>Silver hat👨‍💻 </span>
        <span>@peacekalya</span>
        <span>SERN stack junior dev</span>
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
              <span>3</span>
              <span>Posts</span>
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
