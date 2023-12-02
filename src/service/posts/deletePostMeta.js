import { axiosClient } from "../axiosClient";

export const deletePostMetaClient = async(payload) => {
    const data = await axiosClient.delete(`/post/post-meta/`, { data: payload })
    return data
}