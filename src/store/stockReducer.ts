import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";
import { api } from "../utils/api";


const IS = {
    stockItems: [
        {
            id: '1',
            type: 1,
            user: {
                login: 'JungSangLee',
                is_online: true
            },
            percent_success: 100,
            price: 185.58,
            currency: 'rub',
            limit_start:1000,
            limit_end:2500,
            limit: 150,
            payment_method: 'Сбербанк',
            requisites: '10123123'
        },
        {
            id: '2',
            type: 1,
            user: {
                login: 'JungSangLee',
                is_online: true
            },
            percent_success: 100,
            price: 185.58,
            currency: 'rub',
            limit_start:1000,
            limit_end:2500,
            limit: 150,
            payment_method: 'Сбербанк',
            requisites: '10123123'
        },
        {
            id: '3',
            type: 1,
            user: {
                login: 'JungSangLee',
                is_online: true
            },
            percent_success: 100,
            price: 185.58,
            currency: 'rub',
            limit_start:1000,
            limit_end:2500,
            limit: 150,
            payment_method: 'Сбербанк',
            requisites: '10123123'
        },
        {
            id: '4',
            type: 1,
            user: {
                login: 'JungSangLee',
                is_online: true
            },
            percent_success: 100,
            price: 185.58,
            currency: 'rub',
            limit_start:1000,
            limit_end:2500,
            limit: 150,
            payment_method: 'Сбербанк',
            requisites: '10123123'
        },
    ] as any[],
    message:[] as any,
    paidTypes: ['Сбербанк', 'Тинькофф', 'Райффайзен', 'Юmoney', 'QIWI'],
    filterTypes: ['самые новые', 'лучшая цена'],
    summMode: false,
    paidSelectMode: false,
    filterMode: false,
    themeMode: false,
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
    SetStockItems

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
export const setStockItems = (items: any[]): SetStockItems => ({type: 'set-stock-items-mode', items})


type ThunkType = ThunkAction<Promise<void> | void, StateType, any, ActionsType>

export const getOffersItems = (type: any): ThunkType => (dispatch) => {
    return api(`/api/offer?type=${type}`, 'GET').then((data) => {
        //dispatch(setStockItems(data.data))
     });
} 

export const getMessage = (type: any): ThunkType => (dispatch) => {
    return api(`/api/message?order_id=${type}`, 'GET').then((data) => {
        //dispatch(setStockItems(data.data))
     });
} 

export const createMessage = (body:any): ThunkType => (dispatch) => {
    return api(`/api/message/create`, 'POST',body).then((data) => {
        //dispatch(setStockItems(data.data))
     });
} 
