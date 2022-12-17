import {createSlice} from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointment: {}
    },
    reducers: {
        setAppointment: (state, action) => {
            state.appointment = action.payload;
        },
        clearAppointment: (state, action) => {
            state.appointment = {};
        }
    }
})

export const appointmentReducer = appointmentSlice.reducer;
export const selectAppointment = (state) => state.appointment.appointment
export const {
    setAppointment,
    clearAppointment,
} = appointmentSlice.actions