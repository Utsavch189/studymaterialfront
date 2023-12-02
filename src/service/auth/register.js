import { axiosClient } from "../axiosClient";

export const registerClient = async(payload) => {
    const data = await axiosClient.post('/auth/register/', payload)
    return data
}