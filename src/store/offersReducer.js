import { createSlice } from '@reduxjs/toolkit'
import { api, setToken } from '../utils/api';
import {getMessage, getOffersItems, setErrorMessage, setNotificationModeAC, setSuccessMessage} from './stockReducer';

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

export const createOffer = (body, type = 1) => (dispatch) => {
    dispatch(setSuccessMessage(false))
    dispatch(setErrorMessage(false))
    api('/api/offer/create', 'POST', body).then((r) => {
        if (r.success) {
            dispatch(getOffersItems(type))
            dispatch(setNotificationModeAC(false))
            dispatch(setSuccessMessage(true))
        }
        else {
            dispatch(setErrorMessage(true))
        }
    });
}

export const createOrder = (body) => (dispatch) => {
    api('/api/order/create', 'POST', body).then((r) => {
        dispatch(getMessage(body.offer_id))
    });

}

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer