import * as React from "react";
import "./App.css";

export class App extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);

  }
  public componentDidMount() {

  }

  public render(): React.ReactNode {
    return (
      <h1>Hello World!</h1>
    );
  }
}
