import React, { Fragment, useEffect, useState } from "react";
import { addr, abbrNum, timeConverter} from "../../../../../helpers";
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
import { Box } from "@mui/material";
import { WhaleSpaceActions } from "../../../redux/actions";
import BigNumber from "bignumber.js";
import "./style.scss";

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

function TopWhaleInfo(props) {
  const { WhaleSpace } = props
  const [type, setType] = useState("tokenAmount");
  const [isContract, setIsContract] = useState("contract");
  const [addressWallet, setAddressWallet] = useState("")

  useEffect(() => {
    props.getTopWhaleWallets('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
  }, [])

  const [isTop, setIsTop] = useState("topWallet");
  const handleIsTop = (type) => {
    if (type === "topWallet") {
      setIsTop(type);
      handleSubTitle("Top 100 wallets")
    }
    else {
      setIsTop(type);
      console.log("addressWallet", addressWallet)
      props.getTokenChangeLogs('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', addressWallet)
      handleSubTitle("Wallet")
    }
  };

  let topWhaleWallets = {}
  if (WhaleSpace?.topWhaleWallets) {
    topWhaleWallets = WhaleSpace.topWhaleWallets
  }

  let listTopWallet = []
  if (type === "totalBalance" && isContract === "contract") {
    if (WhaleSpace?.topWhaleWallets) {
      listTopWallet = WhaleSpace.topWhaleWallets["totalBalance"]?.["walletInfo"]
      }
  }
  if (type === "totalBalance" && isContract === "notContract") {
    if (WhaleSpace?.topWhaleWallets) {
      listTopWallet = WhaleSpace.topWhaleWallets["totalBalanceNotContract"]?.["walletInfo"]
    }
  }
  if (type === "tokenAmount" && isContract === "contract") {
    if (WhaleSpace?.topWhaleWallets) {
      listTopWallet = WhaleSpace.topWhaleWallets["tokenAmount"]?.["walletInfo"]
    }
  }
  if (type === "tokenAmount" && isContract === "notContract") {
    if (WhaleSpace?.topWhaleWallets) {
      listTopWallet = WhaleSpace.topWhaleWallets["tokenAmountNotContract"]?.["walletInfo"]
    }
  }

  let tokenChangeLogs = []
  if (isTop === "topWallet") {
    if (type === "totalBalance" && isContract === "contract") {
      if (WhaleSpace?.topWhaleWallets) {
        let objs = WhaleSpace.topWhaleWallets["totalBalance"]?.["tokenChangeLogs"]
        tokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
      }
    }
    if (type === "totalBalance" && isContract === "notContract") {
      if (WhaleSpace?.topWhaleWallets) {
        let objs = WhaleSpace.topWhaleWallets["totalBalanceNotContract"]?.["tokenChangeLogs"]
        tokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
      }
    }
    if (type === "tokenAmount" && isContract === "contract") {
      if (WhaleSpace?.topWhaleWallets) {
        let objs = WhaleSpace.topWhaleWallets["tokenAmount"]?.["tokenChangeLogs"]
        tokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
      }
    }
    if (type === "tokenAmount" && isContract === "notContract") {
      if (WhaleSpace?.topWhaleWallets) {
        let objs = WhaleSpace.topWhaleWallets["tokenAmountNotContract"]?.["tokenChangeLogs"]
        tokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
      }
    }
  }

  if (isTop === "wallet") {
    if (WhaleSpace?.tokenChangeLogs) {
      let objs = WhaleSpace.tokenChangeLogs
      tokenChangeLogs = Object.keys(objs)
        .map(function (key) {
          return [parseInt(key), objs[key]];
        });
    }
  }
  const handleType = (event) => {
    if (event.target.value === "totalBalance") {
      setType("totalBalance")
    } else {
      setType("tokenAmount");
    }
  }

  const handleIsContract = (event) => {
    if (event.target.value === "contract") {
      setIsContract(event.target.value);
    } else {
      setIsContract(event.target.value);
    }
  };

  const [subTitle, setSubTitle] = useState("Top 100 wallets");
  const handleSubTitle = (title) => {
    setSubTitle(title)
  }

  const handleClickRow = (address) => {
    setIsTop("wallet")
    setAddressWallet(address)
    props.getTokenChangeLogs('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', address)
  }

  let options = {
    chart: {
      backgroundColor: "#17171a",
      height: 360,
      width: 450
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
    xAxis: { 
      // labels: {
      //   formatter: () => timeConverter(this.value),
      // }
      type: 'datetime',
      labels: {
        formatter: function() {
            return Highcharts.dateFormat('%d %b %y', this.value * 1000);
       }
   }
    },
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
      data: tokenChangeLogs,
      tooltip: {
        valueDecimals: 2
      }
    }]
  }

  const columns: GridColDef[] = [
    { field: 'walletRank', headerName: 'Rank', width: 50 },
    { field: 'id', headerName: 'Address', width: 125, valueFormatter: params => addr(params.value)},
    { field: 'walletTokenAmount', headerName: 'Token Amount', width: 125, valueFormatter: params => abbrNum(params.value, 2) },
    { field: 'walletTokenBalance', headerName: 'Token Amount (USD)', width: 150, valueFormatter: params => abbrNum(params.value, 2) },
    { field: 'walletTotalBalance', headerName: 'Token Balance (USD)', width: 150, valueFormatter: params => abbrNum(params.value, 2) },
    { field: 'walletTokenTotalBalancePercentage', headerName: '% total balance', width: 125, valueFormatter: params => BigNumber(params.value).toFixed(2)  },
    { field: 'walletTokenTotalSupplyPercentage', headerName: '% total supply', width: 125, valueFormatter: params => BigNumber(params.value).toFixed(2) },
    { field: 'walletTokenChange', headerName: 'Change', width: 70, valueFormatter: params => abbrNum(params.value, 2) }
  ];

  return (
    <Fragment>
      <Box className="block-in-page" sx={{ padding: "20px 0" }}>
        <div className="row">
          <Box className="action__1" sx={{ display: "flex", alignItems: "center", paddingBottom: "10px" }}>
            <div className="action">
              <div className={
                "action__btn " + (isTop === "topWallet" ? "active" : "")
              }
                onClick={() => handleIsTop("topWallet")}>Top 100 Wallets</div>
              <div className={
                "action__btn " + (isTop === "wallet" ? "active" : "")
              }
                onClick={() => handleIsTop("wallet")}>Wallet</div>
            </div>
            <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
              <InputLabel id="demo-select-small"></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={type}
                label="type"
                inputProps={{ MenuProps: { disableScrollLock: true } }}
                sx={{ color: "#a1a7ac", backgroundColor: "#1e1f22" }}
                onChange={handleType}
              >
                <MenuItem value={"totalBalance"}>Total balance</MenuItem>
                <MenuItem value={"tokenAmount"}>Token amount</MenuItem>
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
                <MenuItem value={"contract"}>All</MenuItem>
                <MenuItem value={"notContract"}>Not Contract</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="row">

          <Box className="col wallet-table" sx={{ marginTop: "40px", display: "flex", justifyContent: "space-around" }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div style={{ height: 360, width: '950px', margin: "0 0 0 20px" }}>
              <ThemeProvider theme={theme}>
                <DataGrid
                  rows={listTopWallet}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  onRowClick={(e) => { handleClickRow(e.row.id) }}
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
                    width: "100%",
                    margin: "0 auto",

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
          </Box>
        </div>

      </Box>

    </Fragment>
  );
}

function mapState(state) {
  const { WhaleSpace } = state;
  return { WhaleSpace };
}
const actions = {
  getTopWhaleWallets: WhaleSpaceActions.getTopWhaleWallets,
  getTokenChangeLogs: WhaleSpaceActions.getTokenChangeLogs
};
export default connect(mapState, actions)(TopWhaleInfo);
