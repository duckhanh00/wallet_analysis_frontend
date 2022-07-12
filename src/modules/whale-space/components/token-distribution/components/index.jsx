// import React, { Fragment, useEffect, useState } from "react";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";

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
  const [isContract, setIsContract] = useState("1");

  const handleIsContract = (event) => {
    if (event.target.value === "1") {
      setIsContract(event.target.value);
      handleDataAmountChart("1")
      handleDataBalanceChart("1")
    } else {
      setIsContract(event.target.value);
      handleDataAmountChart ("0")
      handleDataBalanceChart("0")
    }
  };

  const [subTitle, setSubTitle] = useState("Top 100 wallets");
  const handleSubTitle = (title) => {
    setSubTitle(title)
  }

  const [dataAmountChart, setDataAmountChart] = useState(tokenDistribution['tokenAmount'])
  const [dataBalanceChart, setDataBalanceChart] = useState(tokenDistribution['totalBalance'])
  const handleDataBalanceChart = (_isContract) => {
    if (_isContract === "1") {
      setDataBalanceChart(tokenDistribution['totalBalance'])
    }
    else {
      setDataBalanceChart(tokenDistribution['totalBalanceNotContract'])
    }
  }

  const handleDataAmountChart = (_isContract) => {
    if (_isContract === "1") {
      setDataAmountChart(tokenDistribution['totalAmount'])
    }
    else {
      setDataAmountChart(tokenDistribution['totalAmountNotContract'])
    }
  }

  let amountOptions = {
    chart: {
      type: 'area',
      backgroundColor: "#17171a",
    },
    title: {
      text: 'Token amount distribution',
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
      data: dataAmountChart
    }]
  };

  let balanceOptions = {
    chart: {
      type: 'area',
      backgroundColor: "#17171a",
    },
    title: {
      text: 'Token blance distribution',
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
      data: dataBalanceChart
    }]
  };
  

  return (
    <Fragment>
      <div className="block-in-page">
        <div className="row">
          <Box className="action__chart" sx={{padding: "10px 0"}}>
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
                  if (e.target.value === "1") {
                    console.log("tokenAmount")
                    setDataAmountChart(tokenDistribution['tokenAmount'])
                    setDataBalanceChart(tokenDistribution['totalBalance'])
                    setIsContract("1")
                  }
                  else {
                    console.log("tokenAmountNotContract")
                    setDataAmountChart(tokenDistribution['tokenAmountNotContract'])
                    setDataBalanceChart(tokenDistribution['totalBalanceNotContract'])
                    setIsContract("0")
                  }
                }}
              >
                <MenuItem value={"1"}>All</MenuItem>
                <MenuItem value={"0"}>Not Contract</MenuItem>
              </Select>
            </FormControl>
            <Box className="action__chart" sx={{display: "flex", justifyContent: "space-between"}}></Box>
          </Box>
        </div>
        <Box className="action__chart" sx={{display: "flex", justifyContent: "space-between"}}>
          <HighchartsReact highcharts={Highcharts} options={amountOptions} />
          <HighchartsReact highcharts={Highcharts} options={balanceOptions} />
        </Box>
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
