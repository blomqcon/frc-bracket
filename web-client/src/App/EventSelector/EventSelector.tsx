import * as React from 'react';

export interface EventSelectorProps {
  events: Event[];
  updateEventsInProgress: boolean;
  updateEventList(): void;
}

export const EventSelector: React.FunctionComponent<EventSelectorProps> = (props) => {
  // When this component is mounted we update the event list.
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    props.updateEventList();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */


  return (
    <h2>Pick an event (of {props.events.length}) to make a prediction!</h2>
  );
};

export default EventSelector;
