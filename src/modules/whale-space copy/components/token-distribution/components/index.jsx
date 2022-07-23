import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { addr, abbrNum, timeConverter} from "../../../../../helpers";
import { WhaleSpaceActions } from "../../../redux/actions";
import "./style.scss";

function TokenDistribution(props) {
  const { WhaleSpace } = props
  const location = useLocation();
  const tokenAddress = location.pathname.split("/")[2];
  const [isContract, setIsContract] = useState("contract");

  useEffect(() => {
    props.getTokenDistribution(tokenAddress)
  }, [])

  let tokenDistribution = {}

  if (WhaleSpace?.tokenDistribution) {
    tokenDistribution = WhaleSpace.tokenDistribution
  }

  let xAxisBalance = []
  let yAxisBalance = []
  let xAxisAmount = []
  let yAxisAmount = []
  if (isContract === "contract") {
    if (WhaleSpace?.tokenDistribution) {
      let tokenDistribution = WhaleSpace.tokenDistribution["totalBalance"]?.["distribution"]
      yAxisBalance = tokenDistribution.map((item) => {
        return parseInt(item[0])
      })
      xAxisBalance = tokenDistribution.map( (item) => {
        return `${abbrNum(item[2], 0)} - ${abbrNum(item[3], 0)}`
      })
    }

    if (WhaleSpace?.tokenDistribution) {
      let tokenDistribution = WhaleSpace.tokenDistribution["tokenAmount"]?.["distribution"]
      yAxisAmount = tokenDistribution.map((item) => {
        return parseInt(item[0])
      })
      xAxisAmount = tokenDistribution.map( (item) => {
        return `${abbrNum(item[2], 0)} - ${abbrNum(item[3], 0)}`
      })
    }
  }

  if (isContract === "notContract") {
    if (WhaleSpace?.tokenDistribution) {
      let tokenDistribution = WhaleSpace.tokenDistribution["totalBalanceNotContract"]?.["distribution"]
      yAxisBalance = tokenDistribution.map((item) => {
        return item[0]
      })
      xAxisBalance = tokenDistribution.map( (item) => {
        return `${abbrNum(item[2], 0)} - ${abbrNum(item[3], 0)}`
      })
    }

    if (WhaleSpace?.tokenDistribution) {
      let tokenDistribution = WhaleSpace.tokenDistribution["tokenAmountNotContract"]?.["distribution"]
      yAxisAmount = tokenDistribution.map((item) => {
        return item[0]
      })
      xAxisAmount = tokenDistribution.map( (item) => {
        return `${abbrNum(item[2], 0)} - ${abbrNum(item[3], 0)}`
      })
    }
  }

  let amountOptions = {
    chart: {
      backgroundColor: "#17171a",
      type: 'column',
      color: "white",
      width: 880,
      height: 600
    },
    title: {
      text: 'Amount-based token distribution',
      style: { color: "#a1a7bb", fontSize: "18px" },
    },
    subtitle: {
      text: 'Token distribution of wallets sort by token amount'
    },
    xAxis: {
      categories: xAxisAmount,
      style: {
        color: "white",
      },
      labels: {
        style: {
          color: "white",
        },
      },
      crosshair: true
    },
    yAxis: {
      type: 'logarithmic',
      tickAmount: 7,
      gridLineColor: "#323546",
      style: {
        color: "#a1a7bb",
      },
      title: {
        text: 'wallets'
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
    navigator: {
      enabled: false
    },
    tooltip: {
      headerFormat: '<span style="font-size:15px"><b>Min - Max:<b/> <b>{point.key}<b/></span><table>',
      pointFormat: '<tr><td style="font-size:15px"><b>{series.name}: </b> </td>' +
                  '<td style="font-size:15px"><b>&nbsp;{point.y:.0f} wallets</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Number of wallets',
      data: yAxisAmount

    }]
  };

  let balanceOptions = {
    chart: {
      backgroundColor: "#17171a",
      type: 'column',
      color: "white",
      width: 880,
      height: 600
    },
    title: {
      text: 'Balance-based token distribution',
      style: { color: "#a1a7bb", fontSize: "18px" },
    },
    subtitle: {
      text: 'Token distribution of wallets sort by total balance'
    },
    xAxis: {
      categories: xAxisBalance,
      style: {
        color: "#a1a7bb",
      },
      labels: {
        style: {
          color: "white",
        },
      },
      crosshair: true
    },
    navigator: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    yAxis: {
      tickAmount: 7,
      gridLineColor: "#323546",
      type: 'logarithmic',
      style: {
        color: "#a1a7bb",
      },
      title: {
        text: 'wallets'
      },
      labels: {
        style: {
          color: "white",
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:15px"><b>Min - Max:<b/> <b>{point.key} (USD)<b/></span><table>',
      pointFormat: '<tr><td style="font-size:15px"><b>{series.name}: </b></td>' +
        '<td style="font-size:15px"><b>&nbsp;{point.y:.0f} wallets</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: 'Number of wallets',
      data: yAxisBalance
    }]
  };


  return (
    <Fragment>
      <div className="block-in-page">
        <div className="row">
          <Box className="action__chart" sx={{ padding: "10px 0" }}>
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
                  if (e.target.value === "contract") {
                    setIsContract("contract")
                  }
                  else {
                    setIsContract("notContract")
                  }
                }}
              >
                <MenuItem value={"contract"}>All</MenuItem>
                <MenuItem value={"notContract"}>Not Contract</MenuItem>
              </Select>
            </FormControl>
            <Box className="action__chart" sx={{ display: "flex", justifyContent: "space-between" }}></Box>
          </Box>
        </div>
        <Box className="action__chart" sx={{ display: "flex", justifyContent: "space-between" }}>
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
