import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import highcharts3d from "highcharts/highcharts-3d";
import * as WebDataRocksReact from "react-webdatarocks";
import "webdatarocks/webdatarocks.highcharts";
import { DataJson } from "./DataJson";
import TabPanel from "./TabPanel";
import { makeStyles, Tab, Tabs } from "@material-ui/core";
import OptionsTab from "./OptionsTab";

highcharts3d(Highcharts);

let count = 0;

function customizeToolbar(toolbar) {
  var tabs = toolbar.getTabs(); // get all tabs from the toolbar
  toolbar.getTabs = function() {
    console.log("toolbar==>", tabs[4].handler, tabs[5].handler);
    delete tabs[0]; // delete the first tab
    return tabs;
  };
}

const PurpicsPivot = () => {
  const [value, setValue] = useState(0);
  const [optionsConfig, setOptionsConfig] = useState({
    grandTotal: "on",
    subTotals: "on",
    layout: "compact"
  });
  const [data, setData] = useState(DataJson);
  const [config, setConfig] = useState({
    type: "column",
    title: "My Graph Title",
    height: 400,
    reflow: true
  });
  const [metaData, setMetaData] = useState({
    totalRows: null,
    totalColumns: null
  });
  const [newTitle, setNewTitle] = useState("");
  const [display, setDisplay] = useState(true);
  const [selectedItems, setSelectedItems] = useState({ rows: [], columns: [] });
  const [rows, setRows] = useState([
    {
      uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
      sort: "asc"
    }
    // {
    //   uniqueName:
    //     "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
    //   sort: "asc"
    // }
  ]);
  const [columns, setColumns] = useState([
    {
      uniqueName:
        "Q20 Would you be interested in ordering from a food locker like this?",
      sort: "asc"
    }
  ]);
  const [measures, setMeasures] = useState([
    {
      uniqueName:
        "Q20 Would you be interested in ordering from a food locker like this?",
      aggregation: "count"
    }
    // {
    //
    //   uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
    //   aggregation: "count"
    // }
    // {
    //   "uniqueName": "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
    //   "aggregation": "sum"
    // },
  ]);

  let myRef = useRef();

  const handleOnChange = event => {
    const type = count % 2 === 0 ? "rows" : "columns";
    let random = Math.floor(Math.random() * 100 + 1);
    let object = { id: `item-${random}`, content: event.target.value };
    selectedItems[type].push(object);
    count++;
    setSelectedItems({ ...selectedItems });
  };

  const reportComplete = () => {
    // document.getElementsByClassName('wdr-ui-element wdr-ui wdr-fields-view-wrap')[0].classList.add("wdr-fields-opened")
    // document.getElementsByClassName('wdr-ui-element wdr-ui wdr-fields-view-wrap')[0].style.display='block'
    // let popper = document.getElementById("wdr-fields-view");
    // if(popper) document.getElementById("wdr-fields-view").style.display='block'
    // console.log(">>>>>");
    // myRef.webdatarocks.openFieldsList();
  };

  const handleTitleClick = event => {
    console.log("handleTitleClick invoked 😁");
  };

  const handleSubTitleClick = event => {
    console.log("handleSubTitleClick invoked 😄");
  };

  const handleAxisTitleClick = (event, axisType) => {
    console.log("handleAxisTitleClick invoked 😄", axisType);
  };

  const handleDataLabelClick = event => {
    console.log("handleDataLabelClick invoked 😄");
  };

  const getPlotOptionsForDonut = () => ({
    allowPointSelect: true,
    cursor: true,
    innerSize: "60%",
    dataLabels: {
      enabled: true
    }
  });

  const getPlotOptionsFor3dDonut = () => ({
    allowPointSelect: true,
    depth: 35,
    cursor: "pointer",
    innerSize: "60%"
  });

  const getPlotOptionsFor3dPie = () => ({
    allowPointSelect: true,
    depth: 35,
    cursor: "pointer"
  });

  const getPlotOptionsForSemicircleDonut = () => ({
    allowPointSelect: false,
    dataLabels: {
      distance: -30,
      style: {
        fontWeight: "bold",
        color: "white",
        textShadow: "0px 1px 2px black"
      }
    },
    innerSize: "50%",
    startAngle: -90,
    endAngle: 90,
    center: ["50%", "75%"]
  });

  const getStackingGraphConfig = graphType => {
    if (
      graphType === "stacked-percent-bar" ||
      graphType === "stacked-percent-column" ||
      graphType === "stacked-percent-area"
    )
      return "percent";
    else if (
      graphType === "stacked-bar" ||
      graphType === "stacked-column" ||
      graphType === "stacked-area"
    )
      return "normal";
    else return false;
  };

  const createChart = () => {
    let chartType;
    switch (config.type) {
      case "multicolor-bar":
      case "stacked-bar":
      case "stacked-percent-bar":
        chartType = "bar";
        break;

      case "donut":
      case "3d-pie":
      case "3d-donut":
      case "semi-circle-donut":
        chartType = "pie";
        break;

      case "multicolor-column":
      case "stacked-column":
      case "stacked-percent-column":
        chartType = "column";
        break;

      case "stacked-area":
      case "stacked-percent-area":
        chartType = "area";
        break;

      default:
        chartType = config.type;
    }
    // myRef.webdatarocks.getData(
    //   {
    //     slice: {
    //       rows: rows,
    //       columns: columns,
    //       measures: measures
    //     }
    //   },
    //   function(data) {
    //     console.log("data123", data);
    //   }
    // );
    myRef &&
      myRef.webdatarocks &&
      myRef.webdatarocks.highcharts.getData(
        {
          type: chartType
        },

        function(chartConfig) {
          console.log("graph config >>  data:: ", chartConfig);
          chartConfig.chart.height = config.height;
          chartConfig.chart.reflow = config.reflow;
          chartConfig.chart.events = {
            load: function() {
              console.log("loaded chart");
              document
                .getElementById("custom-title")
                .addEventListener("click", handleTitleClick);
              document
                .getElementById("custom-subtitle")
                .addEventListener("click", handleSubTitleClick);
              console.log("config.type: ", config.type);
              if (
                config.type !== "pie" &&
                config.type !== "donut" &&
                config.type !== "3d-pie" &&
                config.type !== "3d-donut" &&
                config.type !== "semi-circle-donut" &&
                document.getElementById("custom-x-axis-title") &&
                document.getElementById("custom-y-axis-title")
              ) {
                console.log("config.type in if");
                document
                  .getElementById("custom-x-axis-title")
                  .addEventListener("click", e => handleAxisTitleClick(e, "x"));
                document
                  .getElementById("custom-y-axis-title")
                  .addEventListener("click", e => handleAxisTitleClick(e, "y"));
              }
            },
            click: function() {
              console.log("chart clickedd");
            }
          };
          // data.chart.height = config.height
          chartConfig.chart.backgroundColor = "#fff";
          chartConfig.chart.borderColor = "#EBBA95";
          chartConfig.chart.borderRadius = 20;
          chartConfig.chart.borderWidth = 2;
          chartConfig.chart.reflow = config.reflow;
          if (config.type === "3d-pie" || config.type === "3d-donut") {
            chartConfig.chart.options3d = {
              enabled: true,
              alpha: 45,
              beta: 0
            };
            chartConfig.chart.polar = false;
          }
          console.log("data.chart: ", chartConfig.chart);
          chartConfig.title = {
            text: `<p style="color: red;cursor:pointer;" id="custom-title"> LOL </p>`,
            style: {
              color: "#000",
              fontWeight: "bold",
              fontFamily: "Roboto"
            }
          };
          chartConfig.subtitle = {
            text: `<p style="color: blue;cursor:pointer;" id="custom-subtitle"> LOL-subtitle </p>`,
            style: {
              color: "#000",
              fontWeight: "normal"
              // fontFamily: 'Roboto',
              // fontFamily: 'Rubik',
              // fontFamily: 'Roboto slab',
              // fontFamily: 'Script MT',
            }
          };
          chartConfig.credits = {
            enabled: false
          };
          chartConfig.tooltip = {
            enabled: true
          };
          chartConfig.xAxis.title.text = `<p style="cursor:pointer;" id="custom-x-axis-title"> ${chartConfig.xAxis.title.text} </p>`;
          if (
            chartConfig.yAxis &&
            chartConfig.yAxis[0] &&
            chartConfig.yAxis[0].title.text
          )
            chartConfig.yAxis[0].title.text = `<p style="cursor:pointer;" id="custom-y-axis-title"> ${chartConfig.yAxis[0].title.text} </p>`;

          let seriesData = chartConfig.series;
          seriesData.map(
            e =>
              (e.events = {
                legendItemClick: function() {
                  console.log("legendItemClick::: ", this);
                }
              })
          );
          chartConfig.series = seriesData;

          let plotOptions = {
            pie:
              config.type === "donut"
                ? getPlotOptionsForDonut()
                : config.type === "3d-donut"
                ? getPlotOptionsFor3dDonut()
                : config.type === "3d-pie"
                ? getPlotOptionsFor3dPie()
                : config.type === "semi-circle-donut"
                ? getPlotOptionsForSemicircleDonut()
                : {},

            series: {
              cursor: "pointer",
              stacking: getStackingGraphConfig(config.type),

              point: {
                events: {
                  click: function() {
                    console.log("seriesClick::: ", this);
                  }
                }
              },
              dataLabels: {
                enabled: true
              }
            }
          };

          if (
            config.type === "multicolor-bar" ||
            config.type === "multicolor-column"
          ) {
            plotOptions.series.colorByPoint = true;
          }

          chartConfig.plotOptions = plotOptions;
          console.log("graph final data: ", chartConfig);
          Highcharts.chart("highchartsContainer", chartConfig);
        },
        function(chartConfig) {
          Highcharts.chart("highchartsContainer", chartConfig);
        }
      );
  };

  const report = {
    dataSource: {
      data: data
    },

    tableSizes: {
      columns: [
        {
          idx: 0,
          width: 200
        },
        {
          idx: 1,
          width: 100
        },
        {
          idx: 2,
          width: 100
        },
        {
          idx: 3,
          width: 100
        },
        {
          idx: 4,
          width: 100
        },
        {
          idx: 5,
          width: 100
        },
        {
          idx: 6,
          width: 100
        },
        {
          idx: 7,
          width: 100
        },
        {
          idx: 8,
          width: 100
        },
        {
          idx: 9,
          width: 100
        },
        {
          idx: 10,
          width: 100
        },
        {
          idx: 11,
          width: 100
        },
        {
          idx: 12,
          width: 100
        }
      ]
    },
    slice: {
      rows: rows,
      columns: columns,
      measures: measures,
      expands: {
        expandAll: true
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
        drillAll: false
      }
    },
    options: {
      grid: {
        type: optionsConfig.layout,
        title: "",
        showFilter: true,
        showHeaders: false,
        showTotals: optionsConfig.subTotals,
        showGrandTotals: optionsConfig.grandTotal,
        showHierarchies: true,
        showHierarchyCaptions: true,
        showReportFiltersArea: true
      },
      configuratorActive: false,
      configuratorButton: false,
      showAggregations: true,
      showCalculatedValuesButton: true,
      drillThrough: true,
      showDrillThroughConfigurator: true,
      sorting: "false",
      datePattern: "dd/MM/yyyy",
      dateTimePattern: "dd/MM/yyyy HH:mm:ss",
      saveAllFormats: false,
      showDefaultSlice: true,
      defaultHierarchySortName: "asc"
    },
    formats: [
      {
        name: "",
        thousandsSeparator: " ",
        decimalSeparator: ".",
        decimalPlaces: 0,
        maxSymbols: 20,
        currencySymbol: "",
        currencySymbolAlign: "left",
        nullValue: " ",
        infinityValue: "Infinity",
        divideByZeroValue: "Infinity"
      }
    ]
  };

  const handleChangeData = () => {
    console.log("changed data");
    // setData(DataJson2);
    // setMeasures([
    //   {
    //     uniqueName:
    //       "Q11 Please explain why you would probably not or not be interested in ordering from a food locker like this.",
    //     aggregation: "sum",
    //   },
    //   {
    //     uniqueName: "Q14 Click to write the question text",
    //     aggregation: "sum",
    //   },
    // ]);
    // setRows([
    //   {
    //     uniqueName: "Q14 Click to write the question text",
    //     sort: "asc",
    //   },
    // ]);
    // setColumns([
    //   {
    //     uniqueName:
    //       "Q11 Please explain why you would probably not or not be interested in ordering from a food locker like this.Q20 Would you be interested in ordering from a food locker like this?",
    //     sort: "asc",
    //   },
    // ]);

    setData(DataJson);
    setMeasures([
      {
        uniqueName:
          "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
        sort: "asc",
        aggregation: "sum"
      }
    ]);
    setRows([
      {
        uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
        sort: "asc",
        aggregation: "sum"
      },
      {
        uniqueName:
          "Q20 Would you be interested in ordering from a food locker like this?",
        sort: "asc",
        aggregation: "sum"
      }
    ]);
    setRows([
      {
        uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
        sort: "asc"
      }
    ]);
    setColumns([
      {
        uniqueName:
          "Q20 Would you be interested in ordering from a food locker like this?",
        sort: "asc"
      },
      {
        uniqueName:
          "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
        sort: "asc"
      }
    ]);
  };

  const calculateDynamicHeight = () => {
    let finalHeight = (metaData.totalRows + 1) * 30 + 2 + 70 + "px";
    let wdrGridView = document.getElementById("wdr-grid-view");
    if (wdrGridView)
      document.getElementById("wdr-grid-view").style.height = finalHeight;
    let wdrPivotView = document.getElementById("wdr-pivot-view");
    if (wdrPivotView)
      document.getElementById("wdr-pivot-view").style.height = finalHeight;
    wdrPivotView.parentElement.style.height = finalHeight;
  };

  const applyButtonStyle = () => {
    // let applyButton = document.getElementsByClassName(
    //   "wdr-ui-element wdr-ui wdr-ui-btn wdr-ui-btn-dark"
    // );
    // console.log("applyButton ", applyButton);
    // applyButton[0] && applyButton[0].classList.add("wdr-ui-disabled");
  };

  const calculateDynamicWidth = () => {
    let finalWidth =
      (metaData.totalColumns + 1) * 113.2 + metaData.totalColumns + 3.5;
    const pivotTable = document.querySelector(".wdr-ui-element");
    pivotTable.style.width = finalWidth + "px";
    calculateDynamicHeight();
    applyButtonStyle();
  };

  const handleChartChange = type => {
    console.log("type ", type);
    if (type === "scatter") {
      setMeasures([
        {
          uniqueName:
            "Q20 Would you be interested in ordering from a food locker like this?",
          aggregation: "count"
        },
        {
          uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
          aggregation: "count"
        }
      ]);
    } else {
      setMeasures([
        {
          uniqueName:
            "Q20 Would you be interested in ordering from a food locker like this?",
          aggregation: "count"
        }
      ]);
    }

    config.type = type;
    setConfig({ ...config });
    createChart();
  };

  const handleNewTtileChange = e => {
    setNewTitle(e.target.value);
  };

  const handleTitleSave = () => {
    config.title = newTitle;
    setConfig({ ...config });
    createChart();
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper
    }
  }));

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderFieldsTab = () => {
    console.log("rendering renderFieldsTab...");
  };
  const handleResize = () => {
    console.log("Checked Resieze Event");
    // this.chart.reflow();
    document.getElementById("#highchartsContainer").chart.reflow();
  };

  const handleOptionsConfigChange = (type, value) => {
    console.log("type, value: ", type, value);
    optionsConfig[type] = value;
    setOptionsConfig({ ...optionsConfig });
  };

  useEffect(() => {
    console.log("in use effect");
    setDisplay(false);
    setTimeout(() => {
      setMetaData({ totalRows: null, totalColumns: null });
      setDisplay(true);
    }, 50);
  }, [rows, columns, measures, optionsConfig]);

  return (
    // style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}
    display && (
      <div>
        <div>
          <div className="pivotTable">
            <div>
              {/* <div style={{ width: '500px !important', minWidth: '700px' }}> */}
              <WebDataRocksReact.Pivot
                ref={elem => {
                  myRef = elem;
                }}
                beforetoolbarcreated={customizeToolbar}
                width={"100%"}
                height={"100%"}
                toolbar={true}
                report={report}
                reportcomplete={() => {
                  reportComplete();
                  createChart();
                  calculateDynamicWidth();
                  value === 0 &&
                    myRef &&
                    myRef.webdatarocks &&
                    myRef.webdatarocks.openFieldsList();
                }}
                customizeCell={(cellBuilder, cellData) => {
                  if (cellData.columnIndex > metaData.totalColumns)
                    metaData.totalColumns = cellData.columnIndex;
                  if (cellData.rowIndex > metaData.totalRows)
                    metaData.totalRows = cellData.rowIndex;
                }}
                reportchange={calculateDynamicWidth}
                aftergriddraw={() => {
                  const grandTotalCell = document.getElementsByClassName(
                    "wdr-header wdr-header-c wdr-grand-total"
                  )[0];
                  if (grandTotalCell) grandTotalCell.innerHTML = "Total";
                  calculateDynamicWidth();
                  calculateDynamicHeight();
                  // handleResize()
                }}
              />
            </div>
          </div>

          <div
            className="charResize"
            onMouseUpCapture={() => {
              Highcharts.charts.forEach(function(chart, index) {
                if (chart) {
                  if (chart.renderTo.id === "highchartsContainer") {
                    chart.reflow();
                  }
                }
              });
            }}
          >
            <div id="highchartsContainer" />
          </div>
        </div>
        <div className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Fields" {...a11yProps(0)} />
            <Tab label="Options" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}></TabPanel>
          <TabPanel value={value} index={1}>
            <OptionsTab
              handleChange={handleOptionsConfigChange}
              optionsConfig={optionsConfig}
            />
          </TabPanel>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={() => handleChartChange("bar")}
            style={{
              background: "#ff0000",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Basic bar
          </button>
          <button
            onClick={() => handleChartChange("multicolor-bar")}
            style={{
              background: "#ff0000",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Multi-color bar
          </button>
          <button
            onClick={() => handleChartChange("stacked-bar")}
            style={{
              background: "#ff0000",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked bar
          </button>
          <button
            onClick={() => handleChartChange("stacked-percent-bar")}
            style={{
              background: "#ff0000",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked percent bar
          </button>
          <button
            onClick={() => handleChartChange("pie")}
            style={{
              background: "#8414ff",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Pie Chart
          </button>
          <button
            onClick={() => handleChartChange("donut")}
            style={{
              background: "#8414ff",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Donut
          </button>{" "}
          <button
            onClick={() => handleChartChange("3d-pie")}
            style={{
              background: "#8414ff",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            3D Pie
          </button>
          <button
            onClick={() => handleChartChange("3d-donut")}
            style={{
              background: "#8414ff",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            3D Donut
          </button>
          <button
            onClick={() => handleChartChange("semi-circle-donut")}
            style={{
              background: "#8414ff",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Semi-circle donut
          </button>
          <button
            onClick={() => handleChartChange("column")}
            style={{
              background: "#8a6e00",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Basic column
          </button>
          <button
            onClick={() => handleChartChange("multicolor-column")}
            style={{
              background: "#8a6e00",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Multi-color column
          </button>
          <button
            onClick={() => handleChartChange("stacked-column")}
            style={{
              background: "#8a6e00",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked column
          </button>
          <button
            onClick={() => handleChartChange("stacked-percent-column")}
            style={{
              background: "#8a6e00",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked percent column
          </button>
          <button
            onClick={() => handleChartChange("line")}
            style={{
              background: "#030e50",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Line Chart
          </button>
          <button
            onClick={() => handleChartChange("scatter")}
            style={{
              background: "#030e50",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Scatter chart
          </button>
          <button
            onClick={() => handleChartChange("area")}
            style={{
              background: "#12988A",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Basic Area
          </button>
          <button
            onClick={() => handleChartChange("stacked-area")}
            style={{
              background: "#12988A",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked Area
          </button>
          <button
            onClick={() => handleChartChange("stacked-percent-area")}
            style={{
              background: "#12988A",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Stacked Percentage Area
          </button>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "5px 15px 0px 0px"
            }}
          >
            Title:{" "}
            <input
              value={newTitle}
              onChange={handleNewTtileChange}
              style={{
                height: "30px",
                border: "1px solid #000",
                borderRadius: "5px"
              }}
            />{" "}
            <button
              onClick={handleTitleSave}
              style={{
                background: "#12988A",
                color: "#fff",
                border: "0px",
                margin: "0px 5px 0px",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer"
              }}
            >
              Submit
            </button>
          </div>
          <button
            onClick={handleChangeData}
            style={{
              background: "#12988A",
              color: "#fff",
              border: "0px",
              margin: "5px 5px 0px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Append New Data
          </button>
        </div>
      </div>
    )
  );
};

export default PurpicsPivot;
