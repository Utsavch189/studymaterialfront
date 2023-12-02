import React,{createContext, useMemo, useState} from 'react'
import SectionCards from '../components/sections/SectionCards'
import CreateSection from '../components/sections/CreateSection'
import { getSectionsClient } from '../service/sections/getSections'
import { useDispatch } from 'react-redux'
import { loading } from '../redux/actions/loadingAction'

export const ContextProvider=createContext()

function Section() {

    const [section,setSection]=useState([])
    const dispatch=useDispatch();

    const getAllSections=async()=>{
        dispatch(loading({isLoading:true}))
        try {
          const sections=await getSectionsClient()
          setSection(sections.data.section)
        } catch (error) {
          console.log(error)
        }
      }

      useMemo(()=>{
        getAllSections();
        dispatch(loading({isLoading:false}))
      },[])

      const contexts={
        section,setSection
      }

  return (
   <>
       <ContextProvider.Provider value={contexts}>
            <CreateSection/>
            <div className="flex flex-wrap justify-center mt-10">

             {
                 section?.length && section?.map((i,k)=>
                     <SectionCards key={k}
                         data={i}
                     />
                 )
             }
            </div>
      </ContextProvider.Provider>
   </>


  )
}

export default Section