

const IS = {
    paidTypes:['Сбербанк','Тинькофф','Райффайзен'],
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
    }  else if(action.type === 'set-theme-mode'){
        return {...state,themeMode: action.mode !== 'dark'}
    }
    return {...state}
}

type ActionsType =
    SetSummMode |
    SetPaidMode |
    SetFilterMode |
    SetThemeMode

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