import { axiosJWT } from "./UserService"

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`http://localhost:4000/api/order/create-order`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    console.log('data', res.data)
    return res.data
}

export const getOrderUser = async (id, data, access_token) => {
    const res = await axiosJWT.get(`http://localhost:4000/api/order/get-order-user/${id}`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}

export const deleteOrderUser = async (id, data, access_token) => {
    const res = await axiosJWT.delete(`http://localhost:4000/api/order/delete-order/${id}`, data, {
        headers: {
            token: `Beare ${access_token}`
        }
    })
    return res.data
}