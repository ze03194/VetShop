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
            const item = state.cart.find((item) => item.product_id === action.payload.product_id);

            if (item.quantity === 1) {
                item.quantity = 1
                state.totalQuantity--;
            } else {
                item.quantity--;
                state.totalQuantity--;
            }
        },

        changeQuantity: (state, action) => {
            const {product, newQuantity} = action.payload;
            const item = state.cart.find((item) => item.product_id === product.product_id);

            if (newQuantity > item.quantity) {
                if (item.quantity <= 5) {
                    state.totalQuantity += (newQuantity - item.quantity)
                    const changePrice = product.product_price * (newQuantity - item.quantity)
                    item.quantity = newQuantity
                    console.log('ppr' + product.product_price)
                    state.totalPrice += changePrice

                }
            }
            if (newQuantity < item.quantity) {
                if (item.quantity >= 1) {
                    state.totalQuantity -= (item.quantity - newQuantity);
                    const changePrice = product.product_price * (item.quantity - newQuantity);
                    item.quantity = newQuantity;
                    state.totalPrice -= changePrice
                }
            }

        },

        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.product_id !== action.payload.product_id);
            state.totalQuantity -= action.payload.quantity;
            state.totalPrice -= action.payload.product_price * action.payload.quantity
        },
        emptyCart: (state, action) => {
            state.cart = []
            state.totalQuantity = 0
            state.totalPrice = 0
            state.orderNumber = null
        }
    }
})

export const cartReducer = cartSlice.reducer;
export const selectAllOrders = (state) => state.cart
export const {
    addToCart,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    removeItem,
    emptyCart
} = cartSlice.actions;