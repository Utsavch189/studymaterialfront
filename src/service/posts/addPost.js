import { axiosClient } from "../axiosClient";

export const addPostsClient = async(payload) => {
    const data = await axiosClient.post(`/post/`, payload)
    return data
}