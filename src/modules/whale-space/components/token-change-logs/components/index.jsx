import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./style.scss";

import data_7_days from "../../totalHoldersData/data_7_days.json";
import data_30_days from "../../totalHoldersData/data_30_days.json";
import data_90_days from "../../totalHoldersData/data_90_days.json";
export function SortedDescendingIcon() {
  return <ExpandMoreIcon fontSize='small' htmlColor="#a1a7ac" />
}
export function SortedAscendingIcon() {
  return <ExpandLessIcon fontSize='small' htmlColor="#a1a7ac" />
}
export function MuiMoreVertIcon() {
  return <MoreVertIcon fontSize='small' htmlColor="#a1a7ac" />
}

const theme = createTheme({
  components: {
    MuiSwitch: {
      defaultProps: {
        color: 'default',
      },
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase': {
            position: "absolute",
            color: "#a1a7ac"
          }
        },
      }
    },
    MuiButton: {
      defaultProps: {
        border: '0px',
        outline: '0px'
      },
      styleOverrides: {
        root: {
          '& .MuiButton-buttonBase': {
            border: '0px',
            outline: '0px'
          }
        }
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input, .MuiInput-input, .css-15e8ec1-MuiInputBase-input-MuiInput-input": {
            color: "#a1a7ac",
            backgroundColor: "#1e1f22 !important"
          }
        },
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#a1a7ac",
          },
          "& .MuiInputLabel-root": {
            color: "#a1a7ac",
          }
        },
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiFormLabel-root": {
            color: "#a1a7ac !important",
          },
          "& .MuiInputLabel-root": {
            color: "#a1a7ac !important",
          },
          "& .MuiInputBase-formControl:after": {
            borderBottom: '#7987a1',
          },
          "& .MuiInputBase-formControl:hover": {
            borderBottom: '#7987a1',
          }
        },
      }
    }
  }

});

