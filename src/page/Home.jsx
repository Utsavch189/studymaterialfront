import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { loading } from '../redux/actions/loadingAction';
import { getAuserClient } from '../service/user/getAuser';
import { refreshtokenClient } from '../service/auth/refresh_token';
import NavBar from '../components/navbar/nav';
import { user } from '../redux/actions/userAction';
import Section from './Section';
import { Outlet } from 'react-router-dom';



function Home() {
  const dispatch=useDispatch();

  const getAUser=async()=>{
    dispatch(loading({isLoading:true}))
    try {
      const users=await getAuserClient();
      dispatch(user({
        username:users.data.data.username,
        email:users.data.data.email,
        phone:users.data.data.phone,
        full_name:users.data.data.full_name,
        user_meta:users.data.data.user_meta
      }))
    } catch (error) {
      console.log(error)

    }
  }

  const getNewToken=async()=>{
    try {
      const new_token=await refreshtokenClient();
      console.log(new_token)
    } catch (error) {
      console.log(error)
    }
  }

  useMemo(()=>{
    if(localStorage.getItem('access_token_exp') <= Math.floor(Date.now() / 1000) && localStorage.getItem('refresh_token_exp') >= Math.floor(Date.now() / 1000)){
      getNewToken();
    }
    getAUser();

    dispatch(loading({isLoading:false}))
  },[])

  return (
    <>
        
          <NavBar/>
          <Outlet/>
       
    </>
  )
}

export default Home