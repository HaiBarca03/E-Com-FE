import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    address: '',
    access_token: '',
    id: '',
    isAdmin: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', access_token = '', phone = '', avatar = '', address = '', _id = '', isAdmin } = action.payload
            // console.log('action:', action)
            state.name = name || email;
            state.email = email;
            state.phone = phone;
            state.avatar = avatar;
            state.address = address;
            state.access_token = access_token;
            state.id = _id;
            state.isAdmin = isAdmin;
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.phone = '';
            state.avatar = '';
            state.address = '';
            state.access_token = '';
            state.id = '';
            state.isAdmin = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions

export default userSlice.reducer