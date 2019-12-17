import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../store';
import { EventSelector } from './EventSelector';
import { updateEventList } from './redux-state/commands';
import { EventSelectorAction } from './redux-state/actions';
import { Event } from '../../ApiClient/EventClient';

/* eslint-disable @typescript-eslint/no-empty-interface */
interface EventSelectorConnectedProps {
  // Nothing is currently passed in.
  // Once there is a hierarchy of reducers this will be used to plumb state.
}
/* eslint-enable @typescript-eslint/no-empty-interface */

interface DispatchProps {
  updateEventList(): void;
}

interface StateProps {
  events: Event[];
  updateEventsInProgress: boolean;
}

const mapStateToProps = (state: AppState): StateProps => ({
  events: state.eventSelector.events,
  updateEventsInProgress: state.eventSelector.updateEventsInProgress,
});

const mapDispatchToProps = (dispatch: Dispatch<EventSelectorAction>): DispatchProps => bindActionCreators(
  {
    updateEventList,
  },
  dispatch,
);

export default connect<StateProps, DispatchProps, EventSelectorConnectedProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(EventSelector);
