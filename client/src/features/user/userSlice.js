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
            // state.user = action.payload.user
            state.pets = action.payload.pets
            state.appointments = action.payload.appointments
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken

            // if (action.payload.user) {
            //     let {Pets, Appointments, createdAt, updatedAt, ...storeUser} = action.payload.user;
            //     state.user = storeUser;
            //     state.accessToken = action.payload.accessToken;
            //     state.refreshToken = action.payload.refreshToken;
            //     console.log(state.accessToken)
            // }
            // if (action.payload.user.Pets) {
            //     for (let i = 0; i < action.payload.user.Pets.length; i++) {
            //         let {createdAt, updatedAt, ...storePets} = action.payload.user.Pets[i];
            //         state.pets.push(storePets);
            //
            //     }
            //
            // }
            // if (action.payload.user.Appointments) {
            //     for (let i = 0; i < action.payload.user.Appointments.length; i++) {
            //         let {createdAt, updatedAt, ...storeAppointments} = action.payload.user.Appointments[i];
            //         state.appointments = storeAppointments;
            //     }
            // }

            // console.log(JSON.stringify(state.user))
            // console.log(JSON.stringify(state.pets))
            // console.log(JSON.stringify(state.appointments))


            // state.pets = action.payload.pets;
            // console.log(JSON.stringify(state.pets))

            // console.log('from uSlice: ' + JSON.stringify(action.payload.user.Pets))
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