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

import "./style.scss";

import data_7_days from "../../totalHoldersData/data_7_days.json";
import data_30_days from "../../totalHoldersData/data_30_days.json";
import data_90_days from "../../totalHoldersData/data_90_days.json";

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
    chart: {
      backgroundColor: "#17171a"
    },
    title: {
      text: "Total holders chart",
      style: { color: "#a1a7bb", fontSize: "18px" },
    },
    xAxis: {
      categories: data["label"],
      labels: {
        style: {
          color: "#a1a7ac",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      style: {
        color: "#a1a7bb",
      },
      tickAmount: 7,
      gridLineColor: "#323546",
      labels: {
        style: {
          color: "#a1a7ac",
        },
      },
    },
    labels: {
    
    },
    colors: ["#6f42c1", "#3366ff", "#1491a5", "#00cccc", "orange"],
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
          fillColor: "#17171a",
        },
      }
    ],
  };
  

  let rangeTimes = {
    "7d": "7d",
    "1m": "1m",
    "3m": "3m",
  };

  return (
    <Fragment>
      <div className="block-in-page">
        <div className="action__chart">
          <div className="action__1">
            <div className="action">
              <div  className={
                  "action__btn " + (typeChart === "column" ? "active" : "")
                }
                onClick={() => handleType("column")}>Price</div>
              <div className={
                  "action__btn " + (typeChart === "line" ? "active" : "")
                }
                onClick={() => handleType("line")}>Market Cap</div>
            </div>

            <div className="date">
              <div className="date__btn">1D</div>
              <div className={
                  "date__btn " + (rangeTime === rangeTimes["7d"] ? "active" : "")
                }
                onClick={() => handleRangeTime(rangeTimes["7d"])}>7D</div>
              <div className={
                  "date__btn " + (rangeTime === rangeTimes["1m"] ? "active" : "")
                }
                onClick={() => handleRangeTime(rangeTimes["1m"])}>1M</div>
              <div className={
                  "date__btn " + (rangeTime === rangeTimes["3m"] ? "active" : "")
                }
                onClick={() => handleRangeTime(rangeTimes["3m"])}>3M</div>
              <div className="date__btn">1Y</div>
            </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
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
