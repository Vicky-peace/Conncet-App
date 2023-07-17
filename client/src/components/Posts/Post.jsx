import React, {useEffect} from 'react'
import { PostsData } from '../../Data/PostsData'
import UserPost from '../UserPost/UserPost'
import {getPosts,getTimelinePosts} from '../../redux/apiCall';
import {useSelector, useDispatch} from 'react-redux';
import './post.css'

const Post = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.post?.posts);
  const {data} = useSelector((state)=> state.post?.posts)
  useEffect(() =>{
    getPosts(dispatch);
  }, [])
  return (
    <div className='Posts'>
      {data.map((post) => {
        return <UserPost key={post.id} data={post}/>
      })}
    </div>
  )
}

export default Post
