// import React, { Fragment, useEffect, useState } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import TopHoldersList from '../../top-holders-list/components/index.jsx'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "./style.scss";

function TokenDistribution(props) {

  const [variable, setValiable] = useState("total_balance");
  const handleVariable = (event) => {
    if (event.target.value === "total_balance") {
      setValiable("total_balance")
      handleDataChart("total_balance", isContract)
    } else {
      setValiable("token_amount");
      handleDataChart("token_amount", isContract)
    }
  }

  const [isContract, setIsContract] = useState("1");
  const handleIsContract = (event) => {
    if (event.target.value === "1") {
      setIsContract(event.target.value);
      handleDataChart(variable, "1")
    } else {
      setIsContract(event.target.value);
      handleDataChart(variable, "0")
    }
  };

  const [subTitle, setSubTitle] = useState("Top 100 wallets");
  const handleSubTitle = (title) => {
    setSubTitle(title)
  }

  const total_balance_1_1 = [2768, 260, 177, 1, 21, 2, 43]
  const total_balance_1_0 = [2768, 260, 177, 100, 60, 20, 1,2]
  const token_amount_1_1 = [2768, 260, 177, 1, 21, 4, 43, 10,3]
  const token_amount_1_0 = [2768, 260, 177, 1, 21, 5, 43, 1]

  const [dataChart, setDataChart] = useState(total_balance_1_1)
  const handleDataChart = (_variable, _isContract) => {
    console.log(_variable, _isContract)
    if (_variable === "total_balance" && _isContract === "1") {
      setDataChart(total_balance_1_1)
    }
    else if (_variable === "total_balance" && _isContract === "0") {
      setDataChart(total_balance_1_0)
    }
    else if (_variable === "token_amount" && _isContract === "1") {
      setDataChart(token_amount_1_1)
    }
    else if (_variable === "token_amount" && _isContract === "0") {
      setDataChart(token_amount_1_0)
    }
  }

  let options = {
    chart: {
      type: 'area',
      backgroundColor: "#17171a",
    },
    title: {
      text: 'Token distribution',
      style: { color: "#a1a7bb", fontSize: "18px" }
    },
    credits: {
      enabled: false
    },
    subtitle: {
      text: subTitle
    },
    xAxis: {
      categories: [],
      title: {
        enabled: false
      }
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
    tooltip: {
      split: true
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        }
      }
    },
    series: [{
      name: 'Number of holders',
      data: dataChart
    }]
  };

  const t = [2768, 260, 177, 1, 21, 61, 43]
  const t1 = [2734, 315, 145, 36]
  const t2 = [3278, 41, 7, 3, 1, 1]
  const t3 = [3199, 28, 3]


  return (
    <Fragment>
      <div className="block-in-page">
        <div className="action__chart">
          <div className="action__1">
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small"></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={variable}
                label="Variable"
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                sx={{ color: "#a1a7ac", backgroundColor: "#1e1f22" }}
                onChange={handleVariable}
              >
                <MenuItem value={"total_balance"}>Total balance</MenuItem>
                <MenuItem value={"token_amount"}>Token amount</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 140 }} size="small">
              <InputLabel id="demo-select-small"></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={isContract}
                label="Addresses"
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                sx={{ color: "#a1a7ac", backgroundColor: "#1e1f22" }}
                onChange={handleIsContract}
              >
                <MenuItem value={"1"}>All</MenuItem>
                <MenuItem value={"0"}>Not Contract</MenuItem>
              </Select>
            </FormControl>
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
const actions = {};

export default connect(mapState, actions)(TokenDistribution);
