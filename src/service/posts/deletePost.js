import { axiosClient } from "../axiosClient";

export const deletePostsClient = async(payload) => {
    const data = await axiosClient.delete(`/post/`, { data: payload })
    return data
}