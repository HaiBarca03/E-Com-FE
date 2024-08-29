import axios from "axios"
import { axiosJWT } from "./UserService"

export const addComment = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/review/create-comment`, data)
    return res.data
}


export const getAllComments = async (idProduct) => {
    const response = await axios.get(`http://localhost:4000/api/review/get-all-comment/${idProduct}`);
    return response.data;
}

export const getAllReview = async (data, access_token) => {
    const res = await axiosJWT.get(`http://localhost:4000/api/review/get-all-review`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    console.log('data', res.data)
    return res.data
}