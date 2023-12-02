import { axiosClient } from "../axiosClient";

export const getPostsClient = async(section_id) => {
    const data = await axiosClient.get(`/post/section_id=${section_id}&post_id=None/`)
    return data
}