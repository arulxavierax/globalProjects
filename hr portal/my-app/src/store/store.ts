import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./users/users.reducer";
import { singleReducer } from "./singleUser/singleUser.reducer";

const rootReducer = combineReducers({
  users: userReducer,
  singleUser: singleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
