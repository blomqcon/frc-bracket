import { Event } from '../../../ApiClient/EventClient';

export const FETCH_EVENT_LIST_START = 'FETCH_EVENT_LIST_START';
interface FetchEventListStart {
  type: typeof FETCH_EVENT_LIST_START;
}
export function fetchEventListStart(): EventSelectorAction {
  return {
    type: FETCH_EVENT_LIST_START,
  };
}

export const FETCH_EVENT_LIST_SUCCESS = 'FETCH_EVENT_LIST_SUCCESS';
interface FetchEventListSuccess {
  type: typeof FETCH_EVENT_LIST_SUCCESS;
  payload: Event[];
}
export function fetchEventListSuccess(events: Event[]): EventSelectorAction {
  return {
    type: FETCH_EVENT_LIST_SUCCESS,
    payload: events,
  };
}

export type EventSelectorAction =
  | FetchEventListStart
  | FetchEventListSuccess
