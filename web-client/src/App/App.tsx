import * as React from "react";
import "./App.css";
import { Header } from "./Header/Header";
import EventSelectorConnected from "./EventSelector/EventSelectorConnected";

export const App = () => {
  return (
    <div>
      <Header />
      <EventSelectorConnected />
    </div>
  );
};
