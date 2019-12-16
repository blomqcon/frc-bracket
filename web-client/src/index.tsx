import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { App } from "./App/App";
import { configureStore } from "./App/store";

const store = configureStore();

render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById("app-root"),
);
