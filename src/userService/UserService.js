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

export const updateUser = async (id, data, access_token) => {
    const res = await axiosJWT.put(`http://localhost:4000/api/user/update-user/${id}`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const getAllUser = async () => {
    const res = await axios.get(`http://localhost:4000/api/user/all-user`)
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:4000/api/user/delete-user/${id}`, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const deleteManyUser = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:4000/api/user/delete-many-user`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}