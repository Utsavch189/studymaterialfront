import React, { useState } from 'react'
import { FileToBase64 } from '../utils/fileTob64';
import { registerClient } from '../service/auth/register';
import { Link } from 'react-router-dom';
import LoadingBtn from '../components/loadingBtn';
import { useSelector } from 'react-redux';
import SuccessToaster from '../components/toaster/Success';
import ErrorToaster from '../components/toaster/Error';


function Register() {

  const[loading,setLoading]=useState(false)
  const success=useSelector(state=>state.messageReducer.success);
  const error=useSelector(state=>state.messageReducer.error)

  const [userdata,setUserData]=useState({
    username:'',
    full_name:'',
    email:'',
    phone:'',
    password:'',
    confirm_password:'',
    profile_pic_name:'',
    profile_pic_base64:''

  });

  const [picurl,setPicUrl]=useState('');

  const handleImage=(e)=>{
    const file=e.target.files[0];
    const reader= FileToBase64(file);
    reader.onload=()=>{
      setUserData({
        ...userdata,
        profile_pic_name:file.name,
        profile_pic_base64:reader.result
      })

      fetch(reader.result)
        .then(res => res.blob())
        .then(data=>setPicUrl(URL.createObjectURL(data)))
    }
    
  }

  const submit=async()=>{
    setLoading(true)
    try {
      const res=await registerClient(userdata);
      console.log(res)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <>
        <SuccessToaster message={success}/>
        <ErrorToaster message={error}/>
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
  {
    picurl ? <img className="w-16 h-16 rounded-full" src={picurl} alt="Rounded avatar"/>
    :
    <img className="w-16 h-16 rounded-full" src="https://media.istockphoto.com/id/1209654046/vector/user-avatar-profile-icon-black-vector-illustration.jpg?s=612x612&w=0&k=20&c=EOYXACjtZmZQ5IsZ0UUp1iNmZ9q2xl1BD1VvN6tZ2UI=" alt="Rounded avatar"/>
  }

    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Username
            </label>
            <input
              type="name"
              name="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Utsavch189"
              value={userdata.username}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  username:e.target.value
                })
              }}
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="full_name"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your FullName
            </label>
            <input
              type="name"
              name="full_name"
              id="full_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Utsav Chatterjee"
              value={userdata.full_name}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  full_name:e.target.value
                })
              }}
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="utsavchatterjee71@gmail.com"
              value={userdata.email}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  email:e.target.value
                })
              }}
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Phone
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1234567890"
              value={userdata.phone}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  phone:e.target.value
                })
              }}
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userdata.password}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  password:e.target.value
                })
              }}
              required=""
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={userdata.confirm_password}
              onChange={(e)=>{
                setUserData({
                  ...userdata,
                  confirm_password:e.target.value
                })
              }}
              required=""
            />
          </div>
          {/*  profile pic uploader */}
          <label
            htmlFor="dropzone-file"
            className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
          >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
              </svg>
            <h2 className="mx-3 text-gray-400">Profile Photo</h2>
            <input id="dropzone-file" type="file" className="hidden" onChange={(e)=>handleImage(e)}/>
          </label>

         {!loading? <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            onClick={submit}
          >
            Create an account
          </button>
          :
          <LoadingBtn classes={"w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"}/>  
        }
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>

      </div>
    </div>
  </div>
</section>



    </>
  )
}

export default Register