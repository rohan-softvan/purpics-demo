import React, { Fragment } from "react";
import "webdatarocks/webdatarocks.highcharts";
import "./App.css";
import CustomColorPicker from "./CustomColorPicker";
import PurpicsPivot from "./PurpicsPivot";
import ExamplePivot from "./ExamplePivot";

export class App extends React.Component {
  render() {
    return (
      <Fragment>
        {/*<ExamplePivot />*/}
        <PurpicsPivot />
        {/*<CustomColorPicker/>*/}
      </Fragment>
    );
  }
}

export default App;
