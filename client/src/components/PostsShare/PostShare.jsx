import React, {useState, useRef} from 'react'
import ProfileImage from '../../images/ProfileImage.jpeg';
import {BsCardImage,BsPlayBtn} from 'react-icons/bs';
import {HiLocationMarker} from 'react-icons/hi';
import {BiCalendar} from 'react-icons/bi';
import {RxCross2} from 'react-icons/rx';
import './postshare.css'
const PostShare = () => {
    const [image, setImage] = useState(null)
    const imageRef = useRef()

const onImageChange= (e) =>{
if(e.target.files && e.target.files[0]){
    let img = e.target.files[0];
    setImage({
        image: URL.createObjectURL(img)
    });
}
};





  return (
    <div className='PostShare'>
      <img src={ProfileImage} alt="" />
      <div>
        <input type="text"
        placeholder="What's Happening" />
            <div className="postOptions">
        <div className="option "style={{ color: "var(--photo)" }}  onClick={()=>imageRef.current.click()}>
        <BsCardImage/>
        Photo
        </div>
        <div className="option" style={{ color: "var(--video)" }}>
        <BsPlayBtn/>
        Video
        </div>
        <div className="option" style={{ color: "var(--location)" }}>
        <HiLocationMarker/>
        Location
        </div>
        <div className="option" style={{ color: "var(--shedule)" }}>
        <BiCalendar/>
        Schedule
        </div>
        <button className='button ps-button'>
            Share
        </button>
        <div style={{display: "none"}}>
            <input type="file" name="myImage" ref={imageRef} onChange={onImageChange} />
        </div>
      </div>

      {image && (

<div className="previewImage">
  <RxCross2 onClick={()=>setImage(null)}/>
  <img src={image.image} alt="" />
</div>

)}
      </div>
    </div>
  )
}

export default PostShare
