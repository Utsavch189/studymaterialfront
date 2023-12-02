import React, { useContext } from 'react'
import { deletePostMetaClient } from '../../service/posts/deletePostMeta'
import { PostProvider } from '../../page/Post'

function PostChips({meta,post_id}) {

    const context=useContext(PostProvider);

    const handelDelete=async(post_file_meta_id,post_id)=>{
        try {
          const res=await deletePostMetaClient({post_meta_id:post_file_meta_id,post_id:post_id})
          const newpost=[...context.posts]
          newpost.find((p)=>p.post_id===res.data.post.post_id).post_meta=res.data.post.post_meta
          context.setPosts(newpost)
        } catch (error) {
          console.log(error)
        }
    }
    console.log(context.posts)

  return (
   <>
    
    <div
  data-te-chip-init=""
  data-te-ripple-init=""
  className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] border border-[#3b71ca] bg-[#eceff1] bg-[transparent] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#3b71ca] hover:!shadow-none dark:text-neutral-200"
  data-te-ripple-color="dark"
>
<a href={meta?.file_url} target='_blank'>
  {meta?.file_name}
  </a>
  <span
    data-te-chip-close=""
    className="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="h-3 w-3"
      onClick={()=>handelDelete(meta?.post_file_meta_id,post_id)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </span>
</div>
   </>

  )
}

export default PostChips