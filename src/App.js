import React, { Fragment } from "react";
import "webdatarocks/webdatarocks.highcharts";
import "./App.css";
import CustomColorPicker from "./CustomColorPicker";
import PurpicsPivot from "./PurpicsPivot";

export class App extends React.Component {
  render() {
    return (
      <Fragment>
        {/*<PurpicsPivot />*/}
        <CustomColorPicker/>
      </Fragment>
    );
  }
}

export default App;