function TokenChangeLogs(props) {
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

  const [variable, setValiable] = useState("total_balance");
  const handleVariable = (event) => {
    if (event.target.value === "total_balance") {
      setValiable("total_balance")
      handleDataChart("total_balance", isTop, isContract)
    } else {
      setValiable("token_amount");
      handleDataChart("token_amount", isTop, isContract)
    }
  }

  const [isTop, setIsTop] = useState("1");
  const handleIsTop = (type) => {
    if (type === "1") {
      setIsTop(type);
      handleSubTitle("Top 100 wallets")
      handleDataChart(variable, "1", isContract)
    } 
    else {
      setIsTop(type);
      handleSubTitle("Wallet")
      handleDataChart(variable, "0", isContract)
    }
  };

  const [isContract, setIsContract] = useState("1");
  const handleIsContract = (event) => {
    if (event.target.value === "1") {
      setIsContract(event.target.value);
      handleDataChart(variable, isTop, "1")
    } else {
      setIsContract(event.target.value);
      handleDataChart(variable, isTop, "0")
    }
  };

  const [subTitle, setSubTitle] = useState("Top 100 wallets");
  const handleSubTitle = (title) => {
    setSubTitle(title)
  }

  const total_balance_1_1 = [[1653955200, 4154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const total_balance_1_0 = [[1653955200, 354552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const total_balance_0_1 = [[1653955200, 2154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const total_balance_0_0 = [[1653955200, 1154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const token_amount_1_1 = [[1653955200, 5154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const token_amount_1_0 = [[1653955200, 6154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const token_amount_0_1 = [[1653955200, 7154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const token_amount_0_0 = [[1653955200, 8154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
  const tokenChangeLogs = {
    "0x0391be54e72f7e001f6bbc331777710b4f2999ef": {
      "tokenChangeLogs": [[1653955200, 8154552241.543043], [1654041600, 4144159499.2630434], [1654128000, 4135529508.992005], [1654214400, 4135529508.992005], [1654300800, 4135529508.992005], [1654387200, 4135529508.992005], [1654473600, 4135529508.992005], [1654560000, 4135371793.6914635], [1654646400, 4135507383.409106], [1654732800, 4136208651.650596], [1654819200, 4131054655.121356], [1654905600, 4131054655.121356], [1654992000, 4135723233.1628246], [1655078400, 4132032811.1482444], [1655164800, 4132036265.9964337], [1655251200, 4132036265.9972215], [1655337600, 4132036265.9972215], [1655424000, 4132036265.9972215], [1655510400, 4132036265.9972215], [1655596800, 4131069793.7566376], [1655683200, 4131071091.3251047], [1655769600, 4131462091.3251047], [1655856000, 4131462091.3251047], [1655942400, 4131462091.3251047], [1656028800, 4131462091.3251047], [1656115200, 4131462091.3251047], [1656201600, 4131462091.3251047], [1656288000, 4131462091.3251047], [1656374400, 4131462091.3251047], [1656460800, 4131462091.3251047]]
    }
  }
  console.log(variable, isTop,isContract)
  // variable = total_balance, variable = token_amount, 
  // isTop = True
  // isContract = true 
  const [dataChart, setDataChart] = useState(total_balance_1_1)
  const handleDataChart = (_variable, _isTop, _isContract) => {
    console.log(_variable, _isTop, _isContract)
    if (_variable === "total_balance" && _isTop === "1" && _isContract === "1") {
      setDataChart(total_balance_1_1)
    }
    else if (_variable == "total_balance" && _isTop == "1" && _isContract == "0") {
      setDataChart(total_balance_1_0)
    }
    else if (_variable == "total_balance" && _isTop == "0" && _isContract == "1") {
      setDataChart(total_balance_0_1)
    }
    else if (_variable == "total_balance" && _isTop == "0" && _isContract == "0") {
      setDataChart(total_balance_0_0)
    }
    else if (_variable === "token_amount" && _isTop === "1" && _isContract === "1") {
      setDataChart(token_amount_1_1)
    }
    else if (_variable == "token_amount" && _isTop == "1" && _isContract == "0") {
      setDataChart(token_amount_1_0)
    }
    else if (_variable == "token_amount" && _isTop == "0" && _isContract == "1") {
      setDataChart(token_amount_0_1)
    }
    else if (_variable == "token_amount" && _isTop == "0" && _isContract == "0") {
      setDataChart(token_amount_0_0)
    }
  }

  const handleClickRow = (address) => {
    console.log(address)
    setDataChart(tokenChangeLogs[address]['tokenChangeLogs'])
    setIsTop("0")
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
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    navigator: {
      enabled: false
    },
    series: [{
      name: 'Token amount',
      data: dataChart,
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


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Rank', width: 100 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'tokenAmount', headerName: 'Token Amount', width: 150 },
    {
      field: 'totalBalance',
      headerName: 'Total Balance',
      // type: 'number',
      width: 150,
    },
    {
      field: 'tokenChange',
      headerName: 'Change',
      description: 'This column has a value getter and is not sortable.',
      // type: 'number',
      width: 100
    },
  ];

  const rows = [
    { id: "#1", address: '0x0391be54e72f7e001f6bbc331777710b4f2999ef', tokenAmount: 1, totalBalance: 35, tokenChange: -4 },
    { id: "#2", address: '0x1111111111111111111111111111111111111111', tokenAmount: 2, totalBalance: 42, tokehange: -3 },
    { id: "#3", address: '0x1111111111111111111111111111111111111112', tokenAmount: 3, totalBalance: 45, tokenChange: -2 },
    { id: "#4", address: '0x1111111111111111111111111111111111111113', tokenAmount: 4, totalBalance: 16, tokenChange: -1 },
    { id: "#5", address: '0x1111111111111111111111111111111111111114', tokenAmount: 5, totalBalance: 23, tokenChange: 0 },
    { id: "#6", address: '0x1111111111111111111111111111111111111115', tokenAmount: 6, totalBalance: 150, tokenChange: 1 },
    { id: "#7", address: '0x1111111111111111111111111111111111111116', tokenAmount: 7, totalBalance: 44, tokenChange: 2 },
    { id: "#8", address: '0x1111111111111111111111111111111111111117', tokenAmount: 8, totalBalance: 36, tokenChange: 3 },
    { id: "#9", address: '0x1111111111111111111111111111111111111118', tokenAmount: 9, totalBalance: 65, tokenChange: 4 },
    { id: "#11", address: '0x0391be54e72f7e001f6bbc331777710b4f2999ef', tokenAmount: 1, totalBalance: 35, tokenChange: -4 },
    { id: "#12", address: '0x1111111111111111111111111111111111111111', tokenAmount: 2, totalBalance: 42, tokehange: -3 },
    { id: "#13", address: '0x1111111111111111111111111111111111111112', tokenAmount: 3, totalBalance: 45, tokenChange: -2 },
    { id: "#14", address: '0x1111111111111111111111111111111111111113', tokenAmount: 4, totalBalance: 16, tokenChange: -1 },
    { id: "#15", address: '0x1111111111111111111111111111111111111114', tokenAmount: 5, totalBalance: 23, tokenChange: 0 },
    { id: "#16", address: '0x1111111111111111111111111111111111111115', tokenAmount: 6, totalBalance: 150, tokenChange: 1 },
    { id: "#17", address: '0x1111111111111111111111111111111111111116', tokenAmount: 7, totalBalance: 44, tokenChange: 2 },
    { id: "#18", address: '0x1111111111111111111111111111111111111117', tokenAmount: 8, totalBalance: 36, tokenChange: 3 },
    { id: "#19", address: '0x1111111111111111111111111111111111111118', tokenAmount: 9, totalBalance: 65, tokenChange: 4 }
  ];
  return (
    <Fragment>
      <div className="block-in-page">
        <div className="row">
          <div className="col">
            <div className="action__1">
              <div className="action">
                <div className={
                  "action__btn " + (isTop === "1" ? "active" : "")
                }
                  onClick={() => handleIsTop("1")}>Top 100 Wallets</div>
                <div className={
                  "action__btn " + (isTop !== "1" ? "active" : "")
                }
                  onClick={() => handleIsTop("0")}>Wallet</div>
              </div>
              <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                <InputLabel id="demo-select-small"></InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={variable}
                  label="Variable"
                  inputProps={{MenuProps: {disableScrollLock: true}}}
                  sx={{ color: "#a1a7ac", backgroundColor: "#1e1f22"}} 
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
                  inputProps={{MenuProps: {disableScrollLock: true}}}
                  sx={{ color: "#a1a7ac", backgroundColor: "#1e1f22"}} 
                  onChange={handleIsContract}
                >
                  <MenuItem value={"1"}>All</MenuItem>
                  <MenuItem value={"0"}>Not Contract</MenuItem>
                </Select>
              </FormControl>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
          <div className="col wallet-table">
            <div style={{ height: 600, width: '720px' }}>
              <ThemeProvider theme={theme}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  onRowClick={(e) => { handleClickRow(e.row.address)}}
                  getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                  components={{
                    ColumnSortedDescendingIcon: SortedDescendingIcon,
                    ColumnSortedAscendingIcon: SortedAscendingIcon,
                    ColumnMenuIcon: MuiMoreVertIcon
                  }}
                  componentsProps={{
                    baseCheckbox: {
                      sx: {
                        color: "#a1a7ac", backgroundColor: "#1e1f22", option: {
                          backgroundColor: "#1e1f22"
                        }
                      }
                    },
                    baseTextField: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    baseSelect: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    baseTooltip: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    baseButton: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    baseSwitch: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    basePopper: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    cell: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
                    columnHeaderFilterIconButton: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", } },
                    header: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", borderBottom: `1px solid #323546` } },
                    columnMenu: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", } },        // menu
                    columnsPanel: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22' } },      // menu show columns
                    filterPanel: { sx: { backgroundColor: '#1e1f22' } },                          // menu filter
                    footer: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22', borderTop: `1px solid #323546` } },                               // footer background
                    pagination: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22' } },                                    // footer filter 
                  }}

                  sx={{
                    color: "#a1a7ac",
                    border: `1px solid #323546`,

                    '&.MuiDataGrid-iconSeparator': {
                      display: 'none',
                    },
                    '&.MuiDataGrid-root': {
                      backgroundColor: "#1e1f22",
                      color: "#a1a7ac",
                    },
                    "&.MuiDataGrid-columnHeaders": {
                      backgroundColor: "#1e1f22",
                      color: "#a1a7ac",
                      fontSize: 16,
                      border: `1px solid #323546 !important`
                    },
                    "&.MuiInput-input": {
                      backgroundColor: "#1e1f22",
                      color: "#a1a7ac"
                    },
                    "&.MuiSwitch-thumb css-jsexje-MuiSwitch-thumb": {
                      backgroundColor: "#1e1f22 !important",
                      color: "#a1a7ac !important"
                    },
                    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                      borderBottom: `0.5px solid ${'#1e1f22'}`,
                    },
                    '& .MuiDataGrid-row': {
                      backgroundColor: 'rgb(23, 23, 26)',
                      color: '#a1a7ac',
                    },
                    '& .MuiDataGrid-row:hover': {
                      backgroundColor: '#2d2f33',
                      color: '#a1a7ac'
                    },
                    '& *::-webkit-scrollbar': {
                      backgroundColor: '#202022',
                    },
                    '& *::-webkit-scrollbar-thumb': {
                      borderRadius: 8,
                      backgroundColor: "#585859",
                      minHeight: 24,
                      border: `3px solid #202022`,
                    },
                    '& *::-webkit-scrollbar-thumb:focus': {
                      backgroundColor: "#838384",
                    },
                    '& *::-webkit-scrollbar-thumb:active': {
                      backgroundColor: "#838384",
                    },
                    '& *::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: "#838384",
                    },
                    '& *::-webkit-scrollbar-corner': {
                      backgroundColor: "#202022",
                    },
                    '& .MuiDataGrid-overlay': {
                      backgroundColor: '#2d2f33'
                    },
                    '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
                      outline: `solid 0px`,
                      outlineColor: "#a1a7ac"
                    },
                    '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
                      outline: `solid 0px`,
                      outlineColor: "#a1a7ac"
                    },
                    '&.Mui-selected': {
                      backgroundColor: "#2d2f33",
                      '&:hover': "#2d2f33",
                      '@media (hover: none)': {
                        backgroundColor: "#2d2f33",
                      }
                    }
                  }}
                />
              </ThemeProvider>
            </div>
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
