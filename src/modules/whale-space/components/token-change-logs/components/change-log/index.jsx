import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from 'highcharts/highstock'
import {
  ReactHighstock,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  AreaSplineSeries,
  SplineSeries,
  Navigator,
  RangeSelector,
  Tooltip,
} from 'react-jsx-highstock'
import WalletTable from "..";
import {
  Grid,
  ButtonGroup,
  Card,
  Button,
  Box,
  ListItem,
} from "@material-ui/core";

import "./style.scss";

import data_7_days from "../../../totalHoldersData/data_7_days.json";
import data_30_days from "../../../totalHoldersData/data_30_days.json";
import data_90_days from "../../../totalHoldersData/data_90_days.json";

function TokenChangeLogs(props) {
  const [rangeTime, setRangeTime] = useState("7d");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (rangeTime === "7d") {
      const total_holders = data_7_days;
      setData(data_7_days);
    } else if (rangeTime === "1m") {
      const total_holders = data_30_days;
      setData(data_30_days);
    } else {
      const total_holders = data_90_days;
      setData(data_90_days);
    }
  }, [rangeTime]);

  const handleRangeTime = (_rangeTime) => {
    setRangeTime(_rangeTime);
  };



  const [typeChart, setTypeChart] = useState("top_100_wallets");
  const handleType = (type) => {
    setTypeChart(type);
    handleSubTitle(type);
  };

  const [subTitle, setSubTitle] = useState('Top 100 wallets with the largest balance');
  const handleSubTitle = (typeChart) => {
    if (typeChart === 'top_100_wallets') {
      setSubTitle('Top 100 wallets with the largest balance')
    }
    else {
      setSubTitle('Wallet')
    }
  }

  let options = {
    chart: {
      backgroundColor: "#17171a",
      height: 550,
      width: 960
    },
    rangeSelector: {
      selected: 1
    },

    title: {
      text: 'Token change logs',
      style: { color: "#a1a7bb", fontSize: "18px" },
    },
    subtitle: {
      text: subTitle
    },
    // xAxis: {
    //   categories: data["label"],
    //   labels: {
    //     style: {
    //       color: "#a1a7ac",
    //     },
    //   },
    // },
    credits: {
      enabled: false
    },
    yAxis: {
      // min: 0,
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
    navigator: {
      enabled: false
    },
    series: [{
      name: 'Token amount',
      data: [[1653955200, 4154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]],
      tooltip: {
        valueDecimals: 2
      }
    }]
  }


  let rangeTimes = {
    "7d": "7d",
    "1m": "1m",
    "3m": "3m",
  };

  return (
    <Fragment>
      <div className="block-in-page">
        <div className="row">
          <div className="col">
            <div className="action__1">
              <div className="action">
                <div className={
                  "action__btn " + (typeChart === "top_100_wallets" ? "active" : "")
                }
                  onClick={() => handleType("top_100_wallets")}>Top 100 Wallets</div>
                <div className={
                  "action__btn " + (typeChart === "wallet" ? "active" : "")
                }
                  onClick={() => handleType("wallet")}>Wallet</div>
              </div>
{/* 
              <div className="date">
                <div className={
                  "date__btn " + (rangeTime === rangeTimes["1m"] ? "active" : "")
                }
                  onClick={() => handleRangeTime(rangeTimes["1m"])}>1M</div>
                <div className={
                  "date__btn " + (rangeTime === rangeTimes["3m"] ? "active" : "")
                }
                  onClick={() => handleRangeTime(rangeTimes["3m"])}>3M</div>
              </div> */}
            </div>
            <ReactHighstock  config={options} />
          </div>
          <div className="col wallet-table">
            <WalletTable />
          </div>
        </div>

      </div>

    </Fragment>
  );
}

function mapState(state) {
  // const { WalletType } = state;
  // return { WalletType };
}
const actions = {
  // getCloseRelationEdges: RelationGraphActions.getCloseRelationEdges,
  // getCloseRelationNodes: RelationGraphActions.getCloseRelationNodes
};

export default connect(mapState, actions)(TokenChangeLogs);
