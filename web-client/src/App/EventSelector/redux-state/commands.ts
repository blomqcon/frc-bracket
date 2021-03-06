
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { EventSelectorState } from './reducer';
import { fetchEventListStart, fetchEventListSuccess } from './actions';
// TODO: How do I get rid of the relative path? Do these need to be in their own package?
import EventClient from '../../../ApiClient/EventClient';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const updateEventList = (): ThunkAction<void, EventSelectorState, null, Action> => async (dispatch) => {
  dispatch(fetchEventListStart());

  const eventClient = new EventClient();
  const events = await eventClient.getEvents();

  dispatch(fetchEventListSuccess(events));
};
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export default updateEventList;
