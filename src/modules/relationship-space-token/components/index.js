
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { addr, abbrNum, timeConverter } from '../../../helpers';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { ForceGraph3D } from "react-force-graph";
import * as d3 from "d3";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Dropdown } from "react-bootstrap";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RelationshipSpaceActions } from '../redux/actions'
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from '@mui/material/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TablePagination from '@mui/material/TablePagination';

import './style.scss'

export function clusterDetail(nodeDetail) {
    if (nodeDetail.clusterRank) {
        return (
            <div>
                <h4>Cluster</h4>
                <h5>Cluster rank: #{nodeDetail["clusterRank"]}</h5>
                <h5>Token amount in cluster: {abbrNum(nodeDetail["clusterTokenAmount"], 2)}</h5>
                <h5>Token amount total supply : {abbrNum(nodeDetail["clusterTokenTotalSupplyPercentage"])}%</h5>
                <h5>Token amount in USD: {abbrNum(nodeDetail["clusterTokenBalance"], 2)} USD</h5>
                <h5>Total balance in cluster: {abbrNum(nodeDetail["clusterTotalBalance"], 2)} USD</h5>
                <h5>Token amount per total balance : {abbrNum(nodeDetail["clusterTokenTotalBalancePercentage"])}%</h5>
                <h5>Token change in month: {abbrNum(nodeDetail["clusterTokenChange"], 2)}</h5>
            </div>)
    }
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}


