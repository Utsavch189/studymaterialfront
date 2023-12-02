import { axiosClient } from "../axiosClient";

export const getSectionsClient = async() => {
    const data = await axiosClient.get('/section/')
    return data
}