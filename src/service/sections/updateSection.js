import { axiosClient } from "../axiosClient";

export const updateSectionsClient = async(payload) => {
    const body = {...payload }
    if (body.section_about === null) {
        body.section_about = ''
    }
    const data = await axiosClient.put('/section/', body)
    return data
}