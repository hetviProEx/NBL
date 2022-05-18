import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import { history } from "../history";

const middleware = [thunk, routerMiddleware(history)];
const initialState = {};
export default createStore(
  rootReducer(history),
  initialState,
  applyMiddleware(...middleware)
);
