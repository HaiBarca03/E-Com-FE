import axios from "axios";

export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/user/login`, data)
    console.log('res.data:', res.data)
    return res.data
}

export const registerUser = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/user/register`, data)
    return res.data
}

export const getDetailUser = async (id, access_token) => {
    const res = await axiosJWT.get(`http://localhost:4000/api/user/detail-user/${id}`, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}
export const refreshToken = async () => {
    const res = await axios.post(`http://localhost:4000/api/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`http://localhost:4000/api/user/logout`)
    return res.data
}