import {StateType} from "./store";


export const getPaidTypes = (state:StateType) => state.stock.paidTypes
export const getFilterTypes = (state:StateType) => state.stock.filterTypes
export const getSummMode = (state:StateType) => state.stock.summMode
export const getPaidMode = (state:StateType) => state.stock.paidSelectMode
export const getFilterMode = (state:StateType) => state.stock.filterMode
export const getThemeMode = (state:StateType) => state.stock.themeMode
export const getStockItems = (state: StateType) => state.stock.stockItems
export const getRegMode = (state: StateType) => state.stock.regMode
export const getAuthMode = (state: StateType) => state.stock.authMode
export const getErrorMessage = (state: StateType) => state.stock.errorMessage
export const getSuccessMessage = (state: StateType) => state.stock.successMessage
export const getProfile = (state: StateType) => state.stock.profile
export const getNotificationMode = (state:StateType) => state.stock.notificationMode