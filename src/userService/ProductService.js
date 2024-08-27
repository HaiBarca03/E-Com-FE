import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        res = await axios.get(`http://localhost:4000/api/product/all-product?filter=name&filter=${search}&limit=${limit}`)
    } else {
        res = await axios.get(`http://localhost:4000/api/product/all-product?limit=${limit}`)
    }
    return res.data
}

export const getTypeProduct = async (type, page, limit) => {
    let res = {}
    if (type) {
        res = await axios.get(`http://localhost:4000/api/product/all-product?filter=type&filter=${type}&page=${page - 1}&limit=${limit}`)
    } else {
        res = await axios.get(`http://localhost:4000/api/product/all-product?filter=type&filter=${type}`)
    }
    return res.data
}

export const createProduct = async (data) => {
    const res = await axios.post(`http://localhost:4000/api/product/create-product`, data)
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`http://localhost:4000/api/product/product-detail/${id}`)
    return res.data
}
export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`http://localhost:4000/api/product/update-product/${id}`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:4000/api/product/delete-product/${id}`, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:4000/api/product/delete-many-product`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}
export const getAllType = async () => {
    const res = await axios.get(`http://localhost:4000/api/product/all-type`)
    return res.data
}