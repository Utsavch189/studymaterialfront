import axios from "axios";
import store from '../redux/store'
import { auth } from "../redux/actions/authAction";
import { setErrorMessageAction, setSuccessMessageAction } from "../redux/actions/messageAction";


export const axiosClient = axios.create({
    baseURL: 'https://api.utsavchatterjee.me/api/v1',
    withCredentials: true,

});

axiosClient.interceptors.response.use(res => {
    if (res.data['login']) {
        localStorage.setItem('refresh_token_exp', res.data['refresh_token_exp'])
        localStorage.setItem('access_token_exp', res.data['access_token_exp'])
        store.dispatch(auth({
            isAuthenticated: true,
            refresh_token_exp: res.data['refresh_token_exp'],
            access_token_exp: res.data['access_token_exp']
        }))
        window.location.href = "/"

    } else if (res.data['logout']) {
        localStorage.removeItem('refresh_token_exp')
        localStorage.removeItem('access_token_exp')
        store.dispatch(auth({
            isAuthenticated: false,
            refresh_token_exp: null,
            access_token_exp: null
        }))
        window.location.href = "/"
    }
    console.log(res.data)
    store.dispatch(
        setSuccessMessageAction({
            message: res.data.message
        })
    )
    return res;
}, err => {
    store.dispatch(setErrorMessageAction({ message: err.response.data.message }))
    console.log(err.response.data.message)
    throw err;
});