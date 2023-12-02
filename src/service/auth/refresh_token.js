import { axiosClient } from "../axiosClient";

export const refreshtokenClient = async() => {
    const data = await axiosClient.post('/auth/refresh-token/')
    return data
}