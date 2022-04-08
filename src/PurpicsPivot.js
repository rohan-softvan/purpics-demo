import React, { useRef } from "react";
import Highcharts from "highcharts";
import * as WebDataRocksReact from "react-webdatarocks";
import "webdatarocks/webdatarocks.highcharts";
import { DataJson } from "./DataJson.json";

const report = {
  dataSource: {
    data: DataJson,
  },
  slice: {
    rows: [
      {
        uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
        sort: "asc",
      },
      // {
      //   "uniqueName": "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
      //   "sort": "asc"
      // },
    ],
    columns: [
      {
        uniqueName:
          "Q20 Would you be interested in ordering from a food locker like this?",
        sort: "asc",
      },
    ],
    measures: [
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
    ],
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

const PurpicsPivot = () => {
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
        const title = {
          text: "test",
          style: {
            color: "#FF00FF",
            fontWeight: "bold",
          },
        };
        data.title = title;
        Highcharts.chart("highchartsContainer", data);
      },
      function (data) {
        Highcharts.chart("highchartsContainer", data);
      }
    );
  };

  return (
    <div>
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
      <div id="highchartsContainer" />
    </div>
  );
};

export default PurpicsPivot;
