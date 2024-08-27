import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItems } = action.payload;
            const existingItem = state.orderItems.find(item => item.product === orderItems.product);
            if (existingItem) {
                existingItem.amount += orderItems.amount;
            } else {
                state.orderItems.push(orderItems);
            }
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            state.orderItems = state.orderItems.filter(item => item.product !== idProduct);
        },
        updateOrderProductQuantity: (state, action) => {
            const { idProduct, amount } = action.payload;
            const existingItem = state.orderItems.find(item => item.product === idProduct);
            if (existingItem) {
                existingItem.amount = amount;
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, removeOrderProduct, updateOrderProductQuantity } = orderSlice.actions

export default orderSlice.reducer