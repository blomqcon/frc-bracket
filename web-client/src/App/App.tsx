import * as React from "react";
import "./App.css";
import { Header } from "./Header/Header";
import { EventSelector } from "./EventSelector/EventSelector";

export const App = () => {
  return (
    <div>
      <Header />
      <EventSelector />
    </div>
  );
};
