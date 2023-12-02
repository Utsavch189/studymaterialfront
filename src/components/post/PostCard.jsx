import React, { useContext } from 'react'
import PostChips from './PostChips'
import NotesModal from './NotesModal'
import { useDispatch } from 'react-redux'
import { setPostNotesAction } from '../../redux/actions/postNotesAction';
import { deletePostsClient } from '../../service/posts/deletePost';
import { PostProvider } from '../../page/Post';
import EditPostModal from './EditPostModal';
import { setUpdatePostAction } from '../../redux/actions/post';

function PostCard({post}) {

  const dispatch=useDispatch();

  const context=useContext(PostProvider);

  const openUpdateModal=()=>{
    window.document.getElementById("editPost").classList.add("flex");
    window.document.getElementById("editPost").classList.remove("hidden");
  }

  const closeUpdateModal=()=>{
    window.document.getElementById("editPost").classList.add("hidden");
    window.document.getElementById("editPost").classList.remove("flex");
  }

  const passDataToUpdateModal=(data)=>{
    dispatch(setUpdatePostAction({post_id:data?.post_id,title:data?.title,about:data?.about,visibility:data?.visibility,notes:data?.notes}))
    openUpdateModal()
  }

  const handelDelete=async(post_id)=>{
    try {
      const res=await deletePostsClient({post_id:post_id})
      if(res.status===202){
        const newPosts=[...context.posts]
        const posts=newPosts.filter((p)=>p.post_id!==post_id)
        context.setPosts(posts)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <NotesModal/>
      <EditPostModal close={closeUpdateModal}/>
      <div className="block p-10 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
  <div className='flex items-center justify-between'>
  <h5 className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-neutral-600 dark:text-neutral-50">
    {post?.title} [{post?.visibility==='PRIVATE'?<i className="fa-solid fa-lock"></i>:post?.visibility==='PUBLIC'?<i className="fa-solid fa-lock-open"></i>:<></>}]
  </h5>
  <i className="fa-solid fa-trash" style={{color:"red",cursor:"pointer"}} onClick={()=>handelDelete(post?.post_id)}></i>
  </div>
  <div className="p-6">
    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
      {post?.about}
    </h5>
    {post?.post_meta[0].file_name?<div className="mb-3 flex gap-1 flex-wrap">
        {post.post_meta.map((i,k)=>
            <PostChips post_id={post?.post_id} meta={i} key={k}/>
        )}
    </div>:<></>}
    <button
      type="button"
      href="#"
      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
      data-te-ripple-init=""
      data-te-ripple-color="light"
      data-te-toggle="modal"
      data-te-target="#notesmodal"
      onClick={()=>dispatch(setPostNotesAction({
        post_name:post?.title,
        post_notes:post?.notes
      }))}
    >
      Notes
    </button>
    <i className=" ml-3 fa-solid fa-pen-to-square text-yellow-400" style={{cursor:"pointer"}} onClick={()=>{
            passDataToUpdateModal(post)
              }}></i>
  </div>
</div>


    </>
  )
}

export default PostCard