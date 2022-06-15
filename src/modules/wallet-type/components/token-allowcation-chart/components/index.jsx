import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import { Grid, Card, Button, Box } from "@material-ui/core";

import data_7_days from "../../tokenAllocationData/data_7_days.json";
import data_30_days from "../../tokenAllocationData/data_30_days.json";
import data_90_days from "../../tokenAllocationData/data_90_days.json";
import "./style.scss";


function TokenAllocationChart(props) {
  const [rangeTime, setRangeTime] = useState("7d");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (rangeTime === "7d") {
      setData(data_7_days);
    } else if (rangeTime === "1m") {
      setData(data_30_days);
    } else {
      setData(data_90_days);
    }
  }, [rangeTime]);

  const handleRangeTime = (_rangeTime) => {
    setRangeTime(_rangeTime);
  };

  const [typeChart, setTypeChart] = useState("column");

  const handleType = (type) => {
    if (type === "column") {
      setTypeChart(type);
    } else {
      setTypeChart("line");
    }
  };

  let options = {
    chart: {
      type: typeChart,
      backgroundColor: "#17171a"
    },
    title: {
      text: "Token ownership allocation",
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

    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> <br/>',
      shared: true,
    },
    plotOptions: {
      column: {
        stacking: "percent",
        borderWidth: 0,
      },
    },
    legend: {
      itemStyle: { color: "#a1a7bb" },
      itemHoverStyle: { color: "#fff" },
    },
    colors: ["#6f42c1", "#3366ff", "#1491a5", "#00cccc"],
    series: data["series"],
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
                onClick={() => handleType("column")}>percent</div>
              <div className={
                  "action__btn " + (typeChart === "line" ? "active" : "")
                }
                onClick={() => handleType("line")}>number</div>
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

export default connect(mapState, actions)(TokenAllocationChart);
