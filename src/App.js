import React, { Fragment } from "react";
import "webdatarocks/webdatarocks.highcharts";
import PurpicsPivot from "./PurpicsPivot";
import "./App.css"
export class App extends React.Component {
  render() {
    return (
      <Fragment>
        <PurpicsPivot />
      </Fragment>
    );
  }
}

export default App;
