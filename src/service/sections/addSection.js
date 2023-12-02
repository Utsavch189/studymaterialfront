import { axiosClient } from "../axiosClient";

export const addSectionsClient = async(payload) => {
    const data = await axiosClient.post('/section/', payload)
    return data
}