import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { setErrorMessageAction } from '../../redux/actions/messageAction';



function ErrorToaster({message}) {
    const dispatch=useDispatch();
    useEffect(()=>{
        if (message !== '') {
            toast.error(message, {
              position: "bottom-left",
              autoClose: 700
            });
            dispatch(setErrorMessageAction({message:''}))
          }
    },[message])
  return (
    <div><ToastContainer /></div>
  )
}

export default ErrorToaster