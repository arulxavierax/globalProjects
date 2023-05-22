import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "./users/users.reducer";
import { singleReducer } from "./singleUser/singleUser.reducer";
import { documentReducer } from "./documents/documents.reducer";
import { citiesReducer } from "./cities/cities.reducer";

const rootReducer = combineReducers({
  users: userReducer,
  singleUser: singleReducer,
  documents: documentReducer,
  cities: citiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
