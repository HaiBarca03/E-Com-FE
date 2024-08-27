import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderReducer from './slides/orderSlide'

// Create persist configs for each reducer
// const productPersistConfig = {
//     key: 'product',
//     storage,
// }

// const userPersistConfig = {
//     key: 'user',
//     storage,
// }

const orderPersistConfig = {
    key: 'order',
    storage,
}

// Create persisted reducers
// const persistedProductReducer = persistReducer(productPersistConfig, productReducer)
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer)
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer)

// Configure the store with persisted reducers
export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: persistedOrderReducer,
    },
})

// Create a persistor
export const persistor = persistStore(store)
