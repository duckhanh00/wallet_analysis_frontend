// import React, { Fragment, useEffect, useState } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { WhaleSpaceActions } from "../../../redux/actions";
import "./style.scss";

function TokenDistribution(props) {
  const { WhaleSpace } = props
  useEffect(() => {
    props.getTokenDistribution('trava', 'bsc')
  }, [])

  let tokenDistribution = {
    "tokenAmount": [
      3193,
      97,
      24,
      7,
      5,
      2,
      1,
      1,
      1
    ],
    "tokenAmountNotContract": [
      2802,
      206,
      82,
      41,
      25,
      16,
      7,
      3,
      2
    ],
    "totalBalance": [
      2471,
      301,
      164,
      95,
      50,
      124,
      1,
      1,
      20
    ],
    "totalBalanceNotContract": [
      2033,
      380,
      191,
      143,
      133,
      69,
      134,
      12,
      89
    ]
  }
  if (WhaleSpace?.tokenDistribution) {
    tokenDistribution = WhaleSpace.tokenDistribution
  }
  const [variable, setValiable] = useState("total_balance");
  const [isContract, setIsContract] = useState("1");

  const handleVariable = (event) => {
    if (event.target.value === "total_balance") {
      setValiable("total_balance")
      handleDataChart("total_balance", isContract)
    } else {
      setValiable("token_amount");
      handleDataChart("token_amount", isContract)
    }
  }

  const handleIsContract = (event) => {
    if (event.target.value === "1") {
      setIsContract(event.target.value);
      handleDataChart(variable, "1")
    } else {
      setIsContract(event.target.value);
      handleDataChart(variable, "0")
    }
  };

  console.log(variable, isContract)
  const [subTitle, setSubTitle] = useState("Top 100 wallets");
  const handleSubTitle = (title) => {
    setSubTitle(title)
  }

  const [dataChart, setDataChart] = useState(tokenDistribution['totalBalance'])
  const handleDataChart = (_variable, _isContract) => {
    console.log(_variable, _isContract)
    if (_variable === "total_balance" && _isContract === "1") {
      setDataChart(tokenDistribution['totalBalance'])
    }
    else if (_variable === "total_balance" && _isContract === "0") {
      setDataChart(tokenDistribution['totalBalanceNotContract'])
    }
    else if (_variable === "token_amount" && _isContract === "1") {
      setDataChart(tokenDistribution['totalAmount'])
    }
    else if (_variable === "token_amount" && _isContract === "0") {
      setDataChart(tokenDistribution['totalAmountNotContract'])
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

  return (
    <Fragment>
      <div className="block-in-page">
        <div className="row">
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
                onChange={(e) => {
                  if (e.target.value === "total_balance" && isContract === "1") {
                    console.log("total_balance")
                    setDataChart(tokenDistribution['totalBalance'])
                    setValiable("total_balance")
                  }
                  else if (e.target.value === "total_balance" && isContract === "0") {
                    console.log("totalBalanceNotContract")
                    setDataChart(tokenDistribution['totalBalanceNotContract'])
                    setValiable("total_balance")
                  }
                  else if (e.target.value === "token_amount" && isContract === "1") {
                    console.log("tokenAmount")
                    setDataChart(tokenDistribution['tokenAmount'])
                    setValiable("token_amount")
                  }
                  else {
                    console.log("tokenAmountNotContract")
                    setDataChart(tokenDistribution['tokenAmountNotContract'])
                    setValiable("token_amount")
                  }
                }}
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
                onChange={(e) => {
                  if (variable === "total_balance" && e.target.value === "1") {
                    console.log("total_balance")
                    setDataChart(tokenDistribution['totalBalance'])
                    setIsContract("1")
                  }
                  else if (variable === "total_balance" && e.target.value === "0") {
                    console.log("totalBalanceNotContract")
                    setDataChart(tokenDistribution['totalBalanceNotContract'])
                    setIsContract("0")
                  }
                  else if (variable === "token_amount" && e.target.value === "1") {
                    console.log("tokenAmount")
                    setDataChart(tokenDistribution['tokenAmount'])
                    setIsContract("1")
                  }
                  else {
                    console.log("tokenAmountNotContract")
                    setDataChart(tokenDistribution['tokenAmountNotContract'])
                    setIsContract("0")
                  }
                }}
              >
                <MenuItem value={"1"}>All</MenuItem>
                <MenuItem value={"0"}>Not Contract</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="action__chart">

          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </Fragment>
  );
}

function mapState(state) {
  const { WhaleSpace } = state;
  return { WhaleSpace };
}
const actions = {
  getTokenDistribution: WhaleSpaceActions.getTokenDistribution
};

export default connect(mapState, actions)(TokenDistribution);
