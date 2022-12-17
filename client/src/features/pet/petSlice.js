import {createSlice} from "@reduxjs/toolkit";

const petSlice = createSlice({
    name: 'pet',
    initialState: {
        pet: {},
    },
    reducers: {
        setPet: (state, action) => {
            state.pet = action.payload;
        },
        clearPet: (state, action) => {
            state.pet = {}
        }
    },
})

export const petReducer = petSlice.reducer;
export const selectPet = (state) => state.pet.pet;
export const {
    setPet,
    clearPet,
} = petSlice.actions