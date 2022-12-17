import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        title: '',
        body: '',
    },
    reducers: {
        createMessage: (state, action) => {
            state.title = action.payload.title;
            state.body = action.payload.body;
        },
        clearMessage: (state, action) => {
            state.title = '';
            state.body = '';
        }
    }
})

export const messageReducer = messageSlice.reducer;
export const selectMessage = (state) => state.message

export const {
    createMessage,
    clearMessage,
} = messageSlice.actions