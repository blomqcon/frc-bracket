import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppState } from '../store';
import { EventSelector } from './EventSelector';
import { updateEventList } from './redux-state/commands';
import { Event } from '../../ApiClient/EventClient';

interface EventSelectorConnectedProps {
  // Nothing is currently passed in.
  // Once there is a hierarchy of reducers this will be used to plumb state.
}

interface DispatchProps {
  updateEventList(): void;
}

interface StateProps {
  events: Event[];
  updateEventsInProgress: boolean;
}

const mapStateToProps = (state: AppState, ownProps: EventSelectorConnectedProps): StateProps => ({
  events: state.eventSelector.events,
  updateEventsInProgress: state.eventSelector.updateEventsInProgress,
});

const mapDispatchToProps = (dispatch: any): DispatchProps => bindActionCreators(
  {
    updateEventList,
  },
  dispatch,
);

export default connect<StateProps, DispatchProps, EventSelectorConnectedProps, AppState>(
  mapStateToProps,
  mapDispatchToProps,
)(EventSelector);
