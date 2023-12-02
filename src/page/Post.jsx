import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostsClient } from '../service/posts/getPost'
import CircleLoading from '../components/Loader/CircleLoading';
import CreatePost from '../components/post/CreatePost';
import PostCard from '../components/post/PostCard';


export const PostProvider=createContext()

function Post() {
  const {id} =useParams()

  const [loading,setLoading]=useState(false);
  const [posts,setPosts]=useState([]);

  const getPosts=async()=>{
    setLoading(true)
    try {
      const res=await getPostsClient(id)
      setPosts(res.data.post)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  const contextValues={
    posts,setPosts
  }

  useEffect(()=>{
    getPosts()
  },[id])

  if(loading){
    return <CircleLoading/>
  }

  return (
    <>
      <PostProvider.Provider value={contextValues}>
        <CreatePost section_id={id}/>
        {posts.length>0?
          <div className='mt-5'>
           { posts.map((i,k)=>
              <PostCard key={k} post={i}/>
            )}
          </div>
          :
          <></>
        }
      </PostProvider.Provider>
    </>
  )
}

export default Post