import React from 'react'
import AddPostModal from './AddPostModal'

function CreatePost({section_id}) {
    console.log(section_id)
  return (
    <>
        <AddPostModal section_id={section_id}/>
        <div className='flex-row mt-4 justify-center items-center px-28 w-full '>
            <div class="border-dashed border-2 border-blue-400 h-[150px]" style={{display:"flex" ,"flexDirection":"column","justifyContent":"center","alignItems":"center"}}>
              <button data-te-toggle="modal"
                data-te-target="#addpost"
                data-te-ripple-init
                data-te-ripple-color="light">
                <i className="fa-solid fa-folder-plus hover:text-blue-400" style={{fontSize:"30px",cursor:"pointer"}}></i>
              </button>

              <p className='mt-2 font-semibold'>Create New Post</p>
            </div>
      </div>
    </>
  )
}

export default CreatePost