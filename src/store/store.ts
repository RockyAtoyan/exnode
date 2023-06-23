import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {stockReducer} from "./stockReducer";


const rootReducer = combineReducers({
    stock:stockReducer
})

export type StateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))