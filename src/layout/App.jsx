import React, {  useEffect, useMemo } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Home from '../page/Home';
import Landing from '../page/Landing';
import { loading } from '../redux/actions/loadingAction';
import { auth } from '../redux/actions/authAction';
import SuccessToaster from '../components/toaster/Success';
import ErrorToaster from '../components/toaster/Error';
import Loading from '../components/Loader/Loading';



function App() {

  const isLoading=useSelector(state=>state.loadingReducer.isLoading);
  const isAuth=useSelector(state=>state.authReducer.isAuthenticated);
  const success=useSelector(state=>state.messageReducer.success);
  const error=useSelector(state=>state.messageReducer.error)

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(loading({isLoading:true}));
    setTimeout(()=>{
      dispatch(loading({isLoading:false}));
    },1000)
  },[])

  useMemo(()=>{
    if(localStorage.getItem('refresh_token_exp') <= Math.floor(Date.now() / 1000)){
      dispatch(auth({isAuthenticated:false,refresh_token_exp:null,access_token_exp:null}));
      localStorage.removeItem('refresh_token_exp')
      localStorage.removeItem('access_token_exp')
      
    }
    else{
      dispatch(auth({isAuthenticated:true,refresh_token_exp:localStorage.getItem('refresh_token_exp'),access_token_exp:localStorage.getItem('access_token_exp')}));
    }
    
  },[])

  return(
    <>
        {
          isLoading ? <Loading/> :
          isAuth ? <Home/>:<Landing/>
        }
        <SuccessToaster message={success}/>
        <ErrorToaster message={error}/>
    </>
  )
  
}

export default App