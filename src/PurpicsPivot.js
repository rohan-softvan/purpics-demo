import React, { useEffect, useRef, useState } from "react";
import Highcharts from "highcharts";
import * as WebDataRocksReact from "react-webdatarocks";
import "webdatarocks/webdatarocks.highcharts";
import { DataJson } from "./DataJson";
import { DataJson2 } from "./DataJson2";
import DragDropComponent from "./DragDropComponent";

let count = 0;

const PurpicsPivot = () => {
  const [data, setData] = useState(DataJson);
  const [config, setConfig] = useState({ type: "column", title: 'My Graph Title', height: 400, reflow: true })
  const [metaData, setMetaData] = useState({ totalRows: null, totalColumns: null })
  const [newTitle, setNewTitle] = useState("");
  const [display, setDisplay] = useState(true);
  const [selectedItems, setSelectedItems] = useState({ rows: [], columns: [] });
  const [rows, setRows] = useState([
    {
      uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
      sort: "asc"
    }
    // {
    //   "uniqueName": "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
    //   "sort": "asc"
    // },
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
      aggregation: "sum",
    },
    // {
    //   uniqueName: "Q8 Do you have a meal plan for on-campus dining?",
    //   aggregation: "sum",
    // },
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
    console.log(">>>>>", myRef.webdatarocks.getReport());
  };


  const createChart = () => {
    myRef.webdatarocks.highcharts.getData(
      {
        type: config.type,
      },

      function (data) {
        console.log("data", data);
        // data.chart.height = config.height
        data.chart.backgroundColor = '#ccc'
        data.chart.borderColor = '#EBBA95';
        data.chart.borderRadius = 20;
        data.chart.borderWidth = 2
        data.chart.reflow = config.reflow
        data.title = {
          text: config.title,
          style: {
            color: "#000",
            fontWeight: "bold",
            // fontFamily: 'Roboto',
            // fontFamily: 'Rubik',
            // fontFamily: 'Roboto slab',
            // fontFamily: 'Script MT',
          }
        };
        data.credits = {
          enabled: false
        };
        data.credits = {
          enabled: false
        };
        Highcharts.chart("highchartsContainer", data);
      },
      function (data) {
        Highcharts.chart("highchartsContainer", data);
        // Highcharts.reflow();
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
    // tableSizes: {
    //   columns: [
    //     {
    //       idx: 0,
    //       width: 200
    //     },
    //     {
    //       idx: 1,
    //       width: 100
    //     },
    //     {
    //       idx: 2,
    //       width: 100
    //     },
    //     {
    //       idx: 3,
    //       width: 100
    //     },
    //     {
    //       idx: 4,
    //       width: 100
    //     },
    //     {
    //       idx: 5,
    //       width: 100
    //     },
    //     {
    //       idx: 6,
    //       width: 100
    //     },
    //     {
    //       idx: 7,
    //       width: 100
    //     },
    //     {
    //       idx: 8,
    //       width: 100
    //     },
    //     {
    //       idx: 9,
    //       width: 100
    //     },
    //     {
    //       idx: 10,
    //       width: 100
    //     },
    //     {
    //       idx: 11,
    //       width: 100
    //     },
    //     {
    //       idx: 12,
    //       width: 100
    //     }
    //   ]
    // },

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
        type: "compact",
        title: "",
        showFilter: true,
        showHeaders: false,
        showTotals: true,
        showGrandTotals: "on",
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
        uniqueName: "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?",
        sort: "asc",
        aggregation: 'sum',
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
        uniqueName: "Q6 We would like to learn a little bit more about how you structure meal time between home, work and school. Which of these best describes you?", sort: "asc",
      }
    ]);
  };

  const calculateDynamicHeight = () => {
    let finalHeight = (metaData.totalRows + 1) * 30 + 2 + 70 + "px";
    let wdrGridView = document.getElementById("wdr-grid-view");
    if (wdrGridView) document.getElementById("wdr-grid-view").style.height = finalHeight
    let wdrPivotView = document.getElementById("wdr-pivot-view");
    if (wdrPivotView) document.getElementById("wdr-pivot-view").style.height = finalHeight
    wdrPivotView.parentElement.style.height = finalHeight
  }

  const calculateDynamicWidth = () => {
    let finalWidth = (metaData.totalColumns + 1) * 113.2 + metaData.totalColumns + 3.5;
    const pivotTable = document.querySelector(".wdr-ui-element")
    pivotTable.style.width = finalWidth + "px";
    calculateDynamicHeight()
  }

  const handleChartChange = (type) => {
    console.log("type: ", type)
    config.type = type
    setConfig({ ...config })
    createChart()
  }

  const handleNewTtileChange = (e) => {
    setNewTitle(e.target.value);
  }

  const handleTitleSave = () => {
    config.title = newTitle;
    setConfig({ ...config })
    createChart()
  }
  const handleResize = () => {
    console.log("Checked Resieze Event")
    // this.chart.reflow();
    document.getElementById('#highchartsContainer').chart.reflow()
  }
  useEffect(() => {
    console.log("in use effect");
    setDisplay(false);
    setTimeout(() => {
      setMetaData({ totalRows: null, totalColumns: null })
      setDisplay(true);
    }, 50);
  }, [rows, columns, measures]);


  useEffect(() => {

  }, [])

  return (
    // style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}
    display && <div>
      <div >
        <div className="pivotTable">
          <div style={{ width: '500px !important', minWidth: '700px' }}>
            <WebDataRocksReact.Pivot
              ref={(elem) => {
                myRef = elem;
              }}
              width={"100%"}
              height={"100%"}
              toolbar={true}
              report={report}
              reportcomplete={() => {
                reportComplete();
                createChart();
                calculateDynamicWidth();
              }}
              customizeCell={(cellBuilder, cellData) => {
                if (cellData.columnIndex > metaData.totalColumns) metaData.totalColumns = cellData.columnIndex;
                if (cellData.rowIndex > metaData.totalRows) metaData.totalRows = cellData.rowIndex;
              }}
              reportchange={calculateDynamicWidth}
              aftergriddraw={() => {
                const grandTotalCell = document.getElementsByClassName(
                  "wdr-header wdr-header-c wdr-grand-total"
                )[0];
                if (grandTotalCell) grandTotalCell.innerHTML = "Total";
                calculateDynamicWidth()
                calculateDynamicHeight()
                // handleResize()
              }}
            />
          </div>
        </div>
        <div className="charResize" onMouseUpCapture={() => {
          console.log('reflow==>');
          Highcharts.charts.forEach(function (chart, index) {
            if (chart) {
              if (chart.renderTo.id === 'highchartsContainer') {
                // chart.exporting.filename='custom-file-name';
                // chosenChart = chart;
                chart.reflow();
              }
            }
          });
        }}>
          <div id="highchartsContainer" />
        </div>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => handleChartChange('bar')} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '5px 5px 0px', borderRadius: '5px', cursor: 'pointer' }}>Bar Chart</button>
        <button onClick={() => handleChartChange('pie')} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '5px 5px 0px', borderRadius: '5px', cursor: 'pointer' }}>Pie Chart</button>
        <button onClick={() => handleChartChange('area')} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '5px 5px 0px', borderRadius: '5px', cursor: 'pointer' }}>Area Chart</button>
        <button onClick={() => handleChartChange('line')} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '5px 5px 0px', borderRadius: '5px', cursor: 'pointer' }}>Line Chart</button>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 15px 0px 0px' }}>
          Title: <input value={newTitle} onChange={handleNewTtileChange} style={{ height: '30px', border: '1px solid #000', borderRadius: '5px' }} /> <button onClick={
            handleTitleSave} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '0px 5px 0px', borderRadius: '5px', padding: '10px', cursor: 'pointer' }}>Submit</button>
        </div>
        <button onClick={handleChangeData} style={{ background: '#12988A', color: '#fff', border: '0px', margin: '5px 5px 0px', borderRadius: '5px', cursor: 'pointer' }}>Append New Data</button>
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          onChange={handleOnChange}
          value={"Q1: Some Question Q1"}
        />{" "}
        Q1: Some Question Q1 <br />
        <input
          type="checkbox"
          onChange={handleOnChange}
          value={"Q2: Some Question Q2"}
        />{" "}
        Q2: Some Question Q2 <br />
        <input
          type="checkbox"
          onChange={handleOnChange}
          value={"Q3: Some Question Q3"}
        />{" "}
        Q3: Some Question Q3 <br />
        <br />
        <DragDropComponent selectedItems={selectedItems} />
      </div>

    </div>

  );
};

export default PurpicsPivot;
