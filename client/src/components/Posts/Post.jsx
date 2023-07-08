import React from 'react'
import { PostsData } from '../../Data/PostsData'
import UserPost from '../UserPost/UserPost'
import './post.css'

const Post = () => {
  return (
    <div className='Posts'>
      {PostsData.map((post, id) => {
        return <UserPost key={id} data={post} id={id} />
      })}
    </div>
  )
}

export default Post
