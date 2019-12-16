import { Event } from '../../../ApiClient/EventClient';

import { EventSelectorAction, FETCH_EVENT_LIST_START, FETCH_EVENT_LIST_SUCCESS } from './actions';

export interface EventSelectorState {
  events: Event[];
  updateEventsInProgress: boolean;
}

const initialState: EventSelectorState = {
  events: [],
  updateEventsInProgress: false,
};

export const eventSelectorReducer = (state = initialState, action: EventSelectorAction): EventSelectorState => {
  switch (action.type) {
    case FETCH_EVENT_LIST_START:
      return {
        ...state,
        updateEventsInProgress: true,
      };
    case FETCH_EVENT_LIST_SUCCESS:
      return {
        ...state,
        updateEventsInProgress: false,
        events: action.payload,
      };
    default:
      return state;
  }
};
