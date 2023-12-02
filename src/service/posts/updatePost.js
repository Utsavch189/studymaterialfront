import { axiosClient } from "../axiosClient";

export const updatePostsClient = async(payload) => {
    const data = await axiosClient.put(`/post/`, payload)
    return data
}