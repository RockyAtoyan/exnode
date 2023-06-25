import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {stockReducer} from "./stockReducer";
import offersReducer from "./offersReducer";
import profileReducer from "./profileReduces";

const rootReducer = combineReducers({
    stock:stockReducer,
    offers: offersReducer,
    profile:profileReducer
})

export type StateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))