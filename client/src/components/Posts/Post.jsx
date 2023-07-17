import React, {useEffect} from 'react'
import { PostsData } from '../../Data/PostsData'
import UserPost from '../UserPost/UserPost'
import {getPosts,getTimelinePosts} from '../../redux/apiCall';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from "react-router-dom";
import './post.css'

const Post = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const token = useSelector((state) => state.post?.posts);
  const postdata = useSelector((state)=> state.post?.posts)

  useEffect(() =>{
    getPosts(dispatch, token);
  }, [])
  return (
    <div className='Posts'>
      {PostsData.map((post, id) => {
        return <UserPost key={id} data={post} id={id} />
      })}
    </div>
  )
}

export default Post
