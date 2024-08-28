import axios from "axios"

export const addComment = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/review/create-comment`, data)
    return res.data
}


export const getAllComments = async (idProduct) => {
    const response = await axios.get(`http://localhost:4000/api/review/get-all-comment/${idProduct}`);
    return response.data;
}