import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";
import { api, setToken } from "../utils/api";
import { getMessageItems } from "./selectors";


const IS = {
    profile:false as any,
    stockItems: [] as any[],
    message:[] as any,
    paidTypes: ['Сбербанк', 'Тинькофф', 'Райффайзен', 'Юmoney', 'QIWI'],
    filterTypes: ['самые новые', 'лучшая цена'],
    summMode: false,
    paidSelectMode: false,
    filterMode: false,
    themeMode: false,
    authMode: false,
    regMode: false,
    errorMessage: false,
    successMessage: false,
    notificationMode:false,
}

export const stockReducer = (state = IS, action: ActionsType) => {
    if (action.type === "set-summ-mode") {
        return {...state, summMode: action.mode}
    } else if (action.type === 'set-paid-mode') {
        return {...state, paidSelectMode: action.mode}
    } else if (action.type === 'set-filter-mode') {
        return {...state, filterMode: action.mode}
    } else if (action.type === 'set-theme-mode') {
        return {...state, themeMode: action.mode !== 'dark'}
    } else if (action.type === 'set-stock-items-mode') {
        return {...state, stockItems: action.items}
    } else if (action.type === 'set-reg-mode') {
        return {...state, regMode: action.reg}
    } else if (action.type === 'set-auth-mode') {
        return {...state, authMode: action.mode}
    } else if (action.type === 'set-error-message-mode') {
        return {...state, errorMessage: action.mode}
    } else if (action.type === 'set-profile') {
        return {...state, profile: action.profile}
    } else if (action.type === 'set-notification-mode') {
        return {...state, notificationMode: action.mode}
    } else if (action.type === 'set-success-message-mode') {
        return {...state, successMessage: action.mode}
    }  else if (action.type === 'set-message-items') {
        return {...state, message: action.items}
    }
    return {...state}
}

export type StockItemType = {
    id: string
    name: string,
    img: string,
    active: boolean,
    ordersCount: number,
    ordersProcent: number,
    likesCount: number,
    dislikesCount: number,
    price: number,
    monetType: string,
    limit: {
        range: number[],
        available: number
    }
    paidType: string,
    date: string
}

type ActionsType =
    SetSummMode |
    SetPaidMode |
    SetFilterMode |
    SetThemeMode |
    SetStockItems |
    SetRegMode | 
    SetAuthMode |
    SetErrorMessage | 
    SetProfileAC | 
    SetNotificationModeAC | 
    SetSuccessMessage | 
    SetMessageItems

type SetSummMode = {
    type: 'set-summ-mode',
    mode: boolean
}
export const setSummMode = (mode: boolean): SetSummMode => ({type: 'set-summ-mode', mode})

type SetPaidMode = {
    type: 'set-paid-mode',
    mode: boolean
}
export const setPaidMode = (mode: boolean): SetPaidMode => ({type: 'set-paid-mode', mode})


type SetFilterMode = {
    type: 'set-filter-mode',
    mode: boolean
}
export const setFilterMode = (mode: boolean): SetFilterMode => ({type: 'set-filter-mode', mode})

type SetThemeMode = {
    type: 'set-theme-mode',
    mode: string
}
export const setThemeMode = (mode: string): SetThemeMode => ({type: 'set-theme-mode', mode})

type SetStockItems = {
    type: 'set-stock-items-mode',
    items: any[]
}
export const setStockItems = (items: any[]): SetStockItems => ({ type: 'set-stock-items-mode', items })

type SetRegMode = {
    type: 'set-reg-mode',
    reg: boolean
}
export const setRegMode = (reg: boolean): SetRegMode => ({ type: 'set-reg-mode', reg })

type SetAuthMode = {
    type: 'set-auth-mode',
    mode: boolean
}
export const setAuthMode = (mode: boolean): SetAuthMode => ({ type: 'set-auth-mode', mode })

type SetErrorMessage = {
    type: 'set-error-message-mode',
    mode: boolean
}
export const setErrorMessage = (mode: boolean): SetErrorMessage => ({ type: 'set-error-message-mode', mode })

type SetSuccessMessage = {
    type: 'set-success-message-mode',
    mode: boolean
}
export const setSuccessMessage = (mode: boolean): SetSuccessMessage => ({ type: 'set-success-message-mode', mode })

type SetProfileAC = {
    type: 'set-profile',
    profile:any,
}
export const setProfileAC = (profile: any): SetProfileAC => ({ type: 'set-profile', profile })

type SetNotificationModeAC = {
    type: 'set-notification-mode',
    mode:boolean,
}
export const setNotificationModeAC = (mode: boolean): SetNotificationModeAC => ({ type: 'set-notification-mode', mode })

type SetMessageItems = {
    type: 'set-message-items',
    items: any[]
}
export const setMessageItems = (items: any[]): SetMessageItems => ({ type: 'set-message-items', items })


type ThunkType = ThunkAction<Promise<void> | void, StateType, any, ActionsType>

export const getOffersItems = (type: any,currency:any): ThunkType => (dispatch) => {
    return api(`/api/offer?type=${type}&currency=${currency}`, 'GET').then((data) => {
        dispatch(setStockItems(data.data))
     });
} 

export const getMessage = (type: any): ThunkType => (dispatch) => {
    return api(`/api/message?order_id=${type}`, 'GET').then((data) => {
        dispatch(setMessageItems(data.data))
     });
} 

export const createMessage = (body:any): ThunkType => (dispatch) => {
    return api(`/api/message/create`, 'POST',body).then((data) => {
        dispatch(setMessageItems(data.data))
        dispatch(getMessage(body.id))
     });
} 
