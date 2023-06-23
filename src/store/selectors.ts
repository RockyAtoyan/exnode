import {StateType} from "./store";


export const getPaidTypes = (state:StateType) => state.stock.paidTypes
export const getFilterTypes = (state:StateType) => state.stock.filterTypes
export const getSummMode = (state:StateType) => state.stock.summMode
export const getPaidMode = (state:StateType) => state.stock.paidSelectMode
export const getFilterMode = (state:StateType) => state.stock.filterMode
export const getThemeMode = (state:StateType) => state.stock.themeMode