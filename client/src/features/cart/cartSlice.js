import {createSlice, nanoid} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        totalQuantity: 0,
        orderNumber: nanoid(),
        totalPrice: 0.0

    },
    reducers: {
        addToCart: (state, action) => {
            const itemInCart = state.cart.find((item) => item.product_id === action.payload.product_id);
            if (itemInCart) {
                itemInCart.quantity++;
                state.totalQuantity++;
                state.totalPrice += itemInCart.product_price;
            } else {
                state.cart.push({...action.payload, quantity: 1})
                state.totalQuantity++;
                state.totalPrice += action.payload.product_price
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.product_id === action.payload);
            if (item.quantity === 1) {
                item.quantity = 1
            } else {
                item.quantity--;
            }
        },
        removeItem: (state, action) => {

            const removeItem = state.cart.filter((item) => item.product_id !== action.payload.product_id);
            state.cart = removeItem;
            state.totalQuantity -= action.payload.quantity;
            state.totalPrice -= action.payload.product_price * action.payload.quantity
        },
    }
})

export const cartReducer = cartSlice.reducer;
export const selectAllOrders = (state) => state.cart
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
} = cartSlice.actions;