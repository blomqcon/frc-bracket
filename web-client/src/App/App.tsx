import * as React from 'react';
import './App.css';
import { Header } from './Header/Header';
import EventSelectorConnected from './EventSelector/EventSelectorConnected';

export const App: React.FunctionComponent<{}> = () => (
  <div>
    <Header />
    <EventSelectorConnected />
  </div>
);

export default App;
