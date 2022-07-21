
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
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
            backgroundColor:  "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
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

const rankWallets = [{ "id": "0x05cb5e3dd43eeabf2a94e3052cd29e641316b850", "val": 1, "clusterRank": 70, "clusterPercent": 0.0, "walletRank": 2502, "walletPercent": 0.0 }, { "id": "0x6b4be8938011a216183ae6814cec4ec59912d11d", "val": 1, "clusterRank": 70, "clusterPercent": 0.0, "walletRank": 2566, "walletPercent": 0.0 }, { "id": "0x11e033bf2f9d17ac619c7cdbe10cfbabc691c69e", "val": 60.0, "clusterRank": 10, "clusterPercent": 0.004, "walletRank": 272, "walletPercent": 0.0015 }, { "id": "0xba0c299cb93ad264c3082c2d6f9f9a98ee74b1c4", "val": 47.99999999999999, "clusterRank": 10, "clusterPercent": 0.004, "walletRank": 320, "walletPercent": 0.0012 }, { "id": "0x65d125516614fa12a8c001379da81f4261b0ba26", "val": 52.0, "clusterRank": 10, "clusterPercent": 0.004, "walletRank": 295, "walletPercent": 0.0013 }, { "id": "0xf77b2cbc6c0deb6a18da3eaee4183432c68fd0f9", "val": 304.0, "clusterRank": 4, "clusterPercent": 0.0167, "walletRank": 88, "walletPercent": 0.0076 }, { "id": "0xf06d70996d4977a7c77d2e92f7cced53ede63d87", "val": 368.0, "clusterRank": 4, "clusterPercent": 0.0167, "walletRank": 74, "walletPercent": 0.0092 }, { "id": "0xc35f76b2b278bff52ec989a0462a6ee8eedecb22", "val": 1, "clusterRank": 65, "clusterPercent": 0.0, "walletRank": 2171, "walletPercent": 0.0 }, { "id": "0xc6ae498c1cf12c2dfe78c3fa47fbbe8768e6b287", "val": 1, "clusterRank": 65, "clusterPercent": 0.0, "walletRank": 2538, "walletPercent": 0.0 }, { "id": "0x1969fa11e2abc2bde7b021c4b6073393f59b2c2f", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2168, "walletPercent": 0.0 }, { "id": "0x75e3c1073c71cb75b1735598fd85f81fdde551d6", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 3052, "walletPercent": 0.0 }, { "id": "0xfd960d41a5a6a1db98a01cdd0dbe224601652aa3", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2978, "walletPercent": 0.0 }, { "id": "0x72e44dec277b1cd5d0d60c9c6742b74900d927b3", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2290, "walletPercent": 0.0 }, { "id": "0xc7c2b55fe9640fc80003efac32f868c1ab031c5c", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2470, "walletPercent": 0.0 }, { "id": "0xfd7d2c1981fe9218117e58aecae71acf94c13a02", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2399, "walletPercent": 0.0 }, { "id": "0xd05cc98a1a62cea7f751d087b7a51fad52dabf55", "val": 1, "clusterRank": 46, "clusterPercent": 0.0, "walletRank": 2326, "walletPercent": 0.0 }, { "id": "0xdfd5c7f0c45c7bf72ec826017d2ce3204ed90fb9", "val": 1, "clusterRank": 51, "clusterPercent": 0.0, "walletRank": 2118, "walletPercent": 0.0 }, { "id": "0xbde45a77f6a861f4257d36f3c70e019cb28802f5", "val": 1, "clusterRank": 51, "clusterPercent": 0.0, "walletRank": 1922, "walletPercent": 0.0 }, { "id": "0xac6de9f16c7b9b44c4e5c9073c3a10fa45ab4d5a", "val": 628.0, "clusterRank": 7, "clusterPercent": 0.0158, "walletRank": 42, "walletPercent": 0.0157 }, { "id": "0x9df8dcbbb08ddded84363f080247636cf289a8ba", "val": 8.0, "clusterRank": 7, "clusterPercent": 0.0158, "walletRank": 979, "walletPercent": 0.0002 }, { "id": "0xd64fe807f353ba9644140e2dbb751543e29a690c", "val": 1, "clusterRank": 80, "clusterPercent": 0.0, "walletRank": 3001, "walletPercent": 0.0 }, { "id": "0x6f6b741309091dbf4e2559d84131985116ad5b53", "val": 1, "clusterRank": 80, "clusterPercent": 0.0, "walletRank": 2935, "walletPercent": 0.0 }, { "id": "0x07d8b7477270fa2374c5fcdd2e803b13779f3bf7", "val": 1, "clusterRank": 80, "clusterPercent": 0.0, "walletRank": 3084, "walletPercent": 0.0 }, { "id": "0xb4fe1255c7dd4913b7be927943cb29e97940b5bb", "val": 20.0, "clusterRank": 17, "clusterPercent": 0.0011, "walletRank": 531, "walletPercent": 0.0005 }, { "id": "0x20228722bd5bd76773ea234fe6e6ead748bc093e", "val": 23.999999999999996, "clusterRank": 17, "clusterPercent": 0.0011, "walletRank": 511, "walletPercent": 0.0006 }, { "id": "0xe6c085d07730605fc6cdaaa01831985025dcef14", "val": 1, "clusterRank": 76, "clusterPercent": 0.0, "walletRank": 2712, "walletPercent": 0.0 }, { "id": "0x6c7765f11b7619e8384651ce9c4a99a8c10ed15b", "val": 1, "clusterRank": 76, "clusterPercent": 0.0, "walletRank": 2608, "walletPercent": 0.0 }, { "id": "0xc1624611063682be948bd83aed9b321cc4855f5b", "val": 8.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 952, "walletPercent": 0.0002 }, { "id": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb", "val": 3000, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 13, "walletPercent": 0.1303 }, { "id": "0x4e4f1a51a1e77ac4b69d4207514a4a3fd40ca29e", "val": 11.999999999999998, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 717, "walletPercent": 0.0003 }, { "id": "0x5218a31e3f91a070e9ed08905ca2b4e4cd4ddef2", "val": 36.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 395, "walletPercent": 0.0009 }, { "id": "0x525913a93161c6d095966e71dd45c77c2fda8c96", "val": 1, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 2674, "walletPercent": 0.0 }, { "id": "0x388889c175fd227c011e643ce045d7c0b41e0d73", "val": 8.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 860, "walletPercent": 0.0002 }, { "id": "0x9d837a2f6e9e4e916c3ef127ab95436675dd7746", "val": 32.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 401, "walletPercent": 0.0008 }, { "id": "0x58826040a202b5882982d5d8c7bbed79172a9bee", "val": 132.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 159, "walletPercent": 0.0033 }, { "id": "0x204ce989162cb1fbc5ad8a605499b52361bb50a4", "val": 36.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 394, "walletPercent": 0.0009 }, { "id": "0xeedf61528f22f9755b2612d5d4545439ff8a2e9a", "val": 20.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 568, "walletPercent": 0.0005 }, { "id": "0x8832c14e275377cb55d0eca55190cf8d09a57b21", "val": 1, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 2452, "walletPercent": 0.0 }, { "id": "0x018b80c13684c481f72f09ac817a43bf1d3b776d", "val": 64.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 268, "walletPercent": 0.0016 }, { "id": "0x8fc0d4bd22292537181bf01bea6ad69db8ff5b35", "val": 8.0, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 792, "walletPercent": 0.0002 }, { "id": "0x4911c5abcd586f181b05d70020659e2f497c240c", "val": 47.99999999999999, "clusterRank": 3, "clusterPercent": 0.1403, "walletRank": 318, "walletPercent": 0.0012 }, { "id": "0xf0eaf711701ca012d0b7f566b8ebb32ec62f8931", "val": 1, "clusterRank": 36, "clusterPercent": 0.0002, "walletRank": 1835, "walletPercent": 0.0 }, { "id": "0x160ab7198b2ed60084883e06096997ae6ac0316b", "val": 4.0, "clusterRank": 36, "clusterPercent": 0.0002, "walletRank": 1082, "walletPercent": 0.0001 }, { "id": "0x7bbd92de6f4456fe4875f9df2287e44fa589f124", "val": 1, "clusterRank": 64, "clusterPercent": 0.0, "walletRank": 1987, "walletPercent": 0.0 }, { "id": "0x21bd5914a0ddb1e1400f74c4dab19892679eaace", "val": 1, "clusterRank": 64, "clusterPercent": 0.0, "walletRank": 3088, "walletPercent": 0.0 }, { "id": "0xbbb11ea2bb78a8e3424b63b9f7add18ffb9b4282", "val": 4.0, "clusterRank": 29, "clusterPercent": 0.0002, "walletRank": 1127, "walletPercent": 0.0001 }, { "id": "0x413b73eed10f7fbc312f28a00fbd53e8e46f006b", "val": 4.0, "clusterRank": 29, "clusterPercent": 0.0002, "walletRank": 1039, "walletPercent": 0.0001 }, { "id": "0x7cbab6f71098a12fe93f5d839f93e113ecd409db", "val": 28.0, "clusterRank": 12, "clusterPercent": 0.0023, "walletRank": 438, "walletPercent": 0.0007 }, { "id": "0xc67535ab55c2b6a07bc01f173bb6a89f5cbb1648", "val": 64.0, "clusterRank": 12, "clusterPercent": 0.0023, "walletRank": 264, "walletPercent": 0.0016 }, { "id": "0x1cfebaf7db3b9e77d987cce04581177ed9f8083e", "val": 1, "clusterRank": 66, "clusterPercent": 0.0, "walletRank": 3102, "walletPercent": 0.0 }, { "id": "0x19af654f499376f4ab999ca773a9713373cdea23", "val": 1, "clusterRank": 66, "clusterPercent": 0.0, "walletRank": 2099, "walletPercent": 0.0 }, { "id": "0x87e7084eb2521bf07ad898bf7a6d6f735315afb4", "val": 47.99999999999999, "clusterRank": 14, "clusterPercent": 0.0015, "walletRank": 311, "walletPercent": 0.0012 }, { "id": "0x89f8c80fbde215ff7a5664a2ebf48ec364700e93", "val": 11.999999999999998, "clusterRank": 14, "clusterPercent": 0.0015, "walletRank": 761, "walletPercent": 0.0003 }, { "id": "0x0ec393015f402ede5254518b71148089ce8e5e19", "val": 1, "clusterRank": 63, "clusterPercent": 0.0, "walletRank": 2511, "walletPercent": 0.0 }, { "id": "0x5771f8a94890882e9aa311e58076d060cc323fdc", "val": 1, "clusterRank": 63, "clusterPercent": 0.0, "walletRank": 2109, "walletPercent": 0.0 }, { "id": "0x379013ceddb91f49f1903b2b1e3352e742bb8a41", "val": 824.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 34, "walletPercent": 0.0206 }, { "id": "0x5d47695ebc626d32a71e6463ba05bcccc40c88e7", "val": 84.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 219, "walletPercent": 0.0021 }, { "id": "0x328130164d0f2b9d7a52edc73b3632e713ff0ec6", "val": 3000, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 11, "walletPercent": 0.1663 }, { "id": "0x7cddf1756f2ad562eb671a5bf8df2e6f0c1acbf8", "val": 344.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 77, "walletPercent": 0.0086 }, { "id": "0x48a714dd2a0aea09a84e3a3e35b056a2fdd1fed4", "val": 23.999999999999996, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 495, "walletPercent": 0.0006 }, { "id": "0xe9467ace4d7c70778b0fc7ad41b595a4c467ac46", "val": 132.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 160, "walletPercent": 0.0033 }, { "id": "0x849cb782d25f402333f27a6ad9ebd309a7069390", "val": 72.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 255, "walletPercent": 0.0018 }, { "id": "0x5cef4bdfb817afdebb7b9ee87ba5ca4076744833", "val": 16.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 599, "walletPercent": 0.0004 }, { "id": "0x1cb6ec47ed327925368d272532041e552d470fe8", "val": 160.0, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 132, "walletPercent": 0.004 }, { "id": "0x5692bd676eb69b0658b6438035d6bbc5bd2dc740", "val": 1, "clusterRank": 2, "clusterPercent": 0.2078, "walletRank": 2868, "walletPercent": 0.0 }, { "id": "0xeec4a7d27f75f469322123220ce8b8923c068c78", "val": 32.0, "clusterRank": 6, "clusterPercent": 0.0164, "walletRank": 422, "walletPercent": 0.0008 }, { "id": "0xc867431efb3b775b713219ebd852e7712107ce0f", "val": 628.0, "clusterRank": 6, "clusterPercent": 0.0164, "walletRank": 43, "walletPercent": 0.0157 }, { "id": "0x2e355be9e71a8023d20498fe8da3a223a6575d32", "val": 1, "clusterRank": 67, "clusterPercent": 0.0, "walletRank": 2447, "walletPercent": 0.0 }, { "id": "0x7926cfdc7f35c17f90a5a7f4b1738f4e96e9c978", "val": 1, "clusterRank": 67, "clusterPercent": 0.0, "walletRank": 2489, "walletPercent": 0.0 }, { "id": "0xfd2cdb9364394ab2cb9ad370595dbf33652f5355", "val": 1, "clusterRank": 67, "clusterPercent": 0.0, "walletRank": 2738, "walletPercent": 0.0 }, { "id": "0x1325e05944e3641528771ad5a1a6cd4fd7b8f2b8", "val": 136.0, "clusterRank": 9, "clusterPercent": 0.0045, "walletRank": 156, "walletPercent": 0.0034 }, { "id": "0x4118977459c934133649afb8235342030e3df31c", "val": 36.0, "clusterRank": 9, "clusterPercent": 0.0045, "walletRank": 382, "walletPercent": 0.0009 }, { "id": "0x4766faf9116bad2fd698a3cb68b1c269cfd17cce", "val": 8.0, "clusterRank": 9, "clusterPercent": 0.0045, "walletRank": 906, "walletPercent": 0.0002 }, { "id": "0x70a96201afa9e917998106c5a974180eedd34bf5", "val": 1, "clusterRank": 52, "clusterPercent": 0.0, "walletRank": 1720, "walletPercent": 0.0 }, { "id": "0xf216ffa3cfcc298c9f256914b2dc42a06363dfb0", "val": 1, "clusterRank": 52, "clusterPercent": 0.0, "walletRank": 3072, "walletPercent": 0.0 }, { "id": "0xdbff3e9b7f577d865757dda35c442460c04ef0e6", "val": 1, "clusterRank": 52, "clusterPercent": 0.0, "walletRank": 3041, "walletPercent": 0.0 }, { "id": "0xe300001ef7a1f046c9be82c7b4a043a60d539600", "val": 1, "clusterRank": 52, "clusterPercent": 0.0, "walletRank": 3091, "walletPercent": 0.0 }, { "id": "0xd24be96ad9238d24e521c411162f84c943ac2362", "val": 1, "clusterRank": 58, "clusterPercent": 0.0, "walletRank": 2271, "walletPercent": 0.0 }, { "id": "0x2bc8795c718666c135d5526d7543c4a1519f449a", "val": 1, "clusterRank": 58, "clusterPercent": 0.0, "walletRank": 2096, "walletPercent": 0.0 }, { "id": "0x489e24a235eccb7c0af205128e99fe6f0952ecad", "val": 28.0, "clusterRank": 18, "clusterPercent": 0.0011, "walletRank": 451, "walletPercent": 0.0007 }, { "id": "0xd077590c6ff9b23e28a92b5615d1872ff7389c71", "val": 16.0, "clusterRank": 18, "clusterPercent": 0.0011, "walletRank": 636, "walletPercent": 0.0004 }, { "id": "0x19dc1238669a0dd01c25f81ec4972428eed41c00", "val": 4.0, "clusterRank": 42, "clusterPercent": 0.0001, "walletRank": 1295, "walletPercent": 0.0001 }, { "id": "0xe4ba6fc98781577969426cd6cbe1beb7432f1c29", "val": 1, "clusterRank": 42, "clusterPercent": 0.0001, "walletRank": 3253, "walletPercent": 0.0 }, { "id": "0xae75331abce214195acdc6a2176e609943e5855f", "val": 8.0, "clusterRank": 35, "clusterPercent": 0.0002, "walletRank": 998, "walletPercent": 0.0002 }, { "id": "0x3293dc227589574c1356f1ab664bf4cfd9136251", "val": 1, "clusterRank": 35, "clusterPercent": 0.0002, "walletRank": 2842, "walletPercent": 0.0 }, { "id": "0x0aed874b7ea3c2400a8fb9424f1eba3802c85f21", "val": 8.0, "clusterRank": 30, "clusterPercent": 0.0002, "walletRank": 905, "walletPercent": 0.0002 }, { "id": "0x58b3360d28e3f570c97ad20246cfc74a622584ea", "val": 1, "clusterRank": 30, "clusterPercent": 0.0002, "walletRank": 3028, "walletPercent": 0.0 }, { "id": "0x7394d946516e128cdc20e47d411471f31e0aa5e0", "val": 1, "clusterRank": 41, "clusterPercent": 0.0001, "walletRank": 1750, "walletPercent": 0.0 }, { "id": "0x69becc424b8574e8a742e3f9c74839fa0dfcdc4f", "val": 4.0, "clusterRank": 41, "clusterPercent": 0.0001, "walletRank": 1435, "walletPercent": 0.0001 }, { "id": "0x972e73bf43dbd1ebe20415d366a4a1b0eafd8608", "val": 1, "clusterRank": 57, "clusterPercent": 0.0, "walletRank": 2862, "walletPercent": 0.0 }, { "id": "0xca374b0dbb5e93b037480b469b498469593824ba", "val": 1, "clusterRank": 57, "clusterPercent": 0.0, "walletRank": 2774, "walletPercent": 0.0 }, { "id": "0xa863679218221444f9f70ec79858ce2e7bc2ff51", "val": 1, "clusterRank": 57, "clusterPercent": 0.0, "walletRank": 1859, "walletPercent": 0.0 }, { "id": "0x557f8cb0471c1bfaf2ba2b8130d39a4c658fd30d", "val": 1, "clusterRank": 57, "clusterPercent": 0.0, "walletRank": 3090, "walletPercent": 0.0 }, { "id": "0xea8a6999a4f4575d97c0aae40dda30627e513282", "val": 1, "clusterRank": 45, "clusterPercent": 0.0001, "walletRank": 2535, "walletPercent": 0.0 }, { "id": "0xdb15ce856e2e9e0ecbd176c1b519a955647ba8c2", "val": 4.0, "clusterRank": 45, "clusterPercent": 0.0001, "walletRank": 1490, "walletPercent": 0.0001 }, { "id": "0x96461ef47d98372ab17dec3c9eb0f797a429d609", "val": 1, "clusterRank": 45, "clusterPercent": 0.0001, "walletRank": 2722, "walletPercent": 0.0 }, { "id": "0x7fa991505aca678ec67d8a21c201abc1065d52fa", "val": 8.0, "clusterRank": 31, "clusterPercent": 0.0002, "walletRank": 991, "walletPercent": 0.0002 }, { "id": "0xc3b403b4a7e9a6e4c16f18569366393f22bedee4", "val": 1, "clusterRank": 31, "clusterPercent": 0.0002, "walletRank": 1797, "walletPercent": 0.0 }, { "id": "0x5823034209eff2d47924f950b34fca247ce0ed51", "val": 1, "clusterRank": 31, "clusterPercent": 0.0002, "walletRank": 2431, "walletPercent": 0.0 }, { "id": "0x718af193fb684ec23925ca980b921751f54f44bb", "val": 1, "clusterRank": 75, "clusterPercent": 0.0, "walletRank": 3053, "walletPercent": 0.0 }, { "id": "0x513e8555ba15fbd55c5dee4f32ea47522b77581b", "val": 1, "clusterRank": 75, "clusterPercent": 0.0, "walletRank": 2482, "walletPercent": 0.0 }, { "id": "0x222cb589b62d322009467e95b7d341f2908f6bed", "val": 1, "clusterRank": 11, "clusterPercent": 0.0024, "walletRank": 2913, "walletPercent": 0.0 }, { "id": "0xd100803883c2815c9e7b02478eb39c2205112d03", "val": 1, "clusterRank": 11, "clusterPercent": 0.0024, "walletRank": 2882, "walletPercent": 0.0 }, { "id": "0x0124b3ef01938106bbe79f04462d6944d78b6ae2", "val": 16.0, "clusterRank": 11, "clusterPercent": 0.0024, "walletRank": 649, "walletPercent": 0.0004 }, { "id": "0x9181a08c4d6645d2d1651084a186dac2358c8cf5", "val": 76.0, "clusterRank": 11, "clusterPercent": 0.0024, "walletRank": 237, "walletPercent": 0.0019 }, { "id": "0x41b2462062ce02f8b358b4ff4593ede5c436aeaf", "val": 4.0, "clusterRank": 11, "clusterPercent": 0.0024, "walletRank": 1325, "walletPercent": 0.0001 }, { "id": "0xaab7c72705d6b4c648de31eff7f73bef5c6f8a7e", "val": 4.0, "clusterRank": 39, "clusterPercent": 0.0001, "walletRank": 1126, "walletPercent": 0.0001 }, { "id": "0xb58124690c91b98cc33ab22607f170da4cc1b8aa", "val": 1, "clusterRank": 39, "clusterPercent": 0.0001, "walletRank": 3260, "walletPercent": 0.0 }, { "id": "0x7648cce7cdb2563f8e415616280582a87543fa63", "val": 1, "clusterRank": 54, "clusterPercent": 0.0, "walletRank": 2264, "walletPercent": 0.0 }, { "id": "0x98175e49f745afbc60c0b8684a025af75cb6c08f", "val": 1, "clusterRank": 54, "clusterPercent": 0.0, "walletRank": 2263, "walletPercent": 0.0 }, { "id": "0x17555e2c9fda1e6686990b2d09947af9932e3daa", "val": 1, "clusterRank": 54, "clusterPercent": 0.0, "walletRank": 2266, "walletPercent": 0.0 }, { "id": "0xe7319c5b52fe96af5df611e14a734ae42588d40e", "val": 1, "clusterRank": 53, "clusterPercent": 0.0, "walletRank": 2505, "walletPercent": 0.0 }, { "id": "0x87b5393a73a9020ea287165962335759243c4cce", "val": 1, "clusterRank": 53, "clusterPercent": 0.0, "walletRank": 2055, "walletPercent": 0.0 }, { "id": "0xbf5b9bb09d0b4bb880660c92b8ed36273a65cd07", "val": 1, "clusterRank": 53, "clusterPercent": 0.0, "walletRank": 2293, "walletPercent": 0.0 }, { "id": "0xa93d2bab49c4359aaefa29d8772e908a0cbe1fa3", "val": 172.0, "clusterRank": 1, "clusterPercent": 2.9289, "walletRank": 128, "walletPercent": 0.0043 }, { "id": "0x865c77d4ff6383e06c58350a2cfb95cca2c0f056", "val": 3000, "clusterRank": 1, "clusterPercent": 2.9289, "walletRank": 3, "walletPercent": 2.9245 }, { "id": "0x8679478693bd24ceca8b1d86460ad74b60f3c474", "val": 1, "clusterRank": 60, "clusterPercent": 0.0, "walletRank": 2176, "walletPercent": 0.0 }, { "id": "0x9ad11d17db0ea6751abddd39b02a170e94436c04", "val": 1, "clusterRank": 60, "clusterPercent": 0.0, "walletRank": 2395, "walletPercent": 0.0 }, { "id": "0xd571362ccc3a6c7c9fd7b1b695b2bc2787db653b", "val": 1, "clusterRank": 78, "clusterPercent": 0.0, "walletRank": 2845, "walletPercent": 0.0 }, { "id": "0x47e7088f08b07675b0f23d4526e8e30bb2db6c2a", "val": 1, "clusterRank": 78, "clusterPercent": 0.0, "walletRank": 2918, "walletPercent": 0.0 }, { "id": "0x5ee950f09110e973877bf67946ff1bf026bccef5", "val": 1, "clusterRank": 78, "clusterPercent": 0.0, "walletRank": 3099, "walletPercent": 0.0 }, { "id": "0x8e50c4e7a23d66993754035144d1ae420f690459", "val": 1, "clusterRank": 59, "clusterPercent": 0.0, "walletRank": 2199, "walletPercent": 0.0 }, { "id": "0x92d01e8e9b4b95c78079c73c658a725f5fd4b7c5", "val": 1, "clusterRank": 59, "clusterPercent": 0.0, "walletRank": 2218, "walletPercent": 0.0 }, { "id": "0x620c2a5e975a71bb42bc6111920f5f1b41a6fde7", "val": 1, "clusterRank": 32, "clusterPercent": 0.0002, "walletRank": 3117, "walletPercent": 0.0 }, { "id": "0x2aa78857a7f95a3d414ccb721696499bb3ea9e28", "val": 8.0, "clusterRank": 32, "clusterPercent": 0.0002, "walletRank": 930, "walletPercent": 0.0002 }, { "id": "0x0229301caaabbc8b0b6b7422d8ad64101a9eefa5", "val": 1, "clusterRank": 50, "clusterPercent": 0.0, "walletRank": 1692, "walletPercent": 0.0 }, { "id": "0x1a71904ae3982399db693c60cb2e7e7c6b5dc16b", "val": 1, "clusterRank": 50, "clusterPercent": 0.0, "walletRank": 3054, "walletPercent": 0.0 }, { "id": "0x5ab6efef0760859061ecfd060b12ba3721424775", "val": 1, "clusterRank": 71, "clusterPercent": 0.0, "walletRank": 2416, "walletPercent": 0.0 }, { "id": "0x3ed574d292a7c6940dcdf2162e44bf43374d91c4", "val": 1, "clusterRank": 71, "clusterPercent": 0.0, "walletRank": 3074, "walletPercent": 0.0 }, { "id": "0x49bd56866a3f01e4f2301c2bf71c86b5e4d97513", "val": 1, "clusterRank": 61, "clusterPercent": 0.0, "walletRank": 2428, "walletPercent": 0.0 }, { "id": "0xfdb4c1004b20f54f54bc160c22415c7aebbd7344", "val": 1, "clusterRank": 61, "clusterPercent": 0.0, "walletRank": 2154, "walletPercent": 0.0 }, { "id": "0x9b649f2c888b364d984cb0bdcf029f9757170e38", "val": 4.0, "clusterRank": 44, "clusterPercent": 0.0001, "walletRank": 1492, "walletPercent": 0.0001 }, { "id": "0x13bafb58066eeb531e2e29700795f91d6388d4aa", "val": 1, "clusterRank": 44, "clusterPercent": 0.0001, "walletRank": 2400, "walletPercent": 0.0 }, { "id": "0x886834742aaa58033a697e5023e489449bac8ba8", "val": 304.0, "clusterRank": 8, "clusterPercent": 0.0076, "walletRank": 87, "walletPercent": 0.0076 }, { "id": "0xa6355adb4e10156bcde1c2d57684d42628d8fdda", "val": 1, "clusterRank": 8, "clusterPercent": 0.0076, "walletRank": 2691, "walletPercent": 0.0 }, { "id": "0xd99f85fb5e32235bb16eaedda78928765a36cda2", "val": 11.999999999999998, "clusterRank": 15, "clusterPercent": 0.0012, "walletRank": 713, "walletPercent": 0.0003 }, { "id": "0xa94239cb8ad9d83089079c4bf662e5ae8b41af63", "val": 36.0, "clusterRank": 15, "clusterPercent": 0.0012, "walletRank": 373, "walletPercent": 0.0009 }, { "id": "0x2727dc45dc776a70be546347f296cbffebfca5af", "val": 1, "clusterRank": 37, "clusterPercent": 0.0001, "walletRank": 2574, "walletPercent": 0.0 }, { "id": "0x236b9cd9045b56117c4767078137be6f0a26cfb5", "val": 4.0, "clusterRank": 37, "clusterPercent": 0.0001, "walletRank": 1026, "walletPercent": 0.0001 }, { "id": "0xf6b2d3278d80238337bdc1cf919a56068a6eca02", "val": 1, "clusterRank": 62, "clusterPercent": 0.0, "walletRank": 1967, "walletPercent": 0.0 }, { "id": "0x7dcf106329e5868adb4d567f06b58e355fe02631", "val": 1, "clusterRank": 62, "clusterPercent": 0.0, "walletRank": 2857, "walletPercent": 0.0 }, { "id": "0x8a51b88b4d9852791ff38c006796f93d4065bf65", "val": 1, "clusterRank": 47, "clusterPercent": 0.0, "walletRank": 1989, "walletPercent": 0.0 }, { "id": "0x7bdc02eb8db3deea28f316ba70d7aa6afc1052bd", "val": 1, "clusterRank": 47, "clusterPercent": 0.0, "walletRank": 1856, "walletPercent": 0.0 }, { "id": "0xc3d7da74df4d53110c2085b1c51aafd9632feb5c", "val": 1, "clusterRank": 49, "clusterPercent": 0.0, "walletRank": 1690, "walletPercent": 0.0 }, { "id": "0x92fb380be4fb40c50007514fef5ded83b6409c2e", "val": 1, "clusterRank": 49, "clusterPercent": 0.0, "walletRank": 2936, "walletPercent": 0.0 }, { "id": "0x75b9d23e3af080cbad358a494c38fede20db82f5", "val": 1, "clusterRank": 38, "clusterPercent": 0.0001, "walletRank": 3183, "walletPercent": 0.0 }, { "id": "0x80facff5ecb15f85e51da208024dd1afdf5f27fb", "val": 4.0, "clusterRank": 38, "clusterPercent": 0.0001, "walletRank": 1100, "walletPercent": 0.0001 }, { "id": "0x15d2f72b63392a48250977bfeb0efb64d301893f", "val": 4.0, "clusterRank": 16, "clusterPercent": 0.0012, "walletRank": 1310, "walletPercent": 0.0001 }, { "id": "0x4092dd7a62e78a8c0e760a4d063a30fb94c8edab", "val": 11.999999999999998, "clusterRank": 16, "clusterPercent": 0.0012, "walletRank": 787, "walletPercent": 0.0003 }, { "id": "0x80c2d1566c9735ab44fd1a10094f1ff471213187", "val": 36.0, "clusterRank": 16, "clusterPercent": 0.0012, "walletRank": 385, "walletPercent": 0.0009 }, { "id": "0x6fb24029d037b6d31e8ade8d0ef95694b354d8fe", "val": 4.0, "clusterRank": 43, "clusterPercent": 0.0001, "walletRank": 1414, "walletPercent": 0.0001 }, { "id": "0x49a07b6ae594a6f8713348c04338dbd6ce2781ee", "val": 1, "clusterRank": 43, "clusterPercent": 0.0001, "walletRank": 2227, "walletPercent": 0.0 }, { "id": "0xfb9ae9ac85510f02d6e95f959d4fa538ce5d89e1", "val": 1, "clusterRank": 26, "clusterPercent": 0.0003, "walletRank": 1796, "walletPercent": 0.0 }, { "id": "0xff38852304be2c14fdaa54078026f2d4f466c15a", "val": 8.0, "clusterRank": 26, "clusterPercent": 0.0003, "walletRank": 817, "walletPercent": 0.0002 }, { "id": "0x6ec720f0278f7ec50e5063611d4bae156b0c85b1", "val": 4.0, "clusterRank": 27, "clusterPercent": 0.0003, "walletRank": 1520, "walletPercent": 0.0001 }, { "id": "0xbbd0a6837b366d0f6cbcfb128ba6a2768e703d90", "val": 8.0, "clusterRank": 27, "clusterPercent": 0.0003, "walletRank": 841, "walletPercent": 0.0002 }, { "id": "0x4fe5477d8156e5d1a114cc92413cf1091e65e025", "val": 1, "clusterRank": 56, "clusterPercent": 0.0, "walletRank": 2368, "walletPercent": 0.0 }, { "id": "0x9817202b8cbbf8abc9a99d3b9a8952bf31d83982", "val": 1, "clusterRank": 56, "clusterPercent": 0.0, "walletRank": 1970, "walletPercent": 0.0 }, { "id": "0x5733a3a48a426bf6abc57d2be2be4587171cc092", "val": 1, "clusterRank": 13, "clusterPercent": 0.0019, "walletRank": 3128, "walletPercent": 0.0 }, { "id": "0x3ab9f6697f8fe32f51674d13d542b095c889ce09", "val": 76.0, "clusterRank": 13, "clusterPercent": 0.0019, "walletRank": 235, "walletPercent": 0.0019 }, { "id": "0xf7e15b37cb4e34ad6058d65f34aa569a3081c670", "val": 23.999999999999996, "clusterRank": 19, "clusterPercent": 0.0008, "walletRank": 497, "walletPercent": 0.0006 }, { "id": "0xe4b3c91ac4a26c64c30c7bebeebedc15edff4b15", "val": 8.0, "clusterRank": 19, "clusterPercent": 0.0008, "walletRank": 882, "walletPercent": 0.0002 }, { "id": "0x662b0da61b0b6ed8b23f0ce3c0af9fb8afc8e24e", "val": 4.0, "clusterRank": 34, "clusterPercent": 0.0002, "walletRank": 1178, "walletPercent": 0.0001 }, { "id": "0x1639b5a337c5be3776558e55b7ec55734fefad4d", "val": 4.0, "clusterRank": 34, "clusterPercent": 0.0002, "walletRank": 1526, "walletPercent": 0.0001 }, { "id": "0xea0f9ff8bbea582ab9e2bffac24d080b27cc9655", "val": 328.0, "clusterRank": 5, "clusterPercent": 0.0165, "walletRank": 82, "walletPercent": 0.0082 }, { "id": "0x3535f06b7b0e4e3edd03df13c40f6f778ecfe07f", "val": 328.0, "clusterRank": 5, "clusterPercent": 0.0165, "walletRank": 81, "walletPercent": 0.0082 }, { "id": "0x481d8ed46d9df32b2f366abc6d983aaf0042d962", "val": 1, "clusterRank": 48, "clusterPercent": 0.0, "walletRank": 1854, "walletPercent": 0.0 }, { "id": "0x5fd2e8c89119c74d5594fb11762004405dcb2d98", "val": 1, "clusterRank": 48, "clusterPercent": 0.0, "walletRank": 2220, "walletPercent": 0.0 }, { "id": "0xc90b9f4d7aeba63e82a542129067bf1e6f77f7a1", "val": 1, "clusterRank": 74, "clusterPercent": 0.0, "walletRank": 2481, "walletPercent": 0.0 }, { "id": "0x4ff4819b90ccee0b6e564ed280f202a071405eba", "val": 1, "clusterRank": 74, "clusterPercent": 0.0, "walletRank": 3047, "walletPercent": 0.0 }, { "id": "0x4b5b88b50493d605d2b83309464b0d42e35b6af7", "val": 1, "clusterRank": 77, "clusterPercent": 0.0, "walletRank": 2770, "walletPercent": 0.0 }, { "id": "0x639ff5d26c03dd8e67200500c8d0a8b0de188c3f", "val": 1, "clusterRank": 77, "clusterPercent": 0.0, "walletRank": 2861, "walletPercent": 0.0 }, { "id": "0x312656353e3a7fe08570b2fb3e05beba89edbe04", "val": 1, "clusterRank": 79, "clusterPercent": 0.0, "walletRank": 2979, "walletPercent": 0.0 }, { "id": "0xc4da67c40e4b3787abfeedbff6d2d30d4ce05322", "val": 1, "clusterRank": 79, "clusterPercent": 0.0, "walletRank": 2938, "walletPercent": 0.0 }, { "id": "0x1d95790a6f59b51cc366c89678f77693d59b63b0", "val": 16.0, "clusterRank": 22, "clusterPercent": 0.0005, "walletRank": 635, "walletPercent": 0.0004 }, { "id": "0xc3ae43c560ecd9a0ecbd734da4fbe6c0cc0ca924", "val": 8.0, "clusterRank": 22, "clusterPercent": 0.0005, "walletRank": 977, "walletPercent": 0.0002 }, { "id": "0xf0c8b9b67cd173bd8ba15797e990e639956dda58", "val": 8.0, "clusterRank": 24, "clusterPercent": 0.0003, "walletRank": 844, "walletPercent": 0.0002 }, { "id": "0x18af23c13eb3225e8089d0f65a8f75a48f6e4e44", "val": 4.0, "clusterRank": 24, "clusterPercent": 0.0003, "walletRank": 1099, "walletPercent": 0.0001 }, { "id": "0x990de96b5fcbf895a1a8b012050386c9f738c536", "val": 1, "clusterRank": 55, "clusterPercent": 0.0, "walletRank": 1992, "walletPercent": 0.0 }, { "id": "0x2fb9059fcdf16f69274ac742f725351c25fc07b7", "val": 1, "clusterRank": 55, "clusterPercent": 0.0, "walletRank": 2316, "walletPercent": 0.0 }, { "id": "0x39e4eb279194e09a6cf807590bb04b49f9bec583", "val": 1, "clusterRank": 28, "clusterPercent": 0.0003, "walletRank": 3269, "walletPercent": 0.0 }, { "id": "0x04c5301dab9fae4135d583c7f9a820557aa3f137", "val": 11.999999999999998, "clusterRank": 28, "clusterPercent": 0.0003, "walletRank": 785, "walletPercent": 0.0003 }, { "id": "0x7569b1f0a5b339543c86f0da4675bb06ab190ac4", "val": 16.0, "clusterRank": 23, "clusterPercent": 0.0004, "walletRank": 611, "walletPercent": 0.0004 }, { "id": "0x49744358c8d893266bf119ec83c3922503185c44", "val": 1, "clusterRank": 23, "clusterPercent": 0.0004, "walletRank": 2097, "walletPercent": 0.0 }, { "id": "0xcb7478cd1dfc7e1c25d06d2784ad8a3647b333b3", "val": 1, "clusterRank": 69, "clusterPercent": 0.0, "walletRank": 3281, "walletPercent": 0.0 }, { "id": "0x18590da5bae0d233d818e2ed4205a398c688638a", "val": 1, "clusterRank": 69, "clusterPercent": 0.0, "walletRank": 2339, "walletPercent": 0.0 }, { "id": "0xd4ab30886caa8c40f893ddf1a896c9c3eac000c9", "val": 1, "clusterRank": 72, "clusterPercent": 0.0, "walletRank": 2448, "walletPercent": 0.0 }, { "id": "0x60848c9da4d505d268c1bfac0643d245944db3b5", "val": 1, "clusterRank": 72, "clusterPercent": 0.0, "walletRank": 2877, "walletPercent": 0.0 }, { "id": "0xb047ea8de3bf5a9f5b69fb6984cb7a0b2888c066", "val": 1, "clusterRank": 68, "clusterPercent": 0.0, "walletRank": 3094, "walletPercent": 0.0 }, { "id": "0xabdf183f980d3b8f757ddaea2aa363b3899a80f8", "val": 1, "clusterRank": 68, "clusterPercent": 0.0, "walletRank": 2333, "walletPercent": 0.0 }, { "id": "0xea142dbea992f873562cb2fc8efbd2fedeee63bb", "val": 4.0, "clusterRank": 40, "clusterPercent": 0.0001, "walletRank": 1311, "walletPercent": 0.0001 }, { "id": "0x419ffa0a1bf53972ceb86aeba790d7303702b6ca", "val": 1, "clusterRank": 40, "clusterPercent": 0.0001, "walletRank": 1898, "walletPercent": 0.0 }, { "id": "0xb5189e17d3dedb230567a40de17ba919712a5f21", "val": 28.0, "clusterRank": 20, "clusterPercent": 0.0007, "walletRank": 452, "walletPercent": 0.0007 }, { "id": "0x402ab6d98c0d4c727d4ac94b1fcce9fabc2657c2", "val": 1, "clusterRank": 20, "clusterPercent": 0.0007, "walletRank": 3004, "walletPercent": 0.0 }, { "id": "0x3ee6d93bfdf9c4b8549f5080f1945311e61bcbc3", "val": 4.0, "clusterRank": 33, "clusterPercent": 0.0002, "walletRank": 1014, "walletPercent": 0.0001 }, { "id": "0x19e42b42e35013d8d1a9bf963ada13e1e16a2c2d", "val": 1, "clusterRank": 33, "clusterPercent": 0.0002, "walletRank": 1729, "walletPercent": 0.0 }, { "id": "0xa2ee31c1600d2e97bd73b03996fa5872020b9df7", "val": 1, "clusterRank": 73, "clusterPercent": 0.0, "walletRank": 2466, "walletPercent": 0.0 }, { "id": "0x4bafca2553ea042d721209fd759c616f61239149", "val": 1, "clusterRank": 73, "clusterPercent": 0.0, "walletRank": 2985, "walletPercent": 0.0 }, { "id": "0x950b81643ea603628a503f30a82948893eadd842", "val": 11.999999999999998, "clusterRank": 25, "clusterPercent": 0.0003, "walletRank": 746, "walletPercent": 0.0003 }, { "id": "0x45b5b5dc8fb995ccac94d419a014a79acca45ba6", "val": 1, "clusterRank": 25, "clusterPercent": 0.0003, "walletRank": 3130, "walletPercent": 0.0 }, { "id": "0x385c5ede6a40b29f39273825825d649b9f7380c2", "val": 8.0, "clusterRank": 21, "clusterPercent": 0.0007, "walletRank": 799, "walletPercent": 0.0002 }, { "id": "0x2502586e18242a64ff01273ee81182f95a580918", "val": 16.0, "clusterRank": 21, "clusterPercent": 0.0007, "walletRank": 588, "walletPercent": 0.0004 }];

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
    { rank: "c#2221", infomation: "#1 #2", value: "13.222%" },
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

const default_test = {
    "0x1291be54e72f7e001f6bbc331777710b4f2999e2_0x1591be54e72f7e001f6bbc331777710b4f2999ef": {
        "source": "0x8735fe4006d4f969737b948b268923b9018ecc52",
        "target": "0xdf97761eb48058d8c9800f97f9ff45e3a76983fe",
        "sourceRank": 1,
        "targetRank": 2,
        "sourceToTarget": 2000,
        "targetToSource": 23000,
        "transferChangeLogs": [{
            "time": 1633011823,
            "valueInUSD": 15841.320483548183,
            "tokens": "0x (3.884838006329056); ",
            "from": 15226,
            "to": 2139
        },
        {
            "time": 1635038613,
            "valueInUSD": 17861.03989287565,
            "tokens": "0x (29.497514315); ",
            "from": 2139,
            "to": 15226
        },
        {
            "time": 1640274375,
            "valueInUSD": 95.85872879859052,
            "tokens": "0x (0.02865731802648446); ",
            "from": 2139,
            "to": 15226
        },
        {
            "time": 1640718653,
            "valueInUSD": 11900,
            "tokens": "0xdac17f958d2ee523a2206206994597c13d831ec7 (11900); ",
            "from": 2139,
            "to": 15226
        },
        {
            "time": 1640721963,
            "valueInUSD": 3387.5558,
            "tokens": "0x (1.07); ",
            "from": 15226,
            "to": 2139
        },
        {
            "time": 1640722190,
            "valueInUSD": 419.80200062498653,
            "tokens": "0x43f11c02439e2736800433b4594994bd43cd066d (10164697.35169459); ",
            "from": 15226,
            "to": 2139
        },
        {
            "time": 1641301785,
            "valueInUSD": 636.1543146689006,
            "tokens": "0x249e38ea4102d0cf8264d3701f1a0e39c4f2dc3b (156303271.4174203); ",
            "from": 15226,
            "to": 2139
        },
        {
            "time": 1641737547,
            "valueInUSD": 8068.597500000001,
            "tokens": "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c (21.75); ",
            "from": 2139,
            "to": 15226
        }]
    }
}


function RelationshipSpace(props) {
    const clusterChangeLog = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    const [addressWallet, setAddressWallet] = useState("0x0be840390e363f5bd2d922ca59e7c4c2dc2001e5")
    const [clusterRank, setClusterRank] = useState(1)
    const [sourceAddress, setSourceAddress] = useState('0xdf97761eb48058d8c9800f97f9ff45e3a76983fe')
    const [targetAddress, setTargetAddress] = useState('0x8735fe4006d4f969737b948b268923b9018ecc52')

    const classes = useStyles();
    const theme = useTheme();

    const { RelationshipSpace } = props
    useEffect(() => {
        props.getWalletNodeRelationship('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        props.getWalletLinkRelationship('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        props.getClusterNodeRelationship('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        props.getClusterLinkRelationship('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        props.getListCluster('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        props.getTokenInfomation('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
    }, [])

    useEffect(() => {
        props.getTokenChangeLogs('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', addressWallet)
    }, [addressWallet])

    useEffect(() => {
        props.getClusterTokenChangeLogs('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', clusterRank)
    }, [clusterRank])

    // useEffect(() => {
    //     props.getLinkDetail('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', sourceAddress, targetAddress)
    // }, [sourceAddress, targetAddress])

    console.log(RelationshipSpace)

    let nodeGraphWallet = []
    let linkGraphWallet = []
    let nodeGraphWalletRank = []
    let nodeGraphWalletIn = []
    let nodeGraphWalletOut = []
    let linkGraphWalletRank = []

    if (RelationshipSpace?.walletNodeRelationship) {
        nodeGraphWalletRank = RelationshipSpace.walletNodeRelationship["rank"]
        nodeGraphWalletIn = RelationshipSpace.walletNodeRelationship["in"]
        nodeGraphWalletOut = RelationshipSpace.walletNodeRelationship["out"]
        linkGraphWalletRank = RelationshipSpace.walletLinkRelationship["rank"]
    }

    let walletTokenChangeLogs = []
    let clusterTokenChangeLogs = []
    if (RelationshipSpace?.walletTokenChangeLogs) {
        let objs = RelationshipSpace.walletTokenChangeLogs
        walletTokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
    }
    if (RelationshipSpace?.clusterTokenChangeLogs) {
        let objs = RelationshipSpace.clusterTokenChangeLogs
        clusterTokenChangeLogs = Object.keys(objs)
          .map(function (key) {
            return [parseInt(key), objs[key]];
          });
    }
    console.log(walletTokenChangeLogs)
    console.log(clusterTokenChangeLogs)

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
            setRowWallet(nodeGraphWalletRank)
        }
        else if (type == "in") {
            setRowWallet(nodeGraphWalletIn)
        }
        else {
            setRowWallet(nodeGraphWalletOut)
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

    const [lenLink, setLenLink] = useState(50)
    const fgRef = useRef();
    useEffect(() => {
        // forceRef.current.d3Force("collide", d3.forceCollide(13));
        fgRef.current.d3Force("charge").strength(-10);
        fgRef.current.d3Force("link").distance(lenLink);
        // fgRef.current.d3Force("charge").distanceMax(200);
    }, [lenLink]);

    useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 1;
        bloomPass.radius = 1;
        bloomPass.threshold = 0.7;
        fgRef.current.postProcessingComposer().addPass(bloomPass);
    }, []);


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
        handleClickOpenNodeDetail(node)
    }

    const handleSearchNode = (address) => {
        const result = nodeGraphWalletRank.filter(item =>
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
        console.log(link.source.id, link.target.id)
        handleClickOpenLinkDetail(link.source.id, link.target.id)

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
    const [nodeDetail, setNodeDetail] = useState({ "id": "1", "clusterRank": 1, "walletRank": 1, "clusterPercent": 1, "walletPercent": 1 })
    const handleClickOpenNodeDetail = (row) => {
        setNodeDetail(row)
        setOpenNodeDetail(true);
    };

    const handleCloseNodeDetail = () => {
        setOpenNodeDetail(false);
    };

    const [alignmentNodeDetail, setAlignmentNodeDetail] = useState("wallet");
    const handleChangeToggleNodeDetail = (event, newAlignment) => {
        setAlignmentNodeDetail(newAlignment);
    };

    const [dataChart, setDataChart] = useState();
    const handleTypeNodeDetail = (type) => {
        if (type === "wallet") {
            setDataChart(walletTokenChangeLogs)
        }
        else if (type === "cluster") {
            setDataChart(clusterTokenChangeLogs)
        }
    }

    let options = {
        chart: {
            backgroundColor: "#17171a",
            height: 300,
            width: 600
        },
        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'Token change logs',
            style: { color: "#a1a7bb", fontSize: "18px" },
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
            data: walletTokenChangeLogs,
            tooltip: {
                valueDecimals: 2
            }
        }]
    }
    // end node detail

    // start link detail
    const [openLinkDetail, setOpenLinkDetail] = useState(false);
    let linkDetail = default_test["0x1291be54e72f7e001f6bbc331777710b4f2999e2_0x1591be54e72f7e001f6bbc331777710b4f2999ef"]
    
    const handleClickOpenLinkDetail = (source, target) => {
        props.getLinkDetail('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', source, target)
        setOpenLinkDetail(true);
    };

    const handleCloseLinkDetail = () => {
        setOpenLinkDetail(false);
    };

    if (RelationshipSpace?.linkDetail) {
        linkDetail = RelationshipSpace.linkDetail
    }


    // const descriptionLinkDetailRef = useRef(null);
    // useEffect(() => {
    //     if (openLinkDetail) {
    //         const { current: descriptionLinkDetail } = descriptionLinkDetailRef;
    //         if (descriptionLinkDetail !== null) {
    //             descriptionLinkDetail.focus();
    //         }
    //     }
    // }, [openLinkDetail]);

    const [alignmentLinkDetail, setAlignmentLinkDetail] = useState("wallet");
    const handleChangeToggleLinkDetail = (event, newAlignment) => {
        setAlignmentLinkDetail(newAlignment);
    };
    // start link detail

    return (
        <Fragment>
            <Box style={{ maxHeight: '100vh' }}>

                <div className="relationship-space-container">
                    <Button className={classes.general} onClick={handleClickOpenGeneral('paper')}>
                        <span><img
                            className='logo'
                            src={"https://assets.coingecko.com/coins/images/17553/large/TRAVA_OFFICIAL_LOGO.png?1628509820"}
                            alt="Logo"
                        /></span>
                        <Typography variant="h5" ml={1}>Trava Finance (TRAVA)&nbsp;</Typography>
                        <span><MoreHorizIcon /></span>
                    </Button>

                    <Box style={{ position: "absolute", zIndex: 1000, top: 60, left: 30 }}>
                        <Typography variant="h6">Wallets: 4000</Typography>
                        <Typography variant="h6">Clusters: 300</Typography>
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
                                <h4>New wallets in month: 200</h4>
                                <h5>Total balance of new wallets in month: 2000 USD</h5>
                                <h5>Token amount of new wallets in month: 2000000000000 TRAVA</h5>

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseGeneral}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <Dropdown className={classes.dropdown} sx={{maxHeight: 100}}>
                        <Dropdown.Toggle className={classes.dropdownToggle}>
                            <Button>Menu</Button>
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
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                handleClickOpenNodeDetail(row)
                                                            }}>
                                                                <TableCell style={{ width: 20, overflow: "hidden" }} align="left">{row["walletRank"]}</TableCell>
                                                                <TableCell style={{ width: 100, overflow: "hidden" }} align="center">{addr(row["id"])}</TableCell>
                                                                <TableCell style={{ width: 80, overflow: "hidden" }} align="center">{row["walletTokenAmount"]}</TableCell>
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
                                                            ? nodeGraphWalletRank.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : nodeGraphWalletRank
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                            }}>
                                                                <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.walletRank}</TableCell>
                                                                <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.id}</TableCell>
                                                                <TableCell style={{ width: 40, overflow: "hidden" }} align="left">{row.walletPercent}</TableCell>
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
                            <h5>Address: {addr(nodeDetail["id"])}</h5>
                            <h5>Wallet rank: #{nodeDetail["walletRank"]}</h5>
                            <h5>Token amount in wallet: {abbrNum(nodeDetail["walletTokenAmount"], 2)}</h5>
                            <h5>Token amount per total supply : {nodeDetail["walletTokenTotalSupplyPercentage"]}%</h5>
                            <h5>Token amount in USD: {abbrNum(nodeDetail["walletTokenBalance"], 2)} USD</h5>
                            <h5>Total balance in wallet: {abbrNum(nodeDetail["walletTotalBalance"], 2)} USD</h5>
                            <h5>Token amount per total balance : {nodeDetail["walletTokenTotalBalancePercentage"]}%</h5>
                            <h5>Token change in month: {abbrNum(nodeDetail["walletTokenChange"], 2)}</h5>
                            <h4>Cluster</h4>
                            <h5>rank: #{nodeDetail["clusterRank"]}</h5>
                            <h5>Token amount in cluster: {abbrNum(nodeDetail["clusterTokenAmount"], 2)}</h5>
                            <h5>Token amount total supply : {nodeDetail["clusterTokenTotalSupplyPercentage"]}%</h5>
                            <h5>Token amount in USD: {abbrNum(nodeDetail["clusterTokenBalance"], 2)} USD</h5>
                            <h5>Total balance in cluster: {abbrNum(nodeDetail["clusterTotalBalance"], 2)} USD</h5>
                            <h5>Token amount per total balance : {nodeDetail["clusterTokenTotalBalancePercentage"]}%</h5>
                            <h5>Token change in month: {abbrNum(nodeDetail["clusterTokenChange"], 2)}</h5>

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
                        classes={{ paper: classes.nodeDetailBig }}
                        aria-labelledby="node-detail-title"
                        aria-describedby="node-detail-description"
                    >
                        <DialogTitle id="node-detail-title">Selected link</DialogTitle>
                        <DialogContent dividers={scroll === 'paper'}>
                            <h5>#{linkDetail["sourceRank"]}: {linkDetail["source"]}</h5>
                            <h5>#{linkDetail["targetRank"]}: {linkDetail["target"]}</h5>
                            <h5>Average #{linkDetail["sourceRank"]} to #{linkDetail["targetRank"]}: {abbrNum(linkDetail["sourceToTarget"], 2)} (USD)</h5>
                            <h5>Average #{linkDetail["targetRank"]} to #{linkDetail["sourceRank"]}: {abbrNum(linkDetail["targetToSource"], 2)} (USD)</h5>
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
                                                    ? linkDetail['transferChangeLogs'].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    : linkDetail['transferChangeLogs']
                                                ).map((row) => (
                                                    <TableRow className={classes.tableRow} key={row.time}>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{timeConverter(row.time)}</TableCell>
                                                        <TableCell style={{ width: 70, overflow: "hidden" }} align="left">{row.valueInUSD}</TableCell>
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
                        graphData={{ "nodes": nodeGraphWalletRank, "links": linkGraphWalletRank }}
                        nodeLabel={node => `${node.id}: #${node.walletRank}`}
                        nodeAutoColorBy="clusterRank"
                        // linkWidth={1}
                        // linkDirectionalParticles={1}
                        nodeThreeObjectExtend={true}
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
                <Fab className='button-change-size-remove' color="primary" aria-label="remove" sx={{marginLeft: "20px"}}>
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
    getLinkDetail: RelationshipSpaceActions.getLinkDetail,
    getTokenChangeLogs: RelationshipSpaceActions.getTokenChangeLogs,
    getTokenInfomation: RelationshipSpaceActions.getTokenInfomation
};

export default connect(mapState, actions)(RelationshipSpace);