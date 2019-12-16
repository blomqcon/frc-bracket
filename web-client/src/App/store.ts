import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import thunk from 'redux-thunk'

import { eventSelectorReducer } from "./EventSelector/redux-state/reducer";

const rootReducer = combineReducers({
    eventSelector: eventSelectorReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
  const middlewares: Middleware[] = [thunk];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, middleWareEnhancer);
}
