import { createSlice } from '@reduxjs/toolkit'
import { api, setToken } from '../utils/api';
import {setErrorMessage, setRegMode, setAuthMode, setProfileAC, setRegEmailConfirm} from './stockReducer';

export const counterSlice = createSlice({
    name: 'profile',
    initialState: {
        items: [],
        user: null,
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
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
})

export const login = (body) => (dispatch) => {
    dispatch(setErrorMessage(false))
    api('/api/user/login', 'POST', body).then((r) => {
        if (r.success) {
            console.log(r)
            dispatch(setAuthMode(false))
            dispatch(setProfileAC(true))

            dispatch(getProfile());
        }
        else {
            dispatch(setErrorMessage(true))
        }
        setToken(r.token);
    });
}

export const signIn = (body) => (dispatch) => {
    dispatch(setErrorMessage(false))
    api('/api/user/register', 'POST', body).then((r) => {
        if (r.success) {
            dispatch(setRegEmailConfirm(true))
        }
        else {
            dispatch(setErrorMessage(true))
        }
    });
}

export const getProfile = () => (dispatch) => {
    api('/api/user/profile', 'GET').then((r) => {
        if(r.success) {
            dispatch(setUser(r.data))
        }
    });
}

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setUser } = counterSlice.actions

export const selectUser = (state) => state.user

export default counterSlice.reducer