import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  Grid,
  ButtonGroup,
  Card,
  Button,
  Box,
  ListItem,
} from "@material-ui/core";
import "./coin.scss";

import data_7_days from "./totalHoldersData/data_7_days.json";
import data_30_days from "./totalHoldersData/data_30_days.json";
import data_90_days from "./totalHoldersData/data_90_days.json";

function TotalHoldersChart(props) {
  const [rangeTime, setRangeTime] = useState("7d");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (rangeTime === "7d") {
      const total_holders = data_7_days;
      // console.log("total_holders", total_holders)
      // total_holders['series'].map((item) => {
      //     item.push({'type' : "column"})
      // })
      console.log(data_7_days);
      setData(data_7_days);
    } else if (rangeTime === "1m") {
      const total_holders = data_30_days;
      // total_holders['series'].map((item) => {
      //     item.push({'type' : "column"})
      // })
      setData(data_30_days);
    } else {
      const total_holders = data_90_days;
      setData(data_90_days);
    }
  }, [rangeTime]);

  console.log(data["series"]);
  const handleRangeTime = (_rangeTime) => {
    setRangeTime(_rangeTime);
  };

  const [typeChart, setTypeChart] = useState("area");
  const handleType = (type) => {
    if (type === "area") {
      setTypeChart(type);
    } else {
      setTypeChart(type);
    }
  };
  let options = {
    title: {
      text: "Combination chart",
    },
    xAxis: {
      categories: ["30/5", "31/5", "1/6", "2/6", "3/6", "4/6", "5/6"],
    },
    labels: {
      items: [
        {
          html: "Average holders in time",
          style: {
            left: "50px",
            top: "18px",
            color:
              // theme
              (Highcharts.defaultOptions.title.style &&
                Highcharts.defaultOptions.title.style.color) ||
              "black",
          },
        },
      ],
    },
    series: [
      {
        type: "column",
        name: "Special wallet",
        data: [1, 3, 4, 7, 2, 1, 2],
      },
      {
        type: "column",
        name: "Large wallet",
        data: [20, 20, 30, 20, 10, 10, 14],
      },
      {
        type: "column",
        name: "Trading wallet",
        data: [30, 40, 20, 30, 20, 10, 15],
      },
      {
        type: "column",
        name: "Normal wallet",
        data: [100, 200, 200, 100, 100, 150, 200],
      },
      {
        type: "spline",
        name: "Average",
        data: [300, 500, 600, 505, 203, 700, 702],
        marker: {
          lineWidth: 2,
          lineColor: Highcharts.getOptions().colors[3],
          fillColor: "white",
        },
      },
      {
        type: "pie",
        name: "number of holders",
        data: [
          {
            name: "Special wallet",
            y: 1,
          },
          {
            name: "Large wallet",
            y: 23,
          },
          {
            name: "Trading wallet",
            y: 19,
          },
          {
            name: "Normal wallet",
            y: 19,
          },
        ],
        center: [100, 80],
        size: 100,
        showInLegend: false,
        dataLabels: {
          enabled: false,
        },
      },
    ],
  };

  let rangeTimes = {
    "7d": "7d",
    "1m": "1m",
    "3m": "3m",
  };

  return (
    <Fragment>
      {/* <div className="action__chart">
        <div className="action__1">
          <div className="action">
            <div
              className={
                "action__btn " + (typeChart === "column" ? "active" : "")
              }
              onClick={() => handleType("column")}
            >
              Price
            </div>
            <div
              className={
                "action__btn " + (typeChart === "line" ? "active" : "")
              }
              onClick={() => handleType("line")}
            >
              Market Cap
            </div>
          </div>

          <div className="date">
            <div
              className={
                "date__btn " + (rangeTime === rangeTimes["7d"] ? "active" : "")
              }
              onClick={() => handleRangeTime(rangeTimes["7d"])}
            >
              7D
            </div>
            <div
              className={
                "date__btn " + (rangeTime === rangeTimes["1m"] ? "active" : "")
              }
              onClick={() => handleRangeTime(rangeTimes["1m"])}
            >
              1M
            </div>
            <div
              className={
                "date__btn " + (rangeTime === rangeTimes["3m"] ? "active" : "")
              }
              onClick={() => handleRangeTime(rangeTimes["3m"])}
            >
              3M
            </div>
          </div>
        </div>
      </div>

      <HighchartsReact highcharts={Highcharts} options={options} /> */}
      <Grid item xs={12}>
        <Card className="card-box mb-4" style={{ padding: "10px" }}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between" }}
            style={{ padding: "0px 1%" }}
          >
            <Button
              color="primary"
              variant={typeChart == "column" ? "contained" : "text"}
              onClick={() => handleType("column")}
            >
              column
            </Button>
            <Button
              color="primary"
              variant={typeChart == "line" ? "contained" : "text"}
              onClick={() => handleType("line")}
            >
              line
            </Button>
            <div aria-label="button group">
              <Button
                color="primary"
                variant={rangeTime == rangeTimes["7d"] ? "contained" : "text"}
                onClick={() => handleRangeTime(rangeTimes["7d"])}
              >
                {rangeTimes["7d"].toUpperCase()}
              </Button>
              <Button
                color="primary"
                variant={rangeTime == rangeTimes["1m"] ? "contained" : "text"}
                onClick={() => handleRangeTime(rangeTimes["1m"])}
              >
                {rangeTimes["1m"].toUpperCase()}
              </Button>
              <Button
                color="primary"
                variant={rangeTime == rangeTimes["3m"] ? "contained" : "text"}
                onClick={() => handleRangeTime(rangeTimes["3m"])}
              >
                {rangeTimes["3m"].toUpperCase()}
              </Button>
            </div>
          </Box>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </Card>
      </Grid>
    </Fragment>
  );
}

function mapState(state) {
  const { WalletType } = state;
  return { WalletType };
}
const actions = {
  // getCloseRelationEdges: RelationGraphActions.getCloseRelationEdges,
  // getCloseRelationNodes: RelationGraphActions.getCloseRelationNodes
};

export default connect(mapState, actions)(TotalHoldersChart);
