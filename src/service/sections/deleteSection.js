import { axiosClient } from "../axiosClient";

export const deleteSectionsClient = async(payload) => {
    console.log(payload)
    const data = await axiosClient.delete('/section/', { data: payload })
    return data
}