import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        pets: [],
        appointments: [],
        accessToken: null,
        refreshToken: null
    },
    reducers: {

        storeUser: (state, action) => {
            let {Pets, Appointments, createdAt, updatedAt, ...storeUser} = action.payload.user;
            state.user = storeUser;
            state.pets = action.payload.pets
            state.appointments = action.payload.appointments
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },

        logOut: (state, action) => {
            state.user = null
            state.pets = null
            state.appointments = null
            state.refreshToken = null
            state.accessToken = null
        },

        refreshState: (state, action) => {
            state.pets = action.payload.pets
            state.appointments = action.payload.appointments

        }
    }
})

export const userReducer = userSlice.reducer;
export const selectUser = (state) => state.user.user
export const selectPets = (state) => state.user.pets
export const selectAppointments = (state) => state.user.appointments
export const selectAccessToken = (state) => state.user.accessToken
export const selectRefreshToken = (state) => state.user.refreshToken
export const {
    storeUser,
    logOut,
    refreshState
} = userSlice.actions