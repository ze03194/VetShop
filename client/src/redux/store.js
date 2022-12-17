import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cartReducer} from "../features/cart/cartSlice";
import {userReducer} from "../features/user/userSlice";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "reduxjs-toolkit-persist";
import {messageReducer} from "../features/message/messageSlice";
import {appointmentReducer} from "../features/appointment/appointmentSlice";
import {petReducer} from "../features/pet/petSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    cart: cartReducer,
    user: userReducer,
    message: messageReducer,
    appointment: appointmentReducer,
    pet: petReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,

})