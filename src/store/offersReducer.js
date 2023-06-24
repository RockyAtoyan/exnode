import { createSlice } from '@reduxjs/toolkit'
import { api } from '../utils/api';

export const counterSlice = createSlice({
    name: 'offers',
    initialState: {
        items: [],
    },
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

export const getOffers = (query) => (dispatch) => {
    api('/api/offer', 'GET', false, query).then((r) => {
       console.log(r);
    });
}

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer