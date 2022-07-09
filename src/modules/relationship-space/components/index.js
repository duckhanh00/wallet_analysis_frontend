
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { ForceGraph3D } from "react-force-graph";
import * as d3 from "d3";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Dropdown } from "react-bootstrap";
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { RelationGraphActions } from '../redux/actions'
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
        backgroundColor: "#616264",
        color: "#a1a7ac"
    },
    dropdownToggle: {
        backgroundColor: "#616264",
        color: "#a1a7ac",
        "&:hover": {
            backgroundColor: "#4a4b4e"
        },
        "&.dropdown-menu>li>a:focus": {
            backgroundColor: "white"
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
        position: 'absolute !important',
        left: 0,
        top: 170
    },
    toggerNodeDetail: {
        width: "50%"
    }
});

const rankWallets = [
    { rank: "#1", address: "0x1191be54e72f7e001f6bbc331777710b4f2999e1", value: 10.34 },
    { rank: "#2", address: "0x1291be54e72f7e001f6bbc331777710b4f2999e2", value: 0.34 },
    { rank: "#3", address: "0x1391be54e72f7e001f6bbc331777710b4f2999e3", value: 1.34 },
    { rank: "#4", address: "0x1491be54e72f7e001f6bbc331777710b4f2999ef", value: 10.42 },
    { rank: "#5", address: "0x1591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.34 },
    { rank: "#6", address: "0x1691be54e72f7e001f6bbc331777710b4f2999ef", value: 4.34 },
    { rank: "#7", address: "0x1791be54e72f7e001f6bbc331777710b4f2999ef", value: 5.34 },
    { rank: "#8", address: "0x1891be54e72f7e001f6bbc331777710b4f2999ef", value: 6.34 },
    { rank: "#9", address: "0x0991be54e72f7e001f6bbc331777710b4f2999ef", value: 7.34 },
    { rank: "#10", address: "0x20391be54e72f7e001f6bbc331777710b4f2999ef", value: 12.34 },
    { rank: "#11", address: "0x2291be54e72f7e001f6bbc331777710b4f2999ef", value: 9.34 },
    { rank: "#12", address: "0x2391be54e72f7e001f6bbc331777710b4f2999ef", value: 10.34 },
    { rank: "#13", address: "0x3491be54e72f7e001f6bbc331777710b4f2999ef", value: 8.34 },
    { rank: "#14", address: "0x0591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.20 },
    { rank: "#15", address: "0x4591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.9 },
    { rank: "#16", address: "0x6591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.345 },
    { rank: "#17", address: "0x6791be54e72f7e001f6bbc331777710b4f2999ef", value: 10.14 },
    { rank: "#18", address: "0x8791be54e72f7e001f6bbc331777710b4f2999ef", value: 9.45 }
];

const inWallets = [
    { rank: "#1", address: "0x1191be54e72f7e001f6bbc331777710b4f2999e1", value: 10.34 },
    { rank: "#2", address: "0x1291be54e72f7e001f6bbc331777710b4f2999e2", value: 0.34 },
    { rank: "#3", address: "0x1391be54e72f7e001f6bbc331777710b4f2999e3", value: 1.34 },
    { rank: "#in", address: "0x1491be54e72f7e001f6bbc331777710b4f2999ef", value: 10.42 },
    { rank: "#5", address: "0x1591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.34 },
    { rank: "#6", address: "0x1691be54e72f7e001f6bbc331777710b4f2999ef", value: 4.34 },
    { rank: "#7", address: "0x1791be54e72f7e001f6bbc331777710b4f2999ef", value: 5.34 },
    { rank: "#8", address: "0x1891be54e72f7e001f6bbc331777710b4f2999ef", value: 6.34 },
    { rank: "#9", address: "0x0991be54e72f7e001f6bbc331777710b4f2999ef", value: 7.34 },
    { rank: "#10", address: "0x20391be54e72f7e001f6bbc331777710b4f2999ef", value: 12.34 },
    { rank: "#11", address: "0x2291be54e72f7e001f6bbc331777710b4f2999ef", value: 9.34 },
    { rank: "#12", address: "0x2391be54e72f7e001f6bbc331777710b4f2999ef", value: 10.34 },
    { rank: "#13", address: "0x3491be54e72f7e001f6bbc331777710b4f2999ef", value: 8.34 },
    { rank: "#14", address: "0x0591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.20 },
    { rank: "#15", address: "0x4591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.9 },
    { rank: "#16", address: "0x6591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.345 },
    { rank: "#17", address: "0x6791be54e72f7e001f6bbc331777710b4f2999ef", value: 10.14 },
    { rank: "#18", address: "0x8791be54e72f7e001f6bbc331777710b4f2999ef", value: 9.45 }
];

const outWallets = [
    { rank: "#1", address: "0x1191be54e72f7e001f6bbc331777710b4f2999e1", value: 10.34 },
    { rank: "#2", address: "0x1291be54e72f7e001f6bbc331777710b4f2999e2", value: 0.34 },
    { rank: "#3", address: "0x1391be54e72f7e001f6bbc331777710b4f2999e3", value: 1.34 },
    { rank: "#out", address: "0x1491be54e72f7e001f6bbc331777710b4f2999ef", value: 10.42 },
    { rank: "#5", address: "0x1591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.34 },
    { rank: "#6", address: "0x1691be54e72f7e001f6bbc331777710b4f2999ef", value: 4.34 },
    { rank: "#7", address: "0x1791be54e72f7e001f6bbc331777710b4f2999ef", value: 5.34 },
    { rank: "#8", address: "0x1891be54e72f7e001f6bbc331777710b4f2999ef", value: 6.34 },
    { rank: "#9", address: "0x0991be54e72f7e001f6bbc331777710b4f2999ef", value: 7.34 },
    { rank: "#10", address: "0x20391be54e72f7e001f6bbc331777710b4f2999ef", value: 12.34 },
    { rank: "#11", address: "0x2291be54e72f7e001f6bbc331777710b4f2999ef", value: 9.34 },
    { rank: "#12", address: "0x2391be54e72f7e001f6bbc331777710b4f2999ef", value: 10.34 },
    { rank: "#13", address: "0x3491be54e72f7e001f6bbc331777710b4f2999ef", value: 8.34 },
    { rank: "#14", address: "0x0591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.20 },
    { rank: "#15", address: "0x4591be54e72f7e001f6bbc331777710b4f2999ef", value: 10.9 },
    { rank: "#16", address: "0x6591be54e72f7e001f6bbc331777710b4f2999ef", value: 3.345 },
    { rank: "#17", address: "0x6791be54e72f7e001f6bbc331777710b4f2999ef", value: 10.14 },
    { rank: "#18", address: "0x8791be54e72f7e001f6bbc331777710b4f2999ef", value: 9.45 }
];

const rankClusters = [
    { rank: "c#212", address: "#1 #2", value: "13.222%" },
    { rank: "c#2", address: "#4 #5", value: "13.222%" },
    { rank: "c#3", address: "#203 #324 #2343433, #2343433", value: "13.222%" },
    { rank: "c#4", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#5", address: "#203 #324 #2343433", value: "<0.01%" },
    { rank: "c#6", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "rank#7", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#8", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#9", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#10", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#11", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#12", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#13", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#14", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#15", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#16", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#17", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#18", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#123", address: "#203 #324 #2343433", value: "13.222%" }
]

const inClusters = [
    { rank: "c#2221", address: "#1 #2", value: "13.222%" },
    { rank: "c#2", address: "#4 #5", value: "13.222%" },
    { rank: "c#3", address: "#203 #324 #2343433, #2343433", value: "13.222%" },
    { rank: "c#4", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#5", address: "#203 #324 #2343433", value: "<0.01%" },
    { rank: "c#222", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "in#7", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#8", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#9", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#10", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#11", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#12", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#13", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#14", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#15", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#16", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#17", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#18", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#2222", address: "#203 #324 #2343433", value: "13.222%" }
]

const outClusters = [
    { rank: "c#1000", address: "#1 #2", value: "13.222%" },
    { rank: "c#2", address: "#4 #5", value: "13.222%" },
    { rank: "c#2222", address: "#203 #324 #2343433, #2343433", value: "13.222%" },
    { rank: "c#4", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#5", address: "#203 #324 #2343433", value: "<0.01%" },
    { rank: "out#6", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#7", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#8", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#9", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#10", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#11", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#12", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#13", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#14", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#15", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#16", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#17", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#18", address: "#203 #324 #2343433", value: "13.222%" },
    { rank: "c#1111", address: "#203 #324 #2343433", value: "13.222%" }
]

const clickToCluster = {
    "c#1000": "0x1391be54e72f7e001f6bbc331777710b4f2999e3"
}

const linkDetail = {
    "0x1291be54e72f7e001f6bbc331777710b4f2999e2_0x1591be54e72f7e001f6bbc331777710b4f2999ef": {
        "sourceRank": "#1",
        "targetRank": "#2",
        "sourceToTarget": 2000,
        "targetToSource": 23000,
        "transferChangeLogs": [{
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "fromTo": "#200000, #200000"
        }]
    }
}

function RelationGraph(props) {
    const walletChangeLog = [[9999999999, 9999999999], [9999999999, 9999999999], [9999999999, 9999999999], [9999999999, 9999999999], [9999999999, 9999999999], [9999999999, 9999999999]]
    const clusterChangeLog = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

    const classes = useStyles();
    const theme = useTheme();

    const { RelationGraph } = props
    useEffect(() => {
        // props.getCloseRelationEdges('trava', 'bsc'),
        props.getCloseRelationNodes('trava', 'bsc')
    }, [])

    // start menu 
    const [tabMenu, setTabMenu] = useState(0);
    const handleChangeTab = (event, newValue) => {
        setTabMenu(newValue);
    };

    const [alignment, setAlignment] = useState('rank');
    const handleChangeToggle = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [walletRows, setRowWallet] = useState(rankWallets);
    const [clusterRows, setRowCluster] = useState(rankClusters);
    const handleTypeWallet = (type) => {
        if (type === "rank") {
            setRowWallet(rankWallets)
        }
        else if (type == "in") {
            setRowWallet(inWallets)
        }
        else {
            setRowWallet(outWallets)
        }
    }

    const handleTypeCluster = (type) => {
        if (type === "rank") {
            setRowCluster(rankClusters)
        }
        else if (type == "in") {
            setRowCluster(inClusters)
        }
        else {
            setRowCluster(outClusters)
        }
    }


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
    let data_edges = {}
    if (RelationGraph?.closeRelationEdges) {
        data_edges = RelationGraph.closeRelationEdges
    }

    let data = {}
    if (RelationGraph?.closeRelationNodes) {
        data = RelationGraph.closeRelationNodes
    }

    const fgRef = useRef();
    useEffect(() => {
        // forceRef.current.d3Force("collide", d3.forceCollide(13));
        fgRef.current.d3Force("charge").strength(-10);
        fgRef.current.d3Force("link").distance(50);
        // fgRef.current.d3Force("charge").distanceMax(200);
    }, []);

    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 1;
        bloomPass.radius = 1;
        bloomPass.threshold = 0.1;
        fgRef.current.postProcessingComposer().addPass(bloomPass);
    }, []);

    // real 
    // const [nodes, setNodes] = useState([])
    // useEffect(() => {
    //     setNodes(data_nodes);s
    // }, [data_nodes]);

    // const [links, setLinks] = useState([])
    // useEffect(() => {
    //     setLinks(data_edges)
    // }, [data_edges]);


    // fake
    // const [link_detail, setLinkDetail] = useState({})
    // setLinkDetail(() => {
    //     setNodes(data_edges);
    // }, [data_edges]);

    const [nodes, setNodes] = useState([])
    useEffect(() => {
        setNodes(data['nodes']);
    }, [data]);

    const [links, setLinks] = useState([])
    useEffect(() => {
        setLinks(data['links']);
    }, [data]);

    const [graphData, setGraphData] = useState()
    useEffect(() => {
        let data = { "nodes": nodes, "links": links }
        setGraphData(data)
    }, [nodes, links])

    const [node_id, setSearchTerm] = useState("");
    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

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
    }

    const handleSearchNode = () => {
        const result = nodes.filter(item =>
            item['id'].includes(node_id)
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

        console.log(`${link.source.id}_${link.target.id}`)
    }


    const [node_info, setNodeInfo] = useState("");
    const handleNodeInfo = (e) => {
        setNodeInfo(e.target.value)
    }

    const handleAddNode = () => {
        const _node = { "id": "tst", "user": node_info, "val": 20 }
        nodes.push(_node)
        setNodes([...nodes])
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

    const [random, setRandom] = useState(1)
    const handleRandomColor = (item) => {
        if (0) {
            return ""
        }
        else return item["nodeColor"]
    }
    // end react force graph

    // start token general infomation 
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
    useEffect(() => {
        if (openGeneral) {
            const { current: descriptionGeneral } = descriptionGeneralRef;
            if (descriptionGeneral !== null) {
                descriptionGeneral.focus();
            }
        }
    }, [openGeneral]);
    // end token general infomation 

    // start node detail
    const [openNodeDetail, setOpenNodeDetail] = useState(false);
    const handleClickOpenNodeDetail = (address) => {
        console.log(address)
        setOpenNodeDetail(true);
    };

    const handleClickToCluster = (rank) => {
        console.log(clickToCluster[rank])
        setOpenNodeDetail(true);
    }

    const handleCloseNodeDetail = () => {
        setOpenNodeDetail(false);
    };

    const descriptionNodeDetailRef = useRef(null);
    useEffect(() => {
        if (openNodeDetail) {
            const { current: descriptionNodeDetail } = descriptionNodeDetailRef;
            if (descriptionNodeDetail !== null) {
                descriptionNodeDetail.focus();
            }
        }
    }, [openNodeDetail]);

    const [alignmentNodeDetail, setAlignmentNodeDetail] = useState("wallet");
    const handleChangeToggleNodeDetail = (event, newAlignment) => {
        setAlignmentNodeDetail(newAlignment);
    };

    const [dataChart, setDataChart] = useState();
    const handleTypeNodeDetail = (type) => {
        if (type === "wallet") {
            setDataChart(walletChangeLog)
        }
        else if (type === "cluster") {
            setDataChart(clusterChangeLog)
        }
    }

    let options = {
        chart: {
            backgroundColor: "#17171a",
            height: 300,
            width: 500
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Token change logs',
            style: { color: "#a1a7bb", fontSize: "18px" },
        },
        // subtitle: {
        //   text: "token change logs"
        // },
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
    // end node detail

    // start link detail
    const [openLinkDetail, setOpenLinkDetail] = useState(false);
    const handleClickOpenLinkDetail = (address) => {
        console.log(address)
        setOpenLinkDetail(true);
    };

    const handleCloseLinkDetail = () => {
        setOpenLinkDetail(false);
    };

    const descriptionLinkDetailRef = useRef(null);
    useEffect(() => {
        if (openLinkDetail) {
            const { current: descriptionLinkDetail } = descriptionLinkDetailRef;
            if (descriptionLinkDetail !== null) {
                descriptionLinkDetail.focus();
            }
        }
    }, [openLinkDetail]);

    const [alignmentLinkDetail, setAlignmentLinkDetail] = useState("wallet");
    const handleChangeToggleLinkDetail = (event, newAlignment) => {
        setAlignmentLinkDetail(newAlignment);
    };
    // start link detail

    return (
        <Fragment>
            <Box style={{ maxHeight: '100vh', position: "fixed" }}>

                <div className="relationship-space-container">
                    <Button className={classes.general} onClick={handleClickOpenGeneral('paper')}>
                        <span><img
                            className='logo'
                            src={"https://assets.coingecko.com/coins/images/17553/large/TRAVA_OFFICIAL_LOGO.png?1628509820"}
                            alt="Logo"
                        /></span>
                        <span>Trava Finance (TRAVA)&nbsp;</span>
                        <span><MoreHorizIcon /></span>
                    </Button>

                    <Box style={{ position: "absolute", zIndex: 1000, top: 60, left: 30 }}>
                        <h4>Wallets: 4000</h4>
                        <h4>Clusters: 300</h4>
                    </Box>

                    <Dialog
                        open={openGeneral}
                        onClose={handleCloseGeneral}
                        disableScrollLock
                        scroll={scroll}
                        aria-labelledby="general-title"
                        aria-describedby="general-description"
                    >
                        <DialogTitle id="general-title">Trava-Finance</DialogTitle>
                        <DialogContent
                            dividers={scroll === 'paper'}>
                            <DialogContentText
                                id="general-description"
                                ref={descriptionGeneralRef}
                                tabIndex={-1}
                            >
                                <h4>Wallets: 5000</h4>
                                <h4>Clusters: 200</h4>
                                <h4>Active wallets in month: 1000</h4>
                                <h4>Active wallets in quarter: 2000</h4>
                                <h4>New wallets in month: 2</h4>
                                <h5>&emsp;Total balance: 2000 USD</h5>
                                <h5>&emsp;Token amount: 2000000000000 TRAVA</h5>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseGeneral}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                    <div className='button-change-size'>
                        <Fab className='button-change-size' color="default" aria-label="add">
                            <AddIcon onClick={handleIncreaseSize} />
                        </Fab>
                        <Fab className='button-change-size' color="default" aria-label="remove">
                            <RemoveIcon onClick={handleDecreaseSize} />
                        </Fab>
                    </div>

                    <Dropdown className={classes.dropdown}>
                        <Dropdown.Toggle className={classes.dropdownToggle}>
                            Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Box
                                sx={{
                                    bgcolor: 'background.paper',
                                    width: 350,
                                    position: 'relative',
                                    minHeight: 200,
                                    maxHeight: 100
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
                                        <ToggleButton className={classes.togger} value="rank" onClick={(e) => { handleTypeWallet(e.target.value) }}>Rank</ToggleButton>
                                        <ToggleButton className={classes.togger} value="in" onClick={(e) => { handleTypeWallet(e.target.value) }}>In</ToggleButton>
                                        <ToggleButton className={classes.togger} value="out" onClick={(e) => { handleTypeWallet(e.target.value) }}>Out</ToggleButton>
                                    </ToggleButtonGroup>
                                    <SearchBar
                                        value={searchWallet}
                                        onChange={(searchVal) => requestSearchWallet(searchVal)}
                                        onCancelSearch={() => cancelSearchWallet()}
                                    />
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ maxHeight: 520 }}>
                                            <div style={{ overflow: 'auto', height: '520px' }}>
                                                <Table style={{ tableLayout: 'fixed' }}>
                                                    <TableBody>
                                                        {(rowsPerPage > 0
                                                            ? walletRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : walletRows
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.rank} onClick={() => {
                                                                handleClickOpenNodeDetail(row.address);
                                                            }}>
                                                                <TableCell style={{ width: 10, overflow: "hidden" }} align="left">{row.rank}</TableCell>
                                                                <TableCell style={{ width: 100, overflow: "hidden" }} align="left">{row.address}</TableCell>
                                                                <TableCell style={{ width: 10, overflow: "hidden" }} align="left">{row.value}</TableCell>
                                                            </TableRow>
                                                        ))}
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
                                        <ToggleButton className={classes.togger} value="rank" onClick={(e) => { handleTypeCluster(e.target.value) }}>Rank</ToggleButton>
                                        <ToggleButton className={classes.togger} value="in" onClick={(e) => { handleTypeCluster(e.target.value) }}>In</ToggleButton>
                                        <ToggleButton className={classes.togger} value="out" onClick={(e) => { handleTypeCluster(e.target.value) }}>Out</ToggleButton>
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
                                                        {(rowsPerPage > 0
                                                            ? clusterRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : clusterRows
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.rank} onClick={() => {
                                                                handleClickOpenLinkDetail(row.rank);
                                                            }}>
                                                                <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.rank}</TableCell>
                                                                <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.address}</TableCell>
                                                                <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.value}</TableCell>
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

                            <div className="dropdown-item">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    value={node_info}
                                    onChange={handleNodeInfo}
                                    className="dropdown-item"
                                />
                                <button onClick={handleAddNode}>
                                    Add node
                                </button>
                            </div>

                            <button value={"1"} onClick={handleSearchNode} className="dropdown-item">
                                <i>1</i>
                            </button>
                        </Dropdown.Menu>

                    </Dropdown>

                    <Dialog
                        open={openNodeDetail}
                        onClose={handleCloseNodeDetail}
                        disableScrollLock
                        scroll="paper"
                        // classes={{
                        //     scrollPaper: classes.topScrollPaper,
                        //     paperScrollBody: classes.topPaperScrollBody,
                        // }}
                        classes={{ paper: classes.nodeDetail }}
                        aria-labelledby="node-detail-title"
                        aria-describedby="node-detail-description"
                    >
                        <DialogTitle id="node-detail-title">Selected wallet</DialogTitle>
                        <DialogContent
                            dividers={scroll === 'paper'}>
                            {/* <DialogContentText
                                id="node-detail-description"
                                ref={descriptionNodeDetailRef}
                                tabIndex={-1}
                            >
                              { 
                                `Address: 0x1191be54e72f7e001f6bbc331777710b4f2999e1</h5>
                                Wallet rank: #1
                                Wallet percentage: 90%
                                Cluster rank: #2
                                Cluster percentage: 90%
                                Token amount: 10000000000000 TRAVA
                                Total balance: 10000 USD
                                Token change logs`}

                            </DialogContentText> */}

                            <h5>Address: 0x1191be54e72f7e001f6bbc331777710b4f2999e1</h5>
                            <h5>Wallet rank: #1</h5>
                            <h5>Wallet percentage: 90%</h5>
                            <h5>Token amount in wallet: 10000000000000 TRAVA</h5>
                            <h5>Total balance in wallet: 10000 USD</h5>
                            <h5>Cluster rank: #2</h5>
                            <h5>Cluster percentage: 95%</h5>
                            <h5>Token amount in cluster: 20000000000000 TRAVA</h5>
                            <h5>Total balance in cluster: 20000 USD</h5>
                            <ToggleButtonGroup
                                className={classes.toggerGroup}
                                color="standard"
                                value={alignmentNodeDetail}
                                exclusive={true}
                                onChange={handleChangeToggleNodeDetail}
                            >
                                <ToggleButton className={classes.toggerNodeDetail} value="wallet" onClick={(e) => { handleTypeNodeDetail(e.target.value) }}>Wallet</ToggleButton>
                                <ToggleButton className={classes.toggerNodeDetail} value="cluster" onClick={(e) => { handleTypeNodeDetail(e.target.value) }}>Cluster</ToggleButton>
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
                        classes={{ paper: classes.LinkDetail }}
                        aria-labelledby="node-detail-title"
                        aria-describedby="node-detail-description"
                    >
                        <DialogTitle id="node-detail-title">Selected link</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <h5>#1: 0x1191be54e72f7e001f6bbc331777710b4f2999e1</h5>
                            <h5>#343: 0x1191be54e72f7e001f6bbc331777710b4f212345</h5>
                            <h5>Average #1 -> #343: 20000 (USD)</h5>
                            <h5>Average #343 -> #1: 123123 (USD)</h5>
                            <h5>Transfer Change Logs: </h5>
                            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                <TableContainer sx={{ maxHeight: 500 }}>
                                    <div style={{ overflow: 'auto', height: '520px' }}>
                                        <Table style={{ tableLayout: 'fixed' }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Time</TableCell>
                                                    <TableCell>Balance (USD)</TableCell>
                                                    <TableCell>Tokens</TableCell>
                                                    <TableCell>From, To</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(rowsPerPage > 0
                                                    ? linkDetail['0x1291be54e72f7e001f6bbc331777710b4f2999e2_0x1591be54e72f7e001f6bbc331777710b4f2999ef']['transferChangeLogs'].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : linkDetail['0x1291be54e72f7e001f6bbc331777710b4f2999e2_0x1591be54e72f7e001f6bbc331777710b4f2999ef']['transferChangeLogs']
                                                ).map((row) => (
                                                    <TableRow className={classes.tableRow} key={row.time}>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.time}</TableCell>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.balanceInUSD}</TableCell>
                                                        <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.tokens}</TableCell>
                                                        <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.fromTo}</TableCell>
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseLinkDetail}>Cancel</Button>
                        </DialogActions>
                    </Dialog>


                    <ForceGraph3D
                        height="100vh"
                        ref={fgRef}
                        graphData={{ "nodes": nodes, "links": links }}
                        nodeLabel={node => `${node.id}: #${node.wallet_rank + 1}`}
                        nodeAutoColorBy="clusterRank"
                        // linkWidth={1}
                        // linkDirectionalParticles={1}
                        nodeThreeObjectExtend={true}
                        // nodeColor= {handleRandomColor(node)}
                        // nodeColor= {handleRandomColor(node)}
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
        </Fragment>
    );
}

function mapState(state) {
    const { RelationGraph } = state;
    return { RelationGraph };
}
const actions = {
    getCloseRelationEdges: RelationGraphActions.getCloseRelationEdges,
    getCloseRelationNodes: RelationGraphActions.getCloseRelationNodes
};

export default connect(mapState, actions)(RelationGraph);