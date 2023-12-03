import React, { useContext, useState } from 'react'
import logo from '../../assets/app_logo/applogo.jpg'
import { Link } from 'react-router-dom'
import { deleteSectionsClient } from '../../service/sections/deleteSection'
import { ContextProvider } from '../../page/Section';
import EditSectionModal from './EditSectionModal';
import { useDispatch } from 'react-redux';
import { setUpdateSectionAction } from '../../redux/actions/section';
import Shortner from '../../utils/stringShort';


function SectionCards({data}) {

  const context=useContext(ContextProvider);

  const handelDelete=async(section_id)=>{
    try {
      const res=await deleteSectionsClient({section_id:section_id})
      if(res.status===202){
        const newSection=context.section.filter((section)=>section.section_id!==section_id)
        context.setSection(newSection)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const openUpdateModal=()=>{
    window.document.getElementById("editsection").classList.add("flex");
    window.document.getElementById("editsection").classList.remove("hidden");
  }

  const closeUpdateModal=()=>{
    window.document.getElementById("editsection").classList.add("hidden");
    window.document.getElementById("editsection").classList.remove("flex");
  }

  const dispatch=useDispatch()

  const passDataToUpdateModal=(data)=>{
    console.log(data?.section_name)
    dispatch(setUpdateSectionAction({section_name:data?.section_name,section_id:data?.section_id,created_at:data?.created_at,section_about:data?.section_about,visibility:data?.visibility}))
    openUpdateModal()
  }

  return (
    <>
    <EditSectionModal close={closeUpdateModal}/>
    <div className="p-4 max-w-sm">
    <div className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center mb-3 justify-between">
        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
         <img src={logo} alt="" />
        </div>
        <h2 className="text-black text-lg font-medium">
          {Shortner(data?.section_name.toUpperCase(),20)}
        </h2>
        <button 
           >
            <i className="fa-solid fa-pen-to-square text-yellow-400" style={{cursor:"pointer"}} onClick={()=>{
              passDataToUpdateModal(data)
              }}></i>
        </button>
      </div>
      <div className="flex flex-col justify-between flex-grow">
        {data?.section_about?<p className="leading-relaxed text-base text-black">
          {Shortner(data?.section_about,25)}
        </p>:<p className="leading-relaxed text-base text-black">None</p>
        }

        <p className="leading-relaxed text-base text-black">{new Date(data?.created_at).toLocaleString()}</p>
        <p className="leading-relaxed text-base text-black">{data?.visibility}</p>
        <div className='flex justify-between items-center'>
        <Link
          to={`/posts/${data?.section_id}`}
          className="mt-3 text-black hover:text-orange-200 inline-flex items-center"
        >
          Posts
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <i className="fa-solid fa-trash" style={{color:"red",cursor:"pointer"}} onClick={()=>handelDelete(data?.section_id)}></i>
        </div>
      </div>
    </div>
  </div>
    
    </>
  )
}

export default SectionCards