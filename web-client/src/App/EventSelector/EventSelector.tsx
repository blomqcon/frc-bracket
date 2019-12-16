import * as React from "react";
import { useEffect } from "react";
import { EventClient } from "../../ApiClient/EventClient";

export const EventSelector = () => {

  const eventClient = new EventClient();

  useEffect(() => {
    // KLUDGE: Async wrapper until I add have redux
    (async () => {
      const events = await eventClient.getEvents();
      console.log(events.length);
    })();
  });

  return (
    <h2>Pick an event to make a prediction!</h2>
  );
};
