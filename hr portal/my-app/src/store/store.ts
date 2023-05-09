import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./users/users.reducer";

const rootReducer = combineReducers({
    users:userReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
