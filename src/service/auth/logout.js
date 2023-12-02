import { axiosClient } from "../axiosClient";

export const logoutClient = async() => {
    const data = await axiosClient.post('/auth/logout/')
    return data
}