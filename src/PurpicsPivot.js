import React, {useEffect, useRef, useState} from "react";
import Highcharts from "highcharts";
import * as WebDataRocksReact from "react-webdatarocks";
import "webdatarocks/webdatarocks.highcharts";
import {DataJson} from "./DataJson";
import {DataJson2} from "./DataJson2";

const PurpicsPivot = () => {
  const [data, setData] = useState(DataJson);
  const [display, setDisplay] = useState(true);
  const [rows, setRows] = useState([
    {
      uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
      sort: "asc",
    },
    // {
    //   "uniqueName": "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
    //   "sort": "asc"
    // },
  ]);
  const [columns, setColumns] = useState([
    {
      uniqueName:
        "Q20 Would you be interested in ordering from a food locker like this?",
      sort: "asc",
    },
  ]);
  const [measures, setMeasures] = useState([
    {
      uniqueName:
        "Q20 Would you be interested in ordering from a food locker like this?",
      aggregation: "sum",
    },
    {
      uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
      aggregation: "sum",
    },
    // {
    //   "uniqueName": "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
    //   "aggregation": "sum"
    // },
  ]);

  let myRef = useRef();

  const reportComplete = () => {
    console.log(">>>>>", myRef.webdatarocks.getReport());
  };

  const createChart = () => {
    myRef.webdatarocks.highcharts.getData(
      {
        type: "column",
      },
      function (data) {
        console.log("data", data);
        data.title = {
          text: "test",
          style: {
            color: "#FF00FF",
            fontWeight: "bold",
          },
        };
        Highcharts.chart("highchartsContainer", data);
      },
      function (data) {
        Highcharts.chart("highchartsContainer", data);
      }
    );
  };

  const report = {
    dataSource: {
      data: data,
    },
    slice: {
      rows: rows,
      columns: columns,
      measures: measures,
      expands: {
        expandAll: false,
        // "rows": [
        //   {
        //     "tuple": [
        //       "Destination.France"
        //     ]
        //   }
        // ],
        // "columns": [
        //   {
        //     "tuple": [
        //       "Category.Accessories"
        //     ]
        //   }
        // ]
      },
      drills: {
        drillAll: false,
      },
    },
    options: {
      grid: {
        type: "compact",
        title: "",
        showFilter: true,
        showHeaders: true,
        showTotals: true,
        showGrandTotals: "on",
        showHierarchies: true,
        showHierarchyCaptions: true,
        showReportFiltersArea: true,
      },
      configuratorActive: false,
      configuratorButton: true,
      showAggregations: true,
      showCalculatedValuesButton: true,
      drillThrough: true,
      showDrillThroughConfigurator: true,
      sorting: "on",
      datePattern: "dd/MM/yyyy",
      dateTimePattern: "dd/MM/yyyy HH:mm:ss",
      saveAllFormats: false,
      showDefaultSlice: true,
      defaultHierarchySortName: "asc",
    },
    formats: [
      {
        name: "",
        thousandsSeparator: " ",
        decimalSeparator: ".",
        decimalPlaces: 2,
        maxSymbols: 20,
        currencySymbol: "",
        currencySymbolAlign: "left",
        nullValue: " ",
        infinityValue: "Infinity",
        divideByZeroValue: "Infinity",
      },
    ],
  };

  const handleChangeData = () => {
    console.log("changed data");
    setData(DataJson2);
    setMeasures([
      {
        uniqueName:
          "Q11 Please explain why you would probably not or not be interested in ordering from a food locker like this.",
        aggregation: "sum",
      },
      {
        uniqueName: "Q14 Click to write the question text",
        aggregation: "sum",
      },
    ]);
    setRows([
      {
        uniqueName: "Q14 Click to write the question text",
        sort: "asc",
      },
    ]);
    setColumns([
      {
        uniqueName:
          "Q11 Please explain why you would probably not or not be interested in ordering from a food locker like this.Q20 Would you be interested in ordering from a food locker like this?",
        sort: "asc",
      },
    ]);
  };

  useEffect(() => {
    console.log("in use effect");
    setDisplay(false);
    setTimeout(() => {
      setDisplay(true);
    }, 50);
  }, [rows, columns, measures]);

  return (
    <div>
      <button onClick={handleChangeData}>Change data and refresh</button>
      {display && (
        <WebDataRocksReact.Pivot
          ref={(elem) => {
            myRef = elem;
          }}
          toolbar={true}
          report={report}
          reportcomplete={() => {
            reportComplete();
            createChart();
          }}
        />
      )}
      <div id="highchartsContainer" />
    </div>
  );
};

export default PurpicsPivot;