const useStyles = makeStyles({
    button: {
        width: "33.33333333333333333333333333333333%",
        "&:hover": {
            boxShadow: "none",
            background: "#717372"
        },
        "&:active,": {
            boxShadow: "none",
            background: "#717372"
        }
    },
    togger: {
        width: "33.33333333333333333333333333333333%",
        "&:active,": {
            boxShadow: "none",
            background: "#717372"
        }
    },
    toggerGroup: {
        width: "100%"
    },
    general: {
        color: "white",
        backgroundColor: "#1d1d1e",
        fontSize: 20,
        fontWeight: 700,
        position: "absolute",
        zIndex: 10000,
        top: 10,
        left: 10,
        paddingTop: 2,
        paddingBottom: 2,
        "&:hover": {
            backgroundColor: "#4a4b4e"
        }
    },
    dropdown: {
        zIndex: 10,
        right: 10,
        top: 10,
        position: "absolute",
        backgroundColor: "#1d1d1e",
        color: "white",
        borderRadius: "4px",
    },
    dropdownToggle: {
        backgroundColor: "#1d1d1e",
        color: "white",
        borderRadius: "4px",
        "&:hover": {
            backgroundColor: "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        },
        "&.dropdown-menu>li>a:focus": {
            backgroundColor: "#2E8BC0"
        }
    },
    tableRow: {
        "&:hover": {
            backgroundColor: '#7EA5FF'
        }
    },
    topScrollPaper: {
        alignItems: 'flex-start',
    },
    topPaperScrollBody: {
        verticalAlign: 'top',
    },
    nodeDetail: {
        "& .MuiPaper-root": {
            margin: 0,
            left: "2%"
        },
        position: 'absolute !important',
        left: "2%",
        margin: 0,
        top: 0,
    },
    nodeDetailBig: {
        position: 'absolute !important',
        left: "25%",
        minWidth: "50%",
        margin: 0,
        top: 0,
    },
    toggerNodeDetail: {
        width: "50%"
    }
});

const default_test = {
        "source": "0x8735fe4006d4f969737b948b268923b9018ecc52",
        "target": "0xdf97761eb48058d8c9800f97f9ff45e3a76983fe",
        "sourceRank": 1,
        "targetRank": 1,
        "sourceToTarget": 1,
        "targetToSource": 1,
        "transferChangeLogs": [{
            "time": 1,
            "valueInUSD": 1,
            "tokens": "1 ETH; ",
            "from": 1,
            "to": 1
        }]
    }



function RelationshipSpace(props) {
    const clusterChangeLog = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    const location = useLocation();
    const tokenAddress = location.pathname.split("/")[2];
    const classes = useStyles();
    const theme = useTheme();
    const { RelationshipSpace } = props

    const [walletType, setWalletType] = useState('rank')
    const [clusterType, setClusterType] = useState('')
    const [typeTokenChangeLogs, setTypeTokenChangeLogs] = useState('walletTokenChangeLogs')
    const [addressWallet, setAddressWallet] = useState()

    useEffect(() => {
        props.getWalletNodeRelationship(tokenAddress)
        props.getWalletLinkRelationship(tokenAddress)
        props.getClusterNodeRelationship(tokenAddress)
        props.getClusterLinkRelationship(tokenAddress)
        props.getListCluster(tokenAddress)
        props.getTokenInfomation(tokenAddress)
    }, [])

    console.log(RelationshipSpace)

    let nodeGraphWalletRank = []
    let nodeGraphWalletIn = []
    let nodeGraphWalletOut = []
    let linkGraphWalletRank = []
    let linkGraphWalletIn = []
    let linkGraphWalletOut = []

    let nodeGraphClusterRank = []
    let nodeGraphClusterIn = []
    let nodeGraphClusterOut = []
    let linkGraphClusterRank = []
    let linkGraphClusterIn = []
    let linkGraphClusterOut = []
    let listClusterRank = []
    let listClusterIn = []
    let listClusterOut = []

    let tokenInfomation = []

    let clusterTokenChangeLogs = []
    let walletTokenChangeLogs = []

    let linkDetail = default_test

    if (RelationshipSpace?.walletNodeRelationship && RelationshipSpace?.walletLinkRelationship) {
        nodeGraphWalletRank = RelationshipSpace.walletNodeRelationship["rank"]
        nodeGraphWalletIn = RelationshipSpace.walletNodeRelationship["in"]
        nodeGraphWalletOut = RelationshipSpace.walletNodeRelationship["out"]
        linkGraphWalletRank = RelationshipSpace.walletLinkRelationship["rank"]
        linkGraphWalletIn = RelationshipSpace.walletLinkRelationship["in"]
        linkGraphWalletOut = RelationshipSpace.walletLinkRelationship["out"]
    }

    if (RelationshipSpace?.clusterNodeRelationship && RelationshipSpace?.clusterLinkRelationship && RelationshipSpace?.listCluster) {
        nodeGraphClusterRank = RelationshipSpace.clusterNodeRelationship["rank"]
        nodeGraphClusterIn = RelationshipSpace.clusterNodeRelationship["in"]
        nodeGraphClusterOut = RelationshipSpace.clusterNodeRelationship["out"]
        linkGraphClusterRank = RelationshipSpace.clusterLinkRelationship["rank"]
        linkGraphClusterIn = RelationshipSpace.clusterLinkRelationship["in"]
        linkGraphClusterOut = RelationshipSpace.clusterLinkRelationship["out"]
        listClusterRank = RelationshipSpace.listCluster["rank"]
        listClusterIn = RelationshipSpace.listCluster["in"]
        listClusterOut = RelationshipSpace.listCluster["out"]
    }

    if (RelationshipSpace?.tokenInfomation) {
        tokenInfomation = RelationshipSpace.tokenInfomation
    }

    if (RelationshipSpace?.clusterTokenChangeLogs) {
        clusterTokenChangeLogs = RelationshipSpace.clusterTokenChangeLogs
    }

    if (RelationshipSpace?.walletTokenChangeLogs) {
        walletTokenChangeLogs = RelationshipSpace.walletTokenChangeLogs
    }

    if (RelationshipSpace?.linkDetail) {
        linkDetail = RelationshipSpace.linkDetail
    }

    let nodeGraph = []
    let linkGraph = []
    let listCluster = []
    if (walletType === 'rank') {
        nodeGraph = nodeGraphWalletRank
        linkGraph = linkGraphWalletRank
    }
    if (walletType === 'in') {
        nodeGraph = nodeGraphWalletIn
        linkGraph = linkGraphWalletIn
    }
    if (walletType === 'out') {
        nodeGraph = nodeGraphWalletOut
        linkGraph = linkGraphWalletOut
    }

    if (clusterType === 'rank') {
        nodeGraph = nodeGraphClusterRank
        linkGraph = linkGraphClusterRank
        listCluster = listClusterRank
    }
    if (clusterType === 'in') {
        nodeGraph = nodeGraphClusterIn
        linkGraph = linkGraphClusterIn
        listCluster = listClusterIn
    }
    if (clusterType === 'out') {
        nodeGraph = nodeGraphClusterOut
        linkGraph = linkGraphClusterOut
        listCluster = listClusterOut
    }

    let tokenChangeLogs = []
    if (typeTokenChangeLogs === 'walletTokenChangeLogs') {
        let objs = walletTokenChangeLogs
        tokenChangeLogs = Object.keys(objs).map(function (key) {
            return [parseInt(key), objs[key]];
        });
    }

    if (typeTokenChangeLogs === 'clusterTokenChangeLogs') {
        let objs = clusterTokenChangeLogs
        tokenChangeLogs = Object.keys(objs).map(function (key) {
            return [parseInt(key), objs[key]];
        });
    }

    // // start menu     

    const [walletRows, setRowWallet] = useState(nodeGraph)
    const [clusterRows, setRowCluster] = useState(listCluster);
    const [tabMenu, setTabMenu] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setTabMenu(newValue);
        if (newValue == 1) {
            setWalletType("");
            setClusterType("rank");
            setAlignment("rank")
            // setRowCluster(listClusterRank)
        }
        if (newValue == 0) {
            setClusterType("");
            setWalletType("rank");
            setAlignment("rank")
        }
    };

    const [alignment, setAlignment] = useState('rank');
    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [searchWallet, setSearchWallet] = useState("");
    const [searchCluster, setSearchCluster] = useState("");
    const requestSearchWallet = (searchedVal) => {
        const filteredRows = walletRows.filter((row) => {
            return row.address.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRowWallet(filteredRows);
    };

    const requestSearchCluster = (searchedVal) => {
        const filteredRows = clusterRows.filter((row) => {
            return row.address.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRowCluster(filteredRows);
    };

    const cancelSearchWallet = () => {
        setSearchWallet("");
        requestSearchWallet(searchWallet);
    };

    const cancelSearchCluster = () => {
        setSearchCluster("");
        requestSearchCluster(searchCluster);
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    // end menu

    // start react force graph

    const [lenLink, setLenLink] = useState(50)
    const fgRef = useRef();
    useEffect(() => {
        // forceRef.current.d3Force("collide", d3.forceCollide(13));
        fgRef.current.d3Force("charge").strength(-10);
        fgRef.current.d3Force("link").distance(lenLink);
        fgRef.current.d3Force("charge").distanceMax(200);
    }, [lenLink]);

    // useEffect(() => {
    //     const bloomPass = new UnrealBloomPass();
    //     bloomPass.strength = 1;
    //     bloomPass.radius = 1;
    //     bloomPass.threshold = 0.1;
    //     fgRef.current.postProcessingComposer().addPass(bloomPass);
    // }, []);


    const [nodes, setNodes] = useState([])

    const [node_id, setSearchTerm] = useState("");
    // const handleChange = e => {
    //     setSearchTerm(e.target.value);
    // };

    const handleClickNode = (node) => {
        d3.selectAll("#node-info-container").remove();
        // Aim at node from outside it
        const distance = 200;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
            node, // lookAt ({ x, y, z })
            3000 // ms transition duration
        );

        setAddressWallet(node['id'])
        props.getTokenChangeLogs(tokenAddress, node?.['id'])
        if (node.clusterRank) {
            props.getClusterTokenChangeLogs(tokenAddress, node['clusterRank'])
        }
        setTypeTokenChangeLogs("walletTokenChangeLogs")
        setAlignmentNodeDetail('walletTokenChangeLogs')
        handleClickOpenNodeDetail(node)
    }

    const handleSearchNode = (address) => {
        const result = nodeGraph.filter(item =>
            item['id'].includes(address)
        );
        handleClickNode(result[0])
    }

    const handleClickLink = (link) => {
        d3.selectAll("#node-info-container").remove();
        // Aim at node from outside it
        const distance = 200;
        const distRatio = 1 + distance / Math.hypot(link.source.x, link.source.y, link.source.z);
        fgRef.current.cameraPosition(
            { x: link.source.x * distRatio, y: link.source.y * distRatio, z: link.source.z * distRatio }, // new position
            link.source, // lookAt ({ x, y, z })
            3000 // ms transition duration
        );

        props.getLinkDetail(tokenAddress, link.source.id, link.target.id)
        handleClickOpenLinkDetail()
    }


    const [node_info, setNodeInfo] = useState("");
    const handleNodeInfo = (e) => {
        setNodeInfo(e.target.value)
    }

    const handleIncreaseSize = () => {
        const updated_node = nodes
        updated_node.map((item) => {
            item["val"] = item["val"] * 2
        })

        setNodes([...updated_node])
    }

    const handleDecreaseSize = () => {
        const updated_node = nodes
        updated_node.map((item) => {
            item["val"] = item["val"] * 0.5
        })

        setNodes([...updated_node])
    }

    // // start token general infomation 
    const [openGeneral, setOpenGeneral] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpenGeneral = (scrollType) => () => {
        setOpenGeneral(true);
        setScroll(scrollType);
    };

    const handleCloseGeneral = () => {
        setOpenGeneral(false);
    };

    const descriptionGeneralRef = useRef(null);
    // useEffect(() => {
    //     if (openGeneral) {
    //         const { current: descriptionGeneral } = descriptionGeneralRef;
    //         if (descriptionGeneral !== null) {
    //             descriptionGeneral.focus();
    //         }
    //     }
    // }, [openGeneral]);
    // // end token general infomation 

    // // start node detail
    const [openNodeDetail, setOpenNodeDetail] = useState(false);
    const [nodeDetail, setNodeDetail] = useState({ "id": "1" })
    const handleClickOpenNodeDetail = (row) => {
        setNodeDetail(row)
        setOpenNodeDetail(true);
    };

    const handleCloseNodeDetail = () => {
        setOpenNodeDetail(false);
    };

    const [alignmentNodeDetail, setAlignmentNodeDetail] = useState("walletTokenChangeLogs");
    const handleChangeToggleNodeDetail = (event, newAlignment) => {
        setAlignmentNodeDetail(newAlignment);
    };

    let options = {
        chart: {
            backgroundColor: "#17171a",
            height: 300,
            width: 472
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Token change logs',
            style: { color: "#a1a7bb", fontSize: "18px" },
        },
        xAxis: {
            type: 'datetime',
            labels: {
              formatter: function () {
                return Highcharts.dateFormat('%d %b %y', this.value * 1000);
              }
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
    // end node detail

    // start link detail
    const [openLinkDetail, setOpenLinkDetail] = useState(false);
    const handleClickOpenLinkDetail = () => {
        setOpenLinkDetail(true);
    };

    const handleCloseLinkDetail = () => {
        setOpenLinkDetail(false);
    };

    const [alignmentLinkDetail, setAlignmentLinkDetail] = useState("wallet");
    const handleChangeToggleLinkDetail = (event, newAlignment) => {
        setAlignmentLinkDetail(newAlignment);
    };
    // end link detail

    return (
        <Fragment>
            <Box style={{ maxHeight: '100vh' }}>

                <div className="relationship-space-container">
                    <Button className={classes.general} onClick={handleClickOpenGeneral('paper')}>
                        <span><img
                            className='logo'
                            src={tokenInfomation.image}
                            alt="Logo"
                        /></span>
                        <Typography variant="h5" ml={1}>{tokenInfomation?.name} ({tokenInfomation?.symbol})&nbsp;</Typography>
                        <span><MoreHorizIcon /></span>
                    </Button>

                    <Box style={{ position: "absolute", zIndex: 1000, top: 60, left: 30 }}>
                        <Typography variant="h6">Wallets: {tokenInfomation?.totalWallets} </Typography>
                        <Typography variant="h6">Clusters: {tokenInfomation?.totalClusters}</Typography>
                    </Box>

                    <Dialog
                        open={openGeneral}
                        onClose={handleCloseGeneral}
                        disableScrollLock
                        scroll={scroll}
                        aria-labelledby="general-title"
                        aria-describedby="general-description"
                        sx={{ width: "1200px", height: "1000px", margin: "0 auto" }}
                    >
                        <DialogTitle id="general-title" sx={{ textAlign: "center", backgroundColor: "#1d1d1e", display: "flex", justifyContent: "center", alignItems: "center", paddingRight: "10px", borderBottom: "1px solid grey" }}><img
                            className='logo'
                            src={tokenInfomation.image}
                            alt="Logo"
                        /> <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "white", marginLeft: "10px" }}>{tokenInfomation?.name} </Typography></DialogTitle>
                        <DialogContent sx={{ backgroundColor: "#1d1d1e", borderBottom: "1px solid grey" }}
                            dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="general-description"
                                ref={descriptionGeneralRef}
                                tabIndex={-1}
                            >
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Wallets:  </Typography> {tokenInfomation?.totalWallets}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Clusters:  </Typography>  {tokenInfomation?.totalClusters}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Active wallets in month:  </Typography>  {tokenInfomation?.totalActiveWalletsInMonth}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Total balance of new wallets in month:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.totalBalance, 2)} USD</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Token amount of new wallets in month:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.tokenBalance, 2)} {tokenInfomation.symbol ? tokenInfomation.symbol.toUpperCase() : ""}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>New wallets in month:  </Typography>  {tokenInfomation?.newWalletsInMonth?.number} wallets</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Total balance of new wallets:  </Typography>  {tokenInfomation?.newWalletsInMonth?.totalBalance} USD</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Token amount of new wallets:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.tokenAmount, 2)} {tokenInfomation.symbol ? tokenInfomation.symbol.toUpperCase() : ""}</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>Token amount of new wallets in USD:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.tokenBalance, 2)} USD</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>% Total balance:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.tokenTotalBalancePercentage, 2)} %</Typography>
                                <Typography variant="h6" sx={{ fontSize: "20px", fontWeight: 500, color: "white", display: "flex", marginTop: "5px" }}><Typography sx={{ fontSize: "20px", fontWeight: 700, color: "#2E8BC0", marginRight: "5px" }}>% Total supply:  </Typography>  {abbrNum(tokenInfomation?.newWalletsInMonth?.tokenTotalSupplyPercentage, 2)} %</Typography>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ backgroundColor: "#1d1d1e" }}>
                            <Button onClick={handleCloseGeneral}><Typography sx={{ fontSize: "16px", fontWeight: 700, color: "white", marginLeft: "10px" }}>Cancel </Typography></Button>
                        </DialogActions>
                    </Dialog>

                    <Dropdown className={classes.dropdown} sx={{ maxHeight: 100 }}>
                        <Dropdown.Toggle className={classes.dropdownToggle}>
                            Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    width: 350,
                                    position: 'relative',
                                    height: 100
                                }}
                            >
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={tabMenu}
                                        onChange={handleChangeTab}
                                        indicatorColor="standard"
                                        textColor="secondary"
                                        variant="fullWidth"
                                        aria-label="action tabs example"
                                    >
                                        <Tab label="Wallets List" {...a11yProps(0)} />
                                        <Tab label="Clusters List" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <TabPanel value={tabMenu} index={0} dir={theme.direction}>
                                    <ToggleButtonGroup
                                        className={classes.toggerGroup}
                                        color="standard"
                                        value={alignment}
                                        exclusive
                                        onChange={handleChangeToggle}
                                    >
                                        <ToggleButton className={classes.togger} value="rank" onClick={(e) => { console.log('on change'); setWalletType('rank'); setRowWallet(nodeGraphWalletRank) }}>Rank</ToggleButton>
                                        <ToggleButton className={classes.togger} value="in" onClick={(e) => { console.log('on change'); setWalletType('in'); setRowWallet(nodeGraphWalletIn) }}>In</ToggleButton>
                                        <ToggleButton className={classes.togger} value="out" onClick={(e) => { console.log('on change'); setWalletType('out'); setRowWallet(nodeGraphWalletOut) }}>Out</ToggleButton>
                                    </ToggleButtonGroup>
                                    <SearchBar
                                        value={searchWallet}
                                        onChange={(searchVal) => requestSearchWallet(searchVal)}
                                        onCancelSearch={() => cancelSearchWallet()}
                                    />
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ maxHeight: 450 }}>
                                            <div style={{ overflow: 'auto', height: '450px' }}>
                                                <Table style={{ tableLayout: 'fixed' }}>
                                                    <TableBody>
                                                        <TableRow className={classes.tableRow}>
                                                            <TableCell style={{ width: 20, overflow: "hidden" }} align="left">Rank</TableCell>
                                                            <TableCell style={{ width: 100, overflow: "hidden" }} align="center">Address</TableCell>
                                                            <TableCell style={{ width: 80, overflow: "hidden" }} align="center">Token Amount</TableCell>
                                                        </TableRow>
                                                        {(rowsPerPage > 0
                                                            ? walletRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : walletRows
                                                        ).map((row) => {
                                                            if (walletType === 'rank') {
                                                                return (
                                                                    <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                        handleClickOpenNodeDetail(row)
                                                                    }}>
                                                                        <TableCell style={{ width: 20, overflow: "hidden" }} align="left">{row["walletRank"]}</TableCell>
                                                                        <TableCell style={{ width: 100, overflow: "hidden" }} align="center">{addr(row["id"])}</TableCell>
                                                                        <TableCell style={{ width: 80, overflow: "hidden" }} align="center">{abbrNum(row["walletTokenAmount"], 2)}</TableCell>
                                                                    </TableRow>

                                                                )
                                                            }
                                                            if (walletType === 'in') {
                                                                return (
                                                                    <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                        handleClickOpenNodeDetail(row)
                                                                    }}>
                                                                        <TableCell style={{ width: 20, overflow: "hidden" }} align="left">{row["walletRank"]}</TableCell>
                                                                        <TableCell style={{ width: 100, overflow: "hidden" }} align="center">{addr(row["id"])}</TableCell>
                                                                        <TableCell style={{ width: 80, overflow: "hidden" }} align="center">{abbrNum(row["walletTokenChange"], 2)}</TableCell>
                                                                    </TableRow>

                                                                )
                                                            }
                                                            if (walletType === 'out') {
                                                                return (
                                                                    <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                        handleClickOpenNodeDetail(row)
                                                                    }}>
                                                                        <TableCell style={{ width: 20, overflow: "hidden" }} align="left">{row["walletRank"]}</TableCell>
                                                                        <TableCell style={{ width: 100, overflow: "hidden" }} align="center">{addr(row["id"])}</TableCell>
                                                                        <TableCell style={{ width: 80, overflow: "hidden" }} align="center">{abbrNum(row["walletTokenChange"], 2)}</TableCell>
                                                                    </TableRow>

                                                                )
                                                            }
                                                        }
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10]}
                                            component="div"
                                            count={walletRows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </TabPanel>
                                <TabPanel value={tabMenu} index={1} dir={theme.direction}>
                                    <ToggleButtonGroup
                                        className={classes.toggerGroup}
                                        color="standard"
                                        value={alignment}
                                        exclusive
                                        onChange={handleChangeToggle}
                                    >
                                        <ToggleButton className={classes.togger} value="rank" onClick={(e) => { setClusterType('rank'); setRowCluster(listClusterRank) }}>Rank</ToggleButton>
                                        <ToggleButton className={classes.togger} value="in" onClick={(e) => { setClusterType('in'); setRowCluster(listClusterIn) }}>In</ToggleButton>
                                        <ToggleButton className={classes.togger} value="out" onClick={(e) => { setClusterType('out'); setRowCluster(listClusterOut) }}>Out</ToggleButton>
                                    </ToggleButtonGroup>

                                    <SearchBar
                                        value={searchCluster}
                                        onChange={(searchVal) => requestSearchCluster(searchVal)}
                                        onCancelSearch={() => cancelSearchCluster()}
                                    />
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ maxHeight: 500 }}>
                                            <div style={{ overflow: 'auto', height: '520px' }}>
                                                <Table style={{ tableLayout: 'fixed' }}>
                                                    <TableBody>
                                                    <TableRow className={classes.tableRow} sx={{}}>
                                                            <TableCell style={{ width: 20, overflow: "hidden" }} align="left">Rank</TableCell>
                                                            <TableCell style={{ width: 100, overflow: "hidden" }} align="center">Large Wallet</TableCell>
                                                            <TableCell style={{ width: 80, overflow: "hidden" }} align="center">Token Amount</TableCell>
                                                        </TableRow>
                                                        {(rowsPerPage > 0
                                                            ? clusterRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : clusterRows
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                handleClickOpenNodeDetail(row.rank);
                                                            }}>
                                                                <TableCell style={{ width: 20, overflow: "hidden" }} align="left">{row.clusterRank}</TableCell>
                                                                <TableCell style={{ width: 100, overflow: "hidden" }} align="center">{addr(row.clusterInfo)}</TableCell>
                                                                <TableCell style={{ width: 80, overflow: "hidden" }} align="center">{abbrNum(row.clusterValue, 2)}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10]}
                                            component="div"
                                            count={clusterRows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </Paper>
                                </TabPanel>
                            </Box>
                        </Dropdown.Menu>

                    </Dropdown>

                    <Dialog
                        open={openNodeDetail}
                        onClose={handleCloseNodeDetail}
                        disableScrollLock
                        scroll="paper"
                        fullScreen={true}
                        sx={{ marginTop: '11%', marginLeft: '1%', marginRight: '70%', marginBottom: '1%' }}
                        // classes={{
                        //     scrollPaper: classes.topScrollPaper,
                        //     paperScrollBody: classes.topPaperScrollBody,
                        // }}
                        classes={classes.nodeDetail}
                        aria-labelledby="node-detail-title"
                        aria-describedby="node-detail-description"
                    >
                        <DialogTitle id="node-detail-title">Selected wallet</DialogTitle>
                        <DialogContent
                            dividers={scroll === 'paper'}>

                            <h4>Wallet</h4>
                            <h5>Address: {addr(nodeDetail?.["id"])}</h5>
                            <h5>Wallet rank: #{nodeDetail?.["walletRank"]}</h5>
                            <h5>Token amount in wallet: {abbrNum(nodeDetail?.["walletTokenAmount"], 2)}</h5>
                            <h5>Token amount per total supply : {abbrNum(nodeDetail?.["walletTokenTotalSupplyPercentage"])}%</h5>
                            <h5>Token amount in USD: {abbrNum(nodeDetail?.["walletTokenBalance"], 2)} USD</h5>
                            <h5>Total balance in wallet: {abbrNum(nodeDetail?.["walletTotalBalance"], 2)} USD</h5>
                            <h5>Token amount per total balance : {abbrNum(nodeDetail?.["walletTokenTotalBalancePercentage"])}%</h5>
                            <h5>Token change in month: {abbrNum(nodeDetail?.["walletTokenChange"], 2)}</h5>
                            {clusterDetail(nodeDetail)}


                            <ToggleButtonGroup
                                className={classes.toggerGroup}
                                color="standard"
                                value={alignmentNodeDetail}
                                exclusive={true}
                                onChange={handleChangeToggleNodeDetail}
                            >
                                <ToggleButton className={classes.toggerNodeDetail} value="walletTokenChangeLogs" onClick={(e) => { setTypeTokenChangeLogs(e.target.value) }}>Wallet</ToggleButton>
                                <ToggleButton className={classes.toggerNodeDetail} value="clusterTokenChangeLogs" disabled={nodeDetail.clusterRank ? false : true} onClick={(e) => { setTypeTokenChangeLogs(e.target.value) }}>Cluster</ToggleButton>
                            </ToggleButtonGroup>
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNodeDetail}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={openLinkDetail}
                        onClose={handleCloseLinkDetail}
                        disableScrollLock
                        scroll="paper"
                        // classes={{
                        //     scrollPaper: classes.topScrollPaper,
                        //     paperScrollBody: classes.topPaperScrollBody,
                        // }}
                        classes={{ paper: classes.nodeDetailBig }}
                        aria-labelledby="node-detail-title"
                        aria-describedby="node-detail-description"
                    >
                        <DialogTitle id="node-detail-title">Selected link</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <h5>#{linkDetail?.["sourceRank"]}: {linkDetail?.["source"]}</h5>
                            <h5>#{linkDetail?.["targetRank"]}: {linkDetail?.["target"]}</h5>
                            <h5>Average #{linkDetail?.["sourceRank"]} to #{linkDetail?.["targetRank"]}: {abbrNum(linkDetail?.["sourceToTarget"], 2)} (USD)</h5>
                            <h5>Average #{linkDetail?.["targetRank"]} to #{linkDetail?.["sourceRank"]}: {abbrNum(linkDetail?.["targetToSource"], 2)} (USD)</h5>
                            <h5>Transfer Change Logs: </h5>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 500 }}>
                                    <div style={{ overflow: 'auto', height: '520px' }}>
                                        <Table style={{ tableLayout: 'fixed' }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Time</TableCell>
                                                    <TableCell>Value in USD</TableCell>
                                                    <TableCell>Tokens</TableCell>
                                                    <TableCell>From</TableCell>
                                                    <TableCell>To</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 0
                                                    ? linkDetail?.['transferChangeLogs'].reverse().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : linkDetail?.['transferChangeLogs'].reverse()
                                                ).map((row) => (
                                                    <TableRow className={classes.tableRow} key={row.time}>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{timeConverter(row.time)}</TableCell>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{abbrNum(row.valueInUSD)}</TableCell>
                                                        <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.tokens}</TableCell>
                                                        <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.from}</TableCell>
                                                        <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.to}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[10]}
                                    component="div"
                                    count={linkDetail?.transferChangeLogs.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseLinkDetail}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                    <ForceGraph3D
                        height="100vh"
                        ref={fgRef}
                        graphData={{ "nodes": nodeGraph, "links": linkGraph }}
                        nodeLabel={node => `${node.id}: #${node.walletRank}`}
                        nodeAutoColorBy="clusterRank"
                        linkWidth={0.3}
                        linkAutoColorBy="clusterRank"
                        // linkDirectionalParticles={1}
                        // nodeThreeObjectExtend={true}
                        nodeVisibility={true}
                        nodeResolution={64}
                        // cooldownTicks={10} 
                        // nodeThreeObject={node => {
                        //     if (node.val % 6 == 0) {
                        //         node.val = 10
                        //         return node
                        //     } else {
                        //         return false
                        //     }
                        // }
                        onNodeClick={handleClickNode}
                        onLinkClick={handleClickLink}
                        backgroundColor="#000000"
                    />
                </div>
            </Box>
            <div className='button-change-size'>
                <Fab className='button-change-size-add' color="primary" aria-label="add">
                    <AddIcon onClick={handleIncreaseSize} />
                </Fab>
                <Fab className='button-change-size-remove' color="primary" aria-label="remove" sx={{ marginLeft: "20px" }}>
                    <RemoveIcon onClick={handleDecreaseSize} />
                </Fab>
            </div>
        </Fragment>
    );
}

function mapState(state) {
    const { RelationshipSpace } = state;
    return { RelationshipSpace };
}
const actions = {
    getWalletNodeRelationship: RelationshipSpaceActions.getWalletNodeRelationship,
    getWalletLinkRelationship: RelationshipSpaceActions.getWalletLinkRelationship,
    getClusterNodeRelationship: RelationshipSpaceActions.getClusterNodeRelationship,
    getClusterLinkRelationship: RelationshipSpaceActions.getClusterLinkRelationship,
    getListCluster: RelationshipSpaceActions.getListCluster,
    getClusterTokenChangeLogs: RelationshipSpaceActions.getClusterTokenChangeLogs,
    getTokenChangeLogs: RelationshipSpaceActions.getTokenChangeLogs,
    getLinkDetail: RelationshipSpaceActions.getLinkDetail,
    getTokenInfomation: RelationshipSpaceActions.getTokenInfomation
};

export default connect(mapState, actions)(RelationshipSpace);