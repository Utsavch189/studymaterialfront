import { axiosClient } from "../axiosClient";

export const getAuserClient = async() => {
    const data = await axiosClient.get('/users/get-user/')
    return data
}