import * as React from 'react';
import { useEffect } from 'react';

export interface EventSelectorProps {
  events: Event[];
  updateEventsInProgress: boolean;
  updateEventList(): void;
}

export const EventSelector = (props: EventSelectorProps) => {
  useEffect(() => {
    // When this component is mounted we update the event list.
    props.updateEventList();
  }, [props]);

  return (
    <h2>
Pick an event (of
      {props.events.length}
) to make a prediction!
    </h2>
  );
};
