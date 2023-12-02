import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSuccessMessageAction } from '../../redux/actions/messageAction';


function SuccessToaster({message}) {
    const dispatch=useDispatch();

    useEffect(()=>{
        if (message !== '') {
            toast.success(message, {
              position: "bottom-left",
              autoClose: 700
            });
            dispatch(setSuccessMessageAction({message:''}))
          }
    },[message])
  return (
    <div><ToastContainer /></div>
  )
}

export default SuccessToaster