import {
  createStore, combineReducers, applyMiddleware, Middleware,
} from 'redux';
import thunk from 'redux-thunk';

import { eventSelectorReducer } from './EventSelector/redux-state/reducer';

const rootReducer = combineReducers({
  eventSelector: eventSelectorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const configureStore = () => {
  const middlewares: Middleware[] = [thunk];
  const middleWareEnhancer = applyMiddleware(...middlewares);
  return createStore(rootReducer, middleWareEnhancer);
};
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export default configureStore;
