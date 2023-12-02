import React, { useContext, useRef, useState } from 'react'
import PostFileChips from './PostFileChips';
import { FileToBase64 } from '../../utils/fileTob64';
import LoadingBtn from '../loadingBtn';
import { useDispatch } from 'react-redux';
import { setErrorMessageAction } from '../../redux/actions/messageAction';
import { addPostsClient } from '../../service/posts/addPost';
import { PostProvider } from '../../page/Post';

function AddPostModal({section_id}) {

    const[postdata,setPostdata]=useState({
        title:'',
        about:'',
        visibility:'PUBLIC',
        notes:''
    })

    const context=useContext(PostProvider);

    const[postfile,setPostfile]=useState([])

    const [loading,setLoading]=useState(false)

    const closeBtn=useRef();
    const dispatch=useDispatch();

    const addPostFile=(e)=>{
        const file=e.target.files[0];
        if(file.size<=4e+6){
          const reader= FileToBase64(file);
          reader.onload=()=>{
              const isfile=postfile.filter((f)=>f.file_name===file.file_name);
              if(isfile.length===0){
                  const files={file_name:file.name,file_b64:reader.result,file_type:'pdf'}
                  setPostfile(p=>[files,...p])
              }
              else{
                  dispatch(setErrorMessageAction({
                      message:"file already exists!"
                  }))
              }

          }
      }
      else{
        dispatch(setErrorMessageAction({
          message:"files above 4mb is not allowed!"
      }))
      }
    }

    const removeFile=(file_name)=>{
        const newFiles=postfile.filter((file)=>file.file_name!==file_name);
        setPostfile(newFiles)
    }

    const create=async()=>{
        setLoading(true)
        try {
            const payload={...{section_id:section_id},...postdata,...{files:postfile}}
            const res=await addPostsClient(payload);
            context.setPosts(p=>[...p,res.data.post])
            setPostdata({
              title:'',
              about:'',
              visibility:'PUBLIC',
              notes:''
            })
            setPostfile([])
            closeBtn.current.click();
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <>
{/* Modal */}
  <div
    data-te-modal-init=""
    className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
    id="addpost"
    data-te-backdrop="static"
    data-te-keyboard="false"
    tabIndex={-1}
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div
      data-te-modal-dialog-ref=""
      className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
    >
      <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          {/*Modal title*/}
          <h5
            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
            id="staticBackdropLabel"
          >
            Create Your Post
          </h5>
          {/*Close button*/}
          <button
            type="button"
            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
            data-te-modal-dismiss=""
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/*Modal body*/}
        <div data-te-modal-body-ref="" className="relative p-4">
            <div>
                <label
                  htmlFor="section_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Post Tilte
                </label>
                <input
                  type="name"
                  name="section_name"
                  id="section_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Html"
                  required=""
                  onChange={(e)=>{
                    setPostdata({
                        ...postdata,
                        title:e.target.value
                    })
                  }}
                />
            </div>
            <div className='mt-1'>
                <label
                  htmlFor="visibility"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Visibility
                </label>
           
         
                {/*Default checkbox*/}
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    defaultValue=""
                    id="checkboxDefault"
                    onChange={(e)=>{
                      setPostdata({
                        ...postdata,
                        visibility:'PUBLIC'
                      })
                    }}
                    checked={postdata?.visibility==='PUBLIC'?true:false}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxDefault"
                  >
                    Public
                  </label>
                </div>
                {/*Default checked checkbox*/}
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    defaultValue=""
                    id="checkboxChecked"
                    onChange={(e)=>{
                      setPostdata({
                        ...postdata,
                        visibility:'PRIVATE'
                      })
                    }}
                    checked={postdata?.visibility==='PRIVATE'?true:false}
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="checkboxChecked"
                  >
                    Private
                  </label>
                </div>
                

            </div>

            <div className='mt-3'>
                <label
                  htmlFor="visibility"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Post About
                </label>
            
                <div className="relative mb-3" data-te-input-wrapper-init="">
                <textarea
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  placeholder="Your message"
                  defaultValue={""}
                  onChange={(e)=>{
                    setPostdata({
                        ...postdata,
                        about:e.target.value
                    })
                }}
                />
                
                </div>

            </div>


            <div className='mt-3'>
                <label
                  htmlFor="visibility"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Notes
                </label>
            
                <div className="relative mb-3" data-te-input-wrapper-init="">
                <textarea
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlTextarea1"
                  rows={3}
                  placeholder="Your message"
                  defaultValue={""}
                  onChange={(e)=>{
                    setPostdata({
                        ...postdata,
                        notes:e.target.value
                    })
                }}
                />
                
                </div>

            </div>

            {postfile.length>0?<div className="mb-3 flex gap-1 flex-wrap">

                {
                    postfile.map((i,k)=>
                        <PostFileChips key={k} removeFile={removeFile} file_name={i?.file_name}/>
                    )
                }

            </div>:<></>}

            <div className="mb-3">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Add Files
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  onChange={(e)=>addPostFile(e)}
                />
            </div>

            
        </div>
        {/*Modal footer*/}
        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          <button
            type="button"
            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            data-te-modal-dismiss=""
            data-te-ripple-init=""
            data-te-ripple-color="light"
            ref={closeBtn}
          >
            Close
          </button>
          {!loading?<button
            type="button"
            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init=""
            data-te-ripple-color="light"
            onClick={create}
          >
            Create
          </button>
          :
          <LoadingBtn classes="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"/>
        }
        </div>
      </div>
    </div>
  </div>
    </>
  )
}

export default AddPostModal