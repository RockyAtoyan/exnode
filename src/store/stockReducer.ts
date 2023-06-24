import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";


const IS = {
    stockItems:[
        {
            id:'1',
            name:'JungSangLee',
            img:'./assets/user.png',
            active:true,
            ordersCount:2,
            ordersProcent:100,
            likesCount:2,
            dislikesCount:0,
            price:185.58,
            monetType:'rub',
            limit:{
                range:[1000,2500],
                available:150
            },
            paidType:'Сбербанк',
            date:'10'
        },
        {
            id:'2',
            name:'JungSangLee',
            img:'./assets/user.png',
            active:true,
            ordersCount:2,
            ordersProcent:100,
            likesCount:2,
            dislikesCount:0,
            price:85.58,
            monetType:'rub',
            limit:{
                range:[1000,2500],
                available:150
            },
            paidType:'Тинькофф',
            date:'2'
        },
        {
            id:'3',
            name:'JungSangLee',
            img:'./assets/user.png',
            active:true,
            ordersCount:2,
            ordersProcent:100,
            likesCount:2,
            dislikesCount:0,
            price:85.58,
            monetType:'rub',
            limit:{
                range:[1000,2500],
                available:150
            },
            paidType:'Тинькофф',
            date:'3'
        },
        {
            id:'4',
            name:'JungSangLee',
            img:'./assets/user.png',
            active:true,
            ordersCount:2,
            ordersProcent:100,
            likesCount:2,
            dislikesCount:0,
            price:85.58,
            monetType:'rub',
            limit:{
                range:[1000,2500],
                available:150
            },
            paidType:'Тинькофф',
            date:'4'
        }
    ] as StockItemType[],
    paidTypes:['Сбербанк','Тинькофф','Райффайзен','Юmoney','QIWI'],
    filterTypes:['самые новые','лучшая цена'],
    summMode:false,
    paidSelectMode:false,
    filterMode:false,
    themeMode:false,
}

export const stockReducer = (state = IS,action:ActionsType) => {
    if(action.type === "set-summ-mode"){
        return {...state,summMode: action.mode}
    } else if(action.type === 'set-paid-mode'){
        return {...state,paidSelectMode: action.mode}
    } else if(action.type === 'set-filter-mode'){
        return {...state,filterMode: action.mode}
    }else if(action.type === 'set-theme-mode'){
            return {...state,themeMode: action.mode !== 'dark'}
    }else if(action.type === 'set-stock-items-mode'){
        return {...state,stockItems: action.items}
    }
    return {...state}
}

export type StockItemType = {
    id:string
    name:string,
    img:string,
    active:boolean,
    ordersCount:number,
    ordersProcent:number,
    likesCount:number,
    dislikesCount:number,
    price:number,
    monetType:string,
    limit:{
        range:number[],
        available:number
    }
    paidType:string,
    date:string
}

type ActionsType =
    SetSummMode |
    SetPaidMode |
    SetFilterMode |
    SetThemeMode |
    SetStockItems

type SetSummMode = {
    type:'set-summ-mode',
    mode:boolean
}
export const setSummMode = (mode:boolean):SetSummMode => ({type:'set-summ-mode',mode})

type SetPaidMode = {
    type:'set-paid-mode',
    mode:boolean
}
export const setPaidMode = (mode:boolean):SetPaidMode => ({type:'set-paid-mode',mode})


type SetFilterMode = {
    type:'set-filter-mode',
    mode:boolean
}
export const setFilterMode = (mode:boolean):SetFilterMode => ({type:'set-filter-mode',mode})

type SetThemeMode = {
    type:'set-theme-mode',
    mode:string
}
export const setThemeMode = (mode:string):SetThemeMode => ({type:'set-theme-mode',mode})

type SetStockItems = {
    type:'set-stock-items-mode',
    items:StockItemType[]
}
export const setStockItems = (items:StockItemType[]):SetStockItems => ({type:'set-stock-items-mode',items})


type ThunkType = ThunkAction<Promise<void> | void, StateType, any, ActionsType>
