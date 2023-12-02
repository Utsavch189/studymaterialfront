import { axiosClient } from "../axiosClient";

export const loginClient = async(payload) => {
    const data = await axiosClient.post('/auth/login/', payload)
    return data
}