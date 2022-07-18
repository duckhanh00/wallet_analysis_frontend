
import React, { Fragment, useEffect, useState, useRef, useCallback } from 'react';
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

const rankWallets = [{"id":"0x05cb5e3dd43eeabf2a94e3052cd29e641316b850","val":1,"clusterRank":70,"clusterPercent":0.0,"walletRank":2502,"walletPercent":0.0},{"id":"0x6b4be8938011a216183ae6814cec4ec59912d11d","val":1,"clusterRank":70,"clusterPercent":0.0,"walletRank":2566,"walletPercent":0.0},{"id":"0x11e033bf2f9d17ac619c7cdbe10cfbabc691c69e","val":60.0,"clusterRank":10,"clusterPercent":0.004,"walletRank":272,"walletPercent":0.0015},{"id":"0xba0c299cb93ad264c3082c2d6f9f9a98ee74b1c4","val":47.99999999999999,"clusterRank":10,"clusterPercent":0.004,"walletRank":320,"walletPercent":0.0012},{"id":"0x65d125516614fa12a8c001379da81f4261b0ba26","val":52.0,"clusterRank":10,"clusterPercent":0.004,"walletRank":295,"walletPercent":0.0013},{"id":"0xf77b2cbc6c0deb6a18da3eaee4183432c68fd0f9","val":304.0,"clusterRank":4,"clusterPercent":0.0167,"walletRank":88,"walletPercent":0.0076},{"id":"0xf06d70996d4977a7c77d2e92f7cced53ede63d87","val":368.0,"clusterRank":4,"clusterPercent":0.0167,"walletRank":74,"walletPercent":0.0092},{"id":"0xc35f76b2b278bff52ec989a0462a6ee8eedecb22","val":1,"clusterRank":65,"clusterPercent":0.0,"walletRank":2171,"walletPercent":0.0},{"id":"0xc6ae498c1cf12c2dfe78c3fa47fbbe8768e6b287","val":1,"clusterRank":65,"clusterPercent":0.0,"walletRank":2538,"walletPercent":0.0},{"id":"0x1969fa11e2abc2bde7b021c4b6073393f59b2c2f","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2168,"walletPercent":0.0},{"id":"0x75e3c1073c71cb75b1735598fd85f81fdde551d6","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":3052,"walletPercent":0.0},{"id":"0xfd960d41a5a6a1db98a01cdd0dbe224601652aa3","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2978,"walletPercent":0.0},{"id":"0x72e44dec277b1cd5d0d60c9c6742b74900d927b3","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2290,"walletPercent":0.0},{"id":"0xc7c2b55fe9640fc80003efac32f868c1ab031c5c","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2470,"walletPercent":0.0},{"id":"0xfd7d2c1981fe9218117e58aecae71acf94c13a02","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2399,"walletPercent":0.0},{"id":"0xd05cc98a1a62cea7f751d087b7a51fad52dabf55","val":1,"clusterRank":46,"clusterPercent":0.0,"walletRank":2326,"walletPercent":0.0},{"id":"0xdfd5c7f0c45c7bf72ec826017d2ce3204ed90fb9","val":1,"clusterRank":51,"clusterPercent":0.0,"walletRank":2118,"walletPercent":0.0},{"id":"0xbde45a77f6a861f4257d36f3c70e019cb28802f5","val":1,"clusterRank":51,"clusterPercent":0.0,"walletRank":1922,"walletPercent":0.0},{"id":"0xac6de9f16c7b9b44c4e5c9073c3a10fa45ab4d5a","val":628.0,"clusterRank":7,"clusterPercent":0.0158,"walletRank":42,"walletPercent":0.0157},{"id":"0x9df8dcbbb08ddded84363f080247636cf289a8ba","val":8.0,"clusterRank":7,"clusterPercent":0.0158,"walletRank":979,"walletPercent":0.0002},{"id":"0xd64fe807f353ba9644140e2dbb751543e29a690c","val":1,"clusterRank":80,"clusterPercent":0.0,"walletRank":3001,"walletPercent":0.0},{"id":"0x6f6b741309091dbf4e2559d84131985116ad5b53","val":1,"clusterRank":80,"clusterPercent":0.0,"walletRank":2935,"walletPercent":0.0},{"id":"0x07d8b7477270fa2374c5fcdd2e803b13779f3bf7","val":1,"clusterRank":80,"clusterPercent":0.0,"walletRank":3084,"walletPercent":0.0},{"id":"0xb4fe1255c7dd4913b7be927943cb29e97940b5bb","val":20.0,"clusterRank":17,"clusterPercent":0.0011,"walletRank":531,"walletPercent":0.0005},{"id":"0x20228722bd5bd76773ea234fe6e6ead748bc093e","val":23.999999999999996,"clusterRank":17,"clusterPercent":0.0011,"walletRank":511,"walletPercent":0.0006},{"id":"0xe6c085d07730605fc6cdaaa01831985025dcef14","val":1,"clusterRank":76,"clusterPercent":0.0,"walletRank":2712,"walletPercent":0.0},{"id":"0x6c7765f11b7619e8384651ce9c4a99a8c10ed15b","val":1,"clusterRank":76,"clusterPercent":0.0,"walletRank":2608,"walletPercent":0.0},{"id":"0xc1624611063682be948bd83aed9b321cc4855f5b","val":8.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":952,"walletPercent":0.0002},{"id":"0x4982085c9e2f89f2ecb8131eca71afad896e89cb","val":3000,"clusterRank":3,"clusterPercent":0.1403,"walletRank":13,"walletPercent":0.1303},{"id":"0x4e4f1a51a1e77ac4b69d4207514a4a3fd40ca29e","val":11.999999999999998,"clusterRank":3,"clusterPercent":0.1403,"walletRank":717,"walletPercent":0.0003},{"id":"0x5218a31e3f91a070e9ed08905ca2b4e4cd4ddef2","val":36.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":395,"walletPercent":0.0009},{"id":"0x525913a93161c6d095966e71dd45c77c2fda8c96","val":1,"clusterRank":3,"clusterPercent":0.1403,"walletRank":2674,"walletPercent":0.0},{"id":"0x388889c175fd227c011e643ce045d7c0b41e0d73","val":8.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":860,"walletPercent":0.0002},{"id":"0x9d837a2f6e9e4e916c3ef127ab95436675dd7746","val":32.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":401,"walletPercent":0.0008},{"id":"0x58826040a202b5882982d5d8c7bbed79172a9bee","val":132.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":159,"walletPercent":0.0033},{"id":"0x204ce989162cb1fbc5ad8a605499b52361bb50a4","val":36.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":394,"walletPercent":0.0009},{"id":"0xeedf61528f22f9755b2612d5d4545439ff8a2e9a","val":20.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":568,"walletPercent":0.0005},{"id":"0x8832c14e275377cb55d0eca55190cf8d09a57b21","val":1,"clusterRank":3,"clusterPercent":0.1403,"walletRank":2452,"walletPercent":0.0},{"id":"0x018b80c13684c481f72f09ac817a43bf1d3b776d","val":64.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":268,"walletPercent":0.0016},{"id":"0x8fc0d4bd22292537181bf01bea6ad69db8ff5b35","val":8.0,"clusterRank":3,"clusterPercent":0.1403,"walletRank":792,"walletPercent":0.0002},{"id":"0x4911c5abcd586f181b05d70020659e2f497c240c","val":47.99999999999999,"clusterRank":3,"clusterPercent":0.1403,"walletRank":318,"walletPercent":0.0012},{"id":"0xf0eaf711701ca012d0b7f566b8ebb32ec62f8931","val":1,"clusterRank":36,"clusterPercent":0.0002,"walletRank":1835,"walletPercent":0.0},{"id":"0x160ab7198b2ed60084883e06096997ae6ac0316b","val":4.0,"clusterRank":36,"clusterPercent":0.0002,"walletRank":1082,"walletPercent":0.0001},{"id":"0x7bbd92de6f4456fe4875f9df2287e44fa589f124","val":1,"clusterRank":64,"clusterPercent":0.0,"walletRank":1987,"walletPercent":0.0},{"id":"0x21bd5914a0ddb1e1400f74c4dab19892679eaace","val":1,"clusterRank":64,"clusterPercent":0.0,"walletRank":3088,"walletPercent":0.0},{"id":"0xbbb11ea2bb78a8e3424b63b9f7add18ffb9b4282","val":4.0,"clusterRank":29,"clusterPercent":0.0002,"walletRank":1127,"walletPercent":0.0001},{"id":"0x413b73eed10f7fbc312f28a00fbd53e8e46f006b","val":4.0,"clusterRank":29,"clusterPercent":0.0002,"walletRank":1039,"walletPercent":0.0001},{"id":"0x7cbab6f71098a12fe93f5d839f93e113ecd409db","val":28.0,"clusterRank":12,"clusterPercent":0.0023,"walletRank":438,"walletPercent":0.0007},{"id":"0xc67535ab55c2b6a07bc01f173bb6a89f5cbb1648","val":64.0,"clusterRank":12,"clusterPercent":0.0023,"walletRank":264,"walletPercent":0.0016},{"id":"0x1cfebaf7db3b9e77d987cce04581177ed9f8083e","val":1,"clusterRank":66,"clusterPercent":0.0,"walletRank":3102,"walletPercent":0.0},{"id":"0x19af654f499376f4ab999ca773a9713373cdea23","val":1,"clusterRank":66,"clusterPercent":0.0,"walletRank":2099,"walletPercent":0.0},{"id":"0x87e7084eb2521bf07ad898bf7a6d6f735315afb4","val":47.99999999999999,"clusterRank":14,"clusterPercent":0.0015,"walletRank":311,"walletPercent":0.0012},{"id":"0x89f8c80fbde215ff7a5664a2ebf48ec364700e93","val":11.999999999999998,"clusterRank":14,"clusterPercent":0.0015,"walletRank":761,"walletPercent":0.0003},{"id":"0x0ec393015f402ede5254518b71148089ce8e5e19","val":1,"clusterRank":63,"clusterPercent":0.0,"walletRank":2511,"walletPercent":0.0},{"id":"0x5771f8a94890882e9aa311e58076d060cc323fdc","val":1,"clusterRank":63,"clusterPercent":0.0,"walletRank":2109,"walletPercent":0.0},{"id":"0x379013ceddb91f49f1903b2b1e3352e742bb8a41","val":824.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":34,"walletPercent":0.0206},{"id":"0x5d47695ebc626d32a71e6463ba05bcccc40c88e7","val":84.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":219,"walletPercent":0.0021},{"id":"0x328130164d0f2b9d7a52edc73b3632e713ff0ec6","val":3000,"clusterRank":2,"clusterPercent":0.2078,"walletRank":11,"walletPercent":0.1663},{"id":"0x7cddf1756f2ad562eb671a5bf8df2e6f0c1acbf8","val":344.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":77,"walletPercent":0.0086},{"id":"0x48a714dd2a0aea09a84e3a3e35b056a2fdd1fed4","val":23.999999999999996,"clusterRank":2,"clusterPercent":0.2078,"walletRank":495,"walletPercent":0.0006},{"id":"0xe9467ace4d7c70778b0fc7ad41b595a4c467ac46","val":132.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":160,"walletPercent":0.0033},{"id":"0x849cb782d25f402333f27a6ad9ebd309a7069390","val":72.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":255,"walletPercent":0.0018},{"id":"0x5cef4bdfb817afdebb7b9ee87ba5ca4076744833","val":16.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":599,"walletPercent":0.0004},{"id":"0x1cb6ec47ed327925368d272532041e552d470fe8","val":160.0,"clusterRank":2,"clusterPercent":0.2078,"walletRank":132,"walletPercent":0.004},{"id":"0x5692bd676eb69b0658b6438035d6bbc5bd2dc740","val":1,"clusterRank":2,"clusterPercent":0.2078,"walletRank":2868,"walletPercent":0.0},{"id":"0xeec4a7d27f75f469322123220ce8b8923c068c78","val":32.0,"clusterRank":6,"clusterPercent":0.0164,"walletRank":422,"walletPercent":0.0008},{"id":"0xc867431efb3b775b713219ebd852e7712107ce0f","val":628.0,"clusterRank":6,"clusterPercent":0.0164,"walletRank":43,"walletPercent":0.0157},{"id":"0x2e355be9e71a8023d20498fe8da3a223a6575d32","val":1,"clusterRank":67,"clusterPercent":0.0,"walletRank":2447,"walletPercent":0.0},{"id":"0x7926cfdc7f35c17f90a5a7f4b1738f4e96e9c978","val":1,"clusterRank":67,"clusterPercent":0.0,"walletRank":2489,"walletPercent":0.0},{"id":"0xfd2cdb9364394ab2cb9ad370595dbf33652f5355","val":1,"clusterRank":67,"clusterPercent":0.0,"walletRank":2738,"walletPercent":0.0},{"id":"0x1325e05944e3641528771ad5a1a6cd4fd7b8f2b8","val":136.0,"clusterRank":9,"clusterPercent":0.0045,"walletRank":156,"walletPercent":0.0034},{"id":"0x4118977459c934133649afb8235342030e3df31c","val":36.0,"clusterRank":9,"clusterPercent":0.0045,"walletRank":382,"walletPercent":0.0009},{"id":"0x4766faf9116bad2fd698a3cb68b1c269cfd17cce","val":8.0,"clusterRank":9,"clusterPercent":0.0045,"walletRank":906,"walletPercent":0.0002},{"id":"0x70a96201afa9e917998106c5a974180eedd34bf5","val":1,"clusterRank":52,"clusterPercent":0.0,"walletRank":1720,"walletPercent":0.0},{"id":"0xf216ffa3cfcc298c9f256914b2dc42a06363dfb0","val":1,"clusterRank":52,"clusterPercent":0.0,"walletRank":3072,"walletPercent":0.0},{"id":"0xdbff3e9b7f577d865757dda35c442460c04ef0e6","val":1,"clusterRank":52,"clusterPercent":0.0,"walletRank":3041,"walletPercent":0.0},{"id":"0xe300001ef7a1f046c9be82c7b4a043a60d539600","val":1,"clusterRank":52,"clusterPercent":0.0,"walletRank":3091,"walletPercent":0.0},{"id":"0xd24be96ad9238d24e521c411162f84c943ac2362","val":1,"clusterRank":58,"clusterPercent":0.0,"walletRank":2271,"walletPercent":0.0},{"id":"0x2bc8795c718666c135d5526d7543c4a1519f449a","val":1,"clusterRank":58,"clusterPercent":0.0,"walletRank":2096,"walletPercent":0.0},{"id":"0x489e24a235eccb7c0af205128e99fe6f0952ecad","val":28.0,"clusterRank":18,"clusterPercent":0.0011,"walletRank":451,"walletPercent":0.0007},{"id":"0xd077590c6ff9b23e28a92b5615d1872ff7389c71","val":16.0,"clusterRank":18,"clusterPercent":0.0011,"walletRank":636,"walletPercent":0.0004},{"id":"0x19dc1238669a0dd01c25f81ec4972428eed41c00","val":4.0,"clusterRank":42,"clusterPercent":0.0001,"walletRank":1295,"walletPercent":0.0001},{"id":"0xe4ba6fc98781577969426cd6cbe1beb7432f1c29","val":1,"clusterRank":42,"clusterPercent":0.0001,"walletRank":3253,"walletPercent":0.0},{"id":"0xae75331abce214195acdc6a2176e609943e5855f","val":8.0,"clusterRank":35,"clusterPercent":0.0002,"walletRank":998,"walletPercent":0.0002},{"id":"0x3293dc227589574c1356f1ab664bf4cfd9136251","val":1,"clusterRank":35,"clusterPercent":0.0002,"walletRank":2842,"walletPercent":0.0},{"id":"0x0aed874b7ea3c2400a8fb9424f1eba3802c85f21","val":8.0,"clusterRank":30,"clusterPercent":0.0002,"walletRank":905,"walletPercent":0.0002},{"id":"0x58b3360d28e3f570c97ad20246cfc74a622584ea","val":1,"clusterRank":30,"clusterPercent":0.0002,"walletRank":3028,"walletPercent":0.0},{"id":"0x7394d946516e128cdc20e47d411471f31e0aa5e0","val":1,"clusterRank":41,"clusterPercent":0.0001,"walletRank":1750,"walletPercent":0.0},{"id":"0x69becc424b8574e8a742e3f9c74839fa0dfcdc4f","val":4.0,"clusterRank":41,"clusterPercent":0.0001,"walletRank":1435,"walletPercent":0.0001},{"id":"0x972e73bf43dbd1ebe20415d366a4a1b0eafd8608","val":1,"clusterRank":57,"clusterPercent":0.0,"walletRank":2862,"walletPercent":0.0},{"id":"0xca374b0dbb5e93b037480b469b498469593824ba","val":1,"clusterRank":57,"clusterPercent":0.0,"walletRank":2774,"walletPercent":0.0},{"id":"0xa863679218221444f9f70ec79858ce2e7bc2ff51","val":1,"clusterRank":57,"clusterPercent":0.0,"walletRank":1859,"walletPercent":0.0},{"id":"0x557f8cb0471c1bfaf2ba2b8130d39a4c658fd30d","val":1,"clusterRank":57,"clusterPercent":0.0,"walletRank":3090,"walletPercent":0.0},{"id":"0xea8a6999a4f4575d97c0aae40dda30627e513282","val":1,"clusterRank":45,"clusterPercent":0.0001,"walletRank":2535,"walletPercent":0.0},{"id":"0xdb15ce856e2e9e0ecbd176c1b519a955647ba8c2","val":4.0,"clusterRank":45,"clusterPercent":0.0001,"walletRank":1490,"walletPercent":0.0001},{"id":"0x96461ef47d98372ab17dec3c9eb0f797a429d609","val":1,"clusterRank":45,"clusterPercent":0.0001,"walletRank":2722,"walletPercent":0.0},{"id":"0x7fa991505aca678ec67d8a21c201abc1065d52fa","val":8.0,"clusterRank":31,"clusterPercent":0.0002,"walletRank":991,"walletPercent":0.0002},{"id":"0xc3b403b4a7e9a6e4c16f18569366393f22bedee4","val":1,"clusterRank":31,"clusterPercent":0.0002,"walletRank":1797,"walletPercent":0.0},{"id":"0x5823034209eff2d47924f950b34fca247ce0ed51","val":1,"clusterRank":31,"clusterPercent":0.0002,"walletRank":2431,"walletPercent":0.0},{"id":"0x718af193fb684ec23925ca980b921751f54f44bb","val":1,"clusterRank":75,"clusterPercent":0.0,"walletRank":3053,"walletPercent":0.0},{"id":"0x513e8555ba15fbd55c5dee4f32ea47522b77581b","val":1,"clusterRank":75,"clusterPercent":0.0,"walletRank":2482,"walletPercent":0.0},{"id":"0x222cb589b62d322009467e95b7d341f2908f6bed","val":1,"clusterRank":11,"clusterPercent":0.0024,"walletRank":2913,"walletPercent":0.0},{"id":"0xd100803883c2815c9e7b02478eb39c2205112d03","val":1,"clusterRank":11,"clusterPercent":0.0024,"walletRank":2882,"walletPercent":0.0},{"id":"0x0124b3ef01938106bbe79f04462d6944d78b6ae2","val":16.0,"clusterRank":11,"clusterPercent":0.0024,"walletRank":649,"walletPercent":0.0004},{"id":"0x9181a08c4d6645d2d1651084a186dac2358c8cf5","val":76.0,"clusterRank":11,"clusterPercent":0.0024,"walletRank":237,"walletPercent":0.0019},{"id":"0x41b2462062ce02f8b358b4ff4593ede5c436aeaf","val":4.0,"clusterRank":11,"clusterPercent":0.0024,"walletRank":1325,"walletPercent":0.0001},{"id":"0xaab7c72705d6b4c648de31eff7f73bef5c6f8a7e","val":4.0,"clusterRank":39,"clusterPercent":0.0001,"walletRank":1126,"walletPercent":0.0001},{"id":"0xb58124690c91b98cc33ab22607f170da4cc1b8aa","val":1,"clusterRank":39,"clusterPercent":0.0001,"walletRank":3260,"walletPercent":0.0},{"id":"0x7648cce7cdb2563f8e415616280582a87543fa63","val":1,"clusterRank":54,"clusterPercent":0.0,"walletRank":2264,"walletPercent":0.0},{"id":"0x98175e49f745afbc60c0b8684a025af75cb6c08f","val":1,"clusterRank":54,"clusterPercent":0.0,"walletRank":2263,"walletPercent":0.0},{"id":"0x17555e2c9fda1e6686990b2d09947af9932e3daa","val":1,"clusterRank":54,"clusterPercent":0.0,"walletRank":2266,"walletPercent":0.0},{"id":"0xe7319c5b52fe96af5df611e14a734ae42588d40e","val":1,"clusterRank":53,"clusterPercent":0.0,"walletRank":2505,"walletPercent":0.0},{"id":"0x87b5393a73a9020ea287165962335759243c4cce","val":1,"clusterRank":53,"clusterPercent":0.0,"walletRank":2055,"walletPercent":0.0},{"id":"0xbf5b9bb09d0b4bb880660c92b8ed36273a65cd07","val":1,"clusterRank":53,"clusterPercent":0.0,"walletRank":2293,"walletPercent":0.0},{"id":"0xa93d2bab49c4359aaefa29d8772e908a0cbe1fa3","val":172.0,"clusterRank":1,"clusterPercent":2.9289,"walletRank":128,"walletPercent":0.0043},{"id":"0x865c77d4ff6383e06c58350a2cfb95cca2c0f056","val":3000,"clusterRank":1,"clusterPercent":2.9289,"walletRank":3,"walletPercent":2.9245},{"id":"0x8679478693bd24ceca8b1d86460ad74b60f3c474","val":1,"clusterRank":60,"clusterPercent":0.0,"walletRank":2176,"walletPercent":0.0},{"id":"0x9ad11d17db0ea6751abddd39b02a170e94436c04","val":1,"clusterRank":60,"clusterPercent":0.0,"walletRank":2395,"walletPercent":0.0},{"id":"0xd571362ccc3a6c7c9fd7b1b695b2bc2787db653b","val":1,"clusterRank":78,"clusterPercent":0.0,"walletRank":2845,"walletPercent":0.0},{"id":"0x47e7088f08b07675b0f23d4526e8e30bb2db6c2a","val":1,"clusterRank":78,"clusterPercent":0.0,"walletRank":2918,"walletPercent":0.0},{"id":"0x5ee950f09110e973877bf67946ff1bf026bccef5","val":1,"clusterRank":78,"clusterPercent":0.0,"walletRank":3099,"walletPercent":0.0},{"id":"0x8e50c4e7a23d66993754035144d1ae420f690459","val":1,"clusterRank":59,"clusterPercent":0.0,"walletRank":2199,"walletPercent":0.0},{"id":"0x92d01e8e9b4b95c78079c73c658a725f5fd4b7c5","val":1,"clusterRank":59,"clusterPercent":0.0,"walletRank":2218,"walletPercent":0.0},{"id":"0x620c2a5e975a71bb42bc6111920f5f1b41a6fde7","val":1,"clusterRank":32,"clusterPercent":0.0002,"walletRank":3117,"walletPercent":0.0},{"id":"0x2aa78857a7f95a3d414ccb721696499bb3ea9e28","val":8.0,"clusterRank":32,"clusterPercent":0.0002,"walletRank":930,"walletPercent":0.0002},{"id":"0x0229301caaabbc8b0b6b7422d8ad64101a9eefa5","val":1,"clusterRank":50,"clusterPercent":0.0,"walletRank":1692,"walletPercent":0.0},{"id":"0x1a71904ae3982399db693c60cb2e7e7c6b5dc16b","val":1,"clusterRank":50,"clusterPercent":0.0,"walletRank":3054,"walletPercent":0.0},{"id":"0x5ab6efef0760859061ecfd060b12ba3721424775","val":1,"clusterRank":71,"clusterPercent":0.0,"walletRank":2416,"walletPercent":0.0},{"id":"0x3ed574d292a7c6940dcdf2162e44bf43374d91c4","val":1,"clusterRank":71,"clusterPercent":0.0,"walletRank":3074,"walletPercent":0.0},{"id":"0x49bd56866a3f01e4f2301c2bf71c86b5e4d97513","val":1,"clusterRank":61,"clusterPercent":0.0,"walletRank":2428,"walletPercent":0.0},{"id":"0xfdb4c1004b20f54f54bc160c22415c7aebbd7344","val":1,"clusterRank":61,"clusterPercent":0.0,"walletRank":2154,"walletPercent":0.0},{"id":"0x9b649f2c888b364d984cb0bdcf029f9757170e38","val":4.0,"clusterRank":44,"clusterPercent":0.0001,"walletRank":1492,"walletPercent":0.0001},{"id":"0x13bafb58066eeb531e2e29700795f91d6388d4aa","val":1,"clusterRank":44,"clusterPercent":0.0001,"walletRank":2400,"walletPercent":0.0},{"id":"0x886834742aaa58033a697e5023e489449bac8ba8","val":304.0,"clusterRank":8,"clusterPercent":0.0076,"walletRank":87,"walletPercent":0.0076},{"id":"0xa6355adb4e10156bcde1c2d57684d42628d8fdda","val":1,"clusterRank":8,"clusterPercent":0.0076,"walletRank":2691,"walletPercent":0.0},{"id":"0xd99f85fb5e32235bb16eaedda78928765a36cda2","val":11.999999999999998,"clusterRank":15,"clusterPercent":0.0012,"walletRank":713,"walletPercent":0.0003},{"id":"0xa94239cb8ad9d83089079c4bf662e5ae8b41af63","val":36.0,"clusterRank":15,"clusterPercent":0.0012,"walletRank":373,"walletPercent":0.0009},{"id":"0x2727dc45dc776a70be546347f296cbffebfca5af","val":1,"clusterRank":37,"clusterPercent":0.0001,"walletRank":2574,"walletPercent":0.0},{"id":"0x236b9cd9045b56117c4767078137be6f0a26cfb5","val":4.0,"clusterRank":37,"clusterPercent":0.0001,"walletRank":1026,"walletPercent":0.0001},{"id":"0xf6b2d3278d80238337bdc1cf919a56068a6eca02","val":1,"clusterRank":62,"clusterPercent":0.0,"walletRank":1967,"walletPercent":0.0},{"id":"0x7dcf106329e5868adb4d567f06b58e355fe02631","val":1,"clusterRank":62,"clusterPercent":0.0,"walletRank":2857,"walletPercent":0.0},{"id":"0x8a51b88b4d9852791ff38c006796f93d4065bf65","val":1,"clusterRank":47,"clusterPercent":0.0,"walletRank":1989,"walletPercent":0.0},{"id":"0x7bdc02eb8db3deea28f316ba70d7aa6afc1052bd","val":1,"clusterRank":47,"clusterPercent":0.0,"walletRank":1856,"walletPercent":0.0},{"id":"0xc3d7da74df4d53110c2085b1c51aafd9632feb5c","val":1,"clusterRank":49,"clusterPercent":0.0,"walletRank":1690,"walletPercent":0.0},{"id":"0x92fb380be4fb40c50007514fef5ded83b6409c2e","val":1,"clusterRank":49,"clusterPercent":0.0,"walletRank":2936,"walletPercent":0.0},{"id":"0x75b9d23e3af080cbad358a494c38fede20db82f5","val":1,"clusterRank":38,"clusterPercent":0.0001,"walletRank":3183,"walletPercent":0.0},{"id":"0x80facff5ecb15f85e51da208024dd1afdf5f27fb","val":4.0,"clusterRank":38,"clusterPercent":0.0001,"walletRank":1100,"walletPercent":0.0001},{"id":"0x15d2f72b63392a48250977bfeb0efb64d301893f","val":4.0,"clusterRank":16,"clusterPercent":0.0012,"walletRank":1310,"walletPercent":0.0001},{"id":"0x4092dd7a62e78a8c0e760a4d063a30fb94c8edab","val":11.999999999999998,"clusterRank":16,"clusterPercent":0.0012,"walletRank":787,"walletPercent":0.0003},{"id":"0x80c2d1566c9735ab44fd1a10094f1ff471213187","val":36.0,"clusterRank":16,"clusterPercent":0.0012,"walletRank":385,"walletPercent":0.0009},{"id":"0x6fb24029d037b6d31e8ade8d0ef95694b354d8fe","val":4.0,"clusterRank":43,"clusterPercent":0.0001,"walletRank":1414,"walletPercent":0.0001},{"id":"0x49a07b6ae594a6f8713348c04338dbd6ce2781ee","val":1,"clusterRank":43,"clusterPercent":0.0001,"walletRank":2227,"walletPercent":0.0},{"id":"0xfb9ae9ac85510f02d6e95f959d4fa538ce5d89e1","val":1,"clusterRank":26,"clusterPercent":0.0003,"walletRank":1796,"walletPercent":0.0},{"id":"0xff38852304be2c14fdaa54078026f2d4f466c15a","val":8.0,"clusterRank":26,"clusterPercent":0.0003,"walletRank":817,"walletPercent":0.0002},{"id":"0x6ec720f0278f7ec50e5063611d4bae156b0c85b1","val":4.0,"clusterRank":27,"clusterPercent":0.0003,"walletRank":1520,"walletPercent":0.0001},{"id":"0xbbd0a6837b366d0f6cbcfb128ba6a2768e703d90","val":8.0,"clusterRank":27,"clusterPercent":0.0003,"walletRank":841,"walletPercent":0.0002},{"id":"0x4fe5477d8156e5d1a114cc92413cf1091e65e025","val":1,"clusterRank":56,"clusterPercent":0.0,"walletRank":2368,"walletPercent":0.0},{"id":"0x9817202b8cbbf8abc9a99d3b9a8952bf31d83982","val":1,"clusterRank":56,"clusterPercent":0.0,"walletRank":1970,"walletPercent":0.0},{"id":"0x5733a3a48a426bf6abc57d2be2be4587171cc092","val":1,"clusterRank":13,"clusterPercent":0.0019,"walletRank":3128,"walletPercent":0.0},{"id":"0x3ab9f6697f8fe32f51674d13d542b095c889ce09","val":76.0,"clusterRank":13,"clusterPercent":0.0019,"walletRank":235,"walletPercent":0.0019},{"id":"0xf7e15b37cb4e34ad6058d65f34aa569a3081c670","val":23.999999999999996,"clusterRank":19,"clusterPercent":0.0008,"walletRank":497,"walletPercent":0.0006},{"id":"0xe4b3c91ac4a26c64c30c7bebeebedc15edff4b15","val":8.0,"clusterRank":19,"clusterPercent":0.0008,"walletRank":882,"walletPercent":0.0002},{"id":"0x662b0da61b0b6ed8b23f0ce3c0af9fb8afc8e24e","val":4.0,"clusterRank":34,"clusterPercent":0.0002,"walletRank":1178,"walletPercent":0.0001},{"id":"0x1639b5a337c5be3776558e55b7ec55734fefad4d","val":4.0,"clusterRank":34,"clusterPercent":0.0002,"walletRank":1526,"walletPercent":0.0001},{"id":"0xea0f9ff8bbea582ab9e2bffac24d080b27cc9655","val":328.0,"clusterRank":5,"clusterPercent":0.0165,"walletRank":82,"walletPercent":0.0082},{"id":"0x3535f06b7b0e4e3edd03df13c40f6f778ecfe07f","val":328.0,"clusterRank":5,"clusterPercent":0.0165,"walletRank":81,"walletPercent":0.0082},{"id":"0x481d8ed46d9df32b2f366abc6d983aaf0042d962","val":1,"clusterRank":48,"clusterPercent":0.0,"walletRank":1854,"walletPercent":0.0},{"id":"0x5fd2e8c89119c74d5594fb11762004405dcb2d98","val":1,"clusterRank":48,"clusterPercent":0.0,"walletRank":2220,"walletPercent":0.0},{"id":"0xc90b9f4d7aeba63e82a542129067bf1e6f77f7a1","val":1,"clusterRank":74,"clusterPercent":0.0,"walletRank":2481,"walletPercent":0.0},{"id":"0x4ff4819b90ccee0b6e564ed280f202a071405eba","val":1,"clusterRank":74,"clusterPercent":0.0,"walletRank":3047,"walletPercent":0.0},{"id":"0x4b5b88b50493d605d2b83309464b0d42e35b6af7","val":1,"clusterRank":77,"clusterPercent":0.0,"walletRank":2770,"walletPercent":0.0},{"id":"0x639ff5d26c03dd8e67200500c8d0a8b0de188c3f","val":1,"clusterRank":77,"clusterPercent":0.0,"walletRank":2861,"walletPercent":0.0},{"id":"0x312656353e3a7fe08570b2fb3e05beba89edbe04","val":1,"clusterRank":79,"clusterPercent":0.0,"walletRank":2979,"walletPercent":0.0},{"id":"0xc4da67c40e4b3787abfeedbff6d2d30d4ce05322","val":1,"clusterRank":79,"clusterPercent":0.0,"walletRank":2938,"walletPercent":0.0},{"id":"0x1d95790a6f59b51cc366c89678f77693d59b63b0","val":16.0,"clusterRank":22,"clusterPercent":0.0005,"walletRank":635,"walletPercent":0.0004},{"id":"0xc3ae43c560ecd9a0ecbd734da4fbe6c0cc0ca924","val":8.0,"clusterRank":22,"clusterPercent":0.0005,"walletRank":977,"walletPercent":0.0002},{"id":"0xf0c8b9b67cd173bd8ba15797e990e639956dda58","val":8.0,"clusterRank":24,"clusterPercent":0.0003,"walletRank":844,"walletPercent":0.0002},{"id":"0x18af23c13eb3225e8089d0f65a8f75a48f6e4e44","val":4.0,"clusterRank":24,"clusterPercent":0.0003,"walletRank":1099,"walletPercent":0.0001},{"id":"0x990de96b5fcbf895a1a8b012050386c9f738c536","val":1,"clusterRank":55,"clusterPercent":0.0,"walletRank":1992,"walletPercent":0.0},{"id":"0x2fb9059fcdf16f69274ac742f725351c25fc07b7","val":1,"clusterRank":55,"clusterPercent":0.0,"walletRank":2316,"walletPercent":0.0},{"id":"0x39e4eb279194e09a6cf807590bb04b49f9bec583","val":1,"clusterRank":28,"clusterPercent":0.0003,"walletRank":3269,"walletPercent":0.0},{"id":"0x04c5301dab9fae4135d583c7f9a820557aa3f137","val":11.999999999999998,"clusterRank":28,"clusterPercent":0.0003,"walletRank":785,"walletPercent":0.0003},{"id":"0x7569b1f0a5b339543c86f0da4675bb06ab190ac4","val":16.0,"clusterRank":23,"clusterPercent":0.0004,"walletRank":611,"walletPercent":0.0004},{"id":"0x49744358c8d893266bf119ec83c3922503185c44","val":1,"clusterRank":23,"clusterPercent":0.0004,"walletRank":2097,"walletPercent":0.0},{"id":"0xcb7478cd1dfc7e1c25d06d2784ad8a3647b333b3","val":1,"clusterRank":69,"clusterPercent":0.0,"walletRank":3281,"walletPercent":0.0},{"id":"0x18590da5bae0d233d818e2ed4205a398c688638a","val":1,"clusterRank":69,"clusterPercent":0.0,"walletRank":2339,"walletPercent":0.0},{"id":"0xd4ab30886caa8c40f893ddf1a896c9c3eac000c9","val":1,"clusterRank":72,"clusterPercent":0.0,"walletRank":2448,"walletPercent":0.0},{"id":"0x60848c9da4d505d268c1bfac0643d245944db3b5","val":1,"clusterRank":72,"clusterPercent":0.0,"walletRank":2877,"walletPercent":0.0},{"id":"0xb047ea8de3bf5a9f5b69fb6984cb7a0b2888c066","val":1,"clusterRank":68,"clusterPercent":0.0,"walletRank":3094,"walletPercent":0.0},{"id":"0xabdf183f980d3b8f757ddaea2aa363b3899a80f8","val":1,"clusterRank":68,"clusterPercent":0.0,"walletRank":2333,"walletPercent":0.0},{"id":"0xea142dbea992f873562cb2fc8efbd2fedeee63bb","val":4.0,"clusterRank":40,"clusterPercent":0.0001,"walletRank":1311,"walletPercent":0.0001},{"id":"0x419ffa0a1bf53972ceb86aeba790d7303702b6ca","val":1,"clusterRank":40,"clusterPercent":0.0001,"walletRank":1898,"walletPercent":0.0},{"id":"0xb5189e17d3dedb230567a40de17ba919712a5f21","val":28.0,"clusterRank":20,"clusterPercent":0.0007,"walletRank":452,"walletPercent":0.0007},{"id":"0x402ab6d98c0d4c727d4ac94b1fcce9fabc2657c2","val":1,"clusterRank":20,"clusterPercent":0.0007,"walletRank":3004,"walletPercent":0.0},{"id":"0x3ee6d93bfdf9c4b8549f5080f1945311e61bcbc3","val":4.0,"clusterRank":33,"clusterPercent":0.0002,"walletRank":1014,"walletPercent":0.0001},{"id":"0x19e42b42e35013d8d1a9bf963ada13e1e16a2c2d","val":1,"clusterRank":33,"clusterPercent":0.0002,"walletRank":1729,"walletPercent":0.0},{"id":"0xa2ee31c1600d2e97bd73b03996fa5872020b9df7","val":1,"clusterRank":73,"clusterPercent":0.0,"walletRank":2466,"walletPercent":0.0},{"id":"0x4bafca2553ea042d721209fd759c616f61239149","val":1,"clusterRank":73,"clusterPercent":0.0,"walletRank":2985,"walletPercent":0.0},{"id":"0x950b81643ea603628a503f30a82948893eadd842","val":11.999999999999998,"clusterRank":25,"clusterPercent":0.0003,"walletRank":746,"walletPercent":0.0003},{"id":"0x45b5b5dc8fb995ccac94d419a014a79acca45ba6","val":1,"clusterRank":25,"clusterPercent":0.0003,"walletRank":3130,"walletPercent":0.0},{"id":"0x385c5ede6a40b29f39273825825d649b9f7380c2","val":8.0,"clusterRank":21,"clusterPercent":0.0007,"walletRank":799,"walletPercent":0.0002},{"id":"0x2502586e18242a64ff01273ee81182f95a580918","val":16.0,"clusterRank":21,"clusterPercent":0.0007,"walletRank":588,"walletPercent":0.0004}];

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
    { rank: "#1", tableInfo: "0x1191be54e72f7e001f6bbc331777710b4f2999e1", tableValue: 10.34 },
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
            "from": 20,
            "to": 2

        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "link (0.023);",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034);",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023);",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009);",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034);",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "from": 20,
            "to": 2
        },
        {
            "time":  1653955200,
            "balanceInUSD": 200,
            "tokens": "eth (0.034); wbnb (0.023); link (0.023); 0x1391be54e72f7e001f6bbc331777710b4f2999e3 (0.009)",
            "from": 20,
            "to": 2
        }
    ]
    }
}

const graphData = {
    "nodes": [
        {
            "id": "0x865c77d4ff6383e06c58350a2cfb95cca2c0f056",
            "val": 2500,
            "clusterRank": "c#1",
            "clusterTokenAmount": 146442526.66517448,
            "clusterTokenPercent": 2.9289,
            "clusterTokenChange": 27597482.619403057,
            "clusterTotalBalance": 96037.90038347476,
            "clusterInfomation": "#128 #3 ",
            "walletRank": "#3",
            "walletTokenAmount": 146226389.52632132,
            "walletTokenPercent": 2.9245,
            "walletTokenChange": 27590005.096931964,
            "walletTotalBalance": 94721.06834346516
        },
        {
            "id": "0xedf6a93772eecfb1300f61f6c1ae9680c33996a2",
            "val": 2500,
            "walletRank": "#4",
            "walletTokenAmount": 37320369.72969338,
            "walletTokenPercent": 0.7464,
            "walletTokenChange": 9272082.441782258,
            "walletTotalBalance": 25351.021698075943
        },
        {
            "id": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "val": 2500,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#13",
            "walletTokenAmount": 6513665.417213526,
            "walletTokenPercent": 0.1303,
            "walletTokenChange": 7139199.586986028,
            "walletTotalBalance": 24081890.58529617
        },
        {
            "id": "0x170772a06affc0d375ce90ef59c8ec04c7ebf5d2",
            "val": 2500,
            "walletRank": "#6",
            "walletTokenAmount": 15316401.832143875,
            "walletTokenPercent": 0.3063,
            "walletTokenChange": 3587189.1180003714,
            "walletTotalBalance": 9921.505614807838
        },
        {
            "id": "0x1a1688054bba32321bd58098f5affd329c012d18",
            "val": 408.00000000000006,
            "walletRank": "#66",
            "walletTokenAmount": 511967.88426,
            "walletTokenPercent": 0.0102,
            "walletTokenChange": 776144.1545,
            "walletTotalBalance": 318.01909066578423
        },
        {
            "id": "0x66890f616b03987c49316237de50d9a648486ee4",
            "val": 540.0,
            "walletRank": "#47",
            "walletTokenAmount": 673571.0005494214,
            "walletTokenPercent": 0.0135,
            "walletTokenChange": 673571.0005494214,
            "walletTotalBalance": 36074.6156341806
        },
        {
            "id": "0x0f5c74c074e75de4b7b5dba5718c9426782906ef",
            "val": 204.00000000000003,
            "walletRank": "#113",
            "walletTokenAmount": 253673.3743910864,
            "walletTokenPercent": 0.0051,
            "walletTokenChange": 304913.30980357167,
            "walletTotalBalance": 1307.3776103570876
        },
        {
            "id": "0xc9579d98730d41288b9f36ce66dbe7ab83b4c14f",
            "val": 300.0,
            "walletRank": "#89",
            "walletTokenAmount": 373096.7641937472,
            "walletTokenPercent": 0.0075,
            "walletTokenChange": 255139.45292786352,
            "walletTotalBalance": 580.5347853180525
        },
        {
            "id": "0xf59a031be2d6e3d1c38a5dfa30cfa2cdd5c0bdfb",
            "val": 160.0,
            "walletRank": "#136",
            "walletTokenAmount": 197939.1082220287,
            "walletTokenPercent": 0.004,
            "walletTokenChange": 251017.58879573742,
            "walletTotalBalance": 975.1318471864664
        },
        {
            "id": "0x3ccae3442902a7984c341b8be3401959f5f3b799",
            "val": 115.99999999999999,
            "walletRank": "#174",
            "walletTokenAmount": 144284.5307718429,
            "walletTokenPercent": 0.0029,
            "walletTokenChange": 144284.5307718429,
            "walletTotalBalance": 83.47870096866515
        },
        {
            "id": "0xaed22b0675092b4d4617ef2541f627d69092d526",
            "val": 148.0,
            "walletRank": "#139",
            "walletTokenAmount": 185335.147245,
            "walletTokenPercent": 0.0037,
            "walletTokenChange": 137200.56312500002,
            "walletTotalBalance": 120.05454833089365
        },
        {
            "id": "0x2542cc0287805c6a2de36790b2957b36799d12aa",
            "val": 4.0,
            "walletRank": "#1368",
            "walletTokenAmount": 3409.1,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 127983.0,
            "walletTotalBalance": 621.611837772285
        },
        {
            "id": "0xd5a4931d4c2487ca9d8558c92ec67b4a9abff33e",
            "val": 296.0,
            "walletRank": "#90",
            "walletTokenAmount": 368930.7156784211,
            "walletTokenPercent": 0.0074,
            "walletTokenChange": 124536.0,
            "walletTotalBalance": 1693.292802910683
        },
        {
            "id": "0xf5e9286244aff2b63d98d58ec83d99b93342d1aa",
            "val": 92.0,
            "walletRank": "#203",
            "walletTokenAmount": 117397.17008008427,
            "walletTokenPercent": 0.0023,
            "walletTokenChange": 117397.17008008427,
            "walletTotalBalance": 104.16093119676562
        },
        {
            "id": "0x8b02a1bdd54c778467e83dec3f8c3c5a9f091008",
            "val": 36.0,
            "walletRank": "#375",
            "walletTokenAmount": 46024.91279003435,
            "walletTokenPercent": 0.0009,
            "walletTokenChange": 103071.15273061884,
            "walletTotalBalance": 101.8555946872186
        },
        {
            "id": "0x018b80c13684c481f72f09ac817a43bf1d3b776d",
            "val": 64.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#268",
            "walletTokenAmount": 79103.74380562421,
            "walletTokenPercent": 0.0016,
            "walletTokenChange": 79103.74380562421,
            "walletTotalBalance": 325.88074765663976
        },
        {
            "id": "0x3e2ae2e9eb8c461b610908feb6ee2cc240d5dcae",
            "val": 56.0,
            "walletRank": "#285",
            "walletTokenAmount": 69199.13511859307,
            "walletTokenPercent": 0.0014,
            "walletTokenChange": 69199.13511859307,
            "walletTotalBalance": 3515.867661983664
        },
        {
            "id": "0x7fcf86eb9f3af201eb7fdf1ace6235d1cf1c6929",
            "val": 40.0,
            "walletRank": "#354",
            "walletTokenAmount": 50301.764902404044,
            "walletTokenPercent": 0.001,
            "walletTokenChange": 56837.737347407,
            "walletTotalBalance": 31.295674623948756
        },
        {
            "id": "0x58d535d810efe16cef66858376b566ba5e633f27",
            "val": 44.0,
            "walletRank": "#328",
            "walletTokenAmount": 56715.97677185271,
            "walletTokenPercent": 0.0011,
            "walletTokenChange": 56715.97677185271,
            "walletTotalBalance": 665.9809880169737
        },
        {
            "id": "0x5013170596ebf826fd48d3f409b2215aefba6655",
            "val": 1,
            "walletRank": "#2049",
            "walletTokenAmount": 981.02347021661,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 56670.5022119925,
            "walletTotalBalance": 113.35621903843838
        },
        {
            "id": "0x12e20e0a57409d0695cbe5e5f3d6b9e8652c557f",
            "val": 44.0,
            "walletRank": "#323",
            "walletTokenAmount": 57156.45235891019,
            "walletTokenPercent": 0.0011,
            "walletTokenChange": 46681.15719270038,
            "walletTotalBalance": 204.08940157527914
        },
        {
            "id": "0xd707e0e8e6e1735c69b5c7102fd2f6a7a33a7741",
            "val": 32.0,
            "walletRank": "#411",
            "walletTokenAmount": 39994.90032032262,
            "walletTokenPercent": 0.0008,
            "walletTokenChange": 39598.18457682209,
            "walletTotalBalance": 393.9111949585969
        },
        {
            "id": "0x31f49d6b84205c824cdb978d02a114672457a8cb",
            "val": 4.0,
            "walletRank": "#1396",
            "walletTokenAmount": 3256.0704060576163,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 31747.863818970305,
            "walletTotalBalance": 1704.550458545208
        },
        {
            "id": "0xed2bc567cca9ae9d9f741d5de8a5c2aa483a2f24",
            "val": 4.0,
            "walletRank": "#1255",
            "walletTokenAmount": 4327.25,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 30920.892072792783,
            "walletTotalBalance": 998.232483094162
        },
        {
            "id": "0x286cb78c1018b4c18ca1e5a6796405a9084acaa8",
            "val": 1,
            "walletRank": "#2111",
            "walletTokenAmount": 818.688248453485,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 28135.179725605005,
            "walletTotalBalance": 0.9728490073287059
        },
        {
            "id": "0x7074b3d5393f23d192777737d87a3830aa90457a",
            "val": 20.0,
            "walletRank": "#580",
            "walletTokenAmount": 22688.36657683004,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 25830.0,
            "walletTotalBalance": 86.54025377933785
        },
        {
            "id": "0xb52405b87e1416ab6d828fa1f33ef3b6fea839c7",
            "val": 20.0,
            "walletRank": "#547",
            "walletTokenAmount": 25184.542465430364,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 25184.542465430364,
            "walletTotalBalance": 407.21032671265414
        },
        {
            "id": "0xda2d9bc8805e744dc9dd0a3ba6033d31a5a5dced",
            "val": 20.0,
            "walletRank": "#521",
            "walletTokenAmount": 27010.239299676057,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 19846.18794607276,
            "walletTotalBalance": 17745.464249351648
        },
        {
            "id": "0x7cbe2fe128ac21545e675fc35ea399b263935203",
            "val": 8.0,
            "walletRank": "#827",
            "walletTokenAmount": 11291.351550776888,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 19670.379627063983,
            "walletTotalBalance": 5918.653761010681
        },
        {
            "id": "0x19c98855a72c1fe36bc6f92e9e17e5ff791faf91",
            "val": 8.0,
            "walletRank": "#793",
            "walletTokenAmount": 12428.620646949048,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 18482.39353827283,
            "walletTotalBalance": 144.45661594055682
        },
        {
            "id": "0xe46cac1e9c577c65113443987c4775dcb0559a56",
            "val": 16.0,
            "walletRank": "#657",
            "walletTokenAmount": 18054.75011066548,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 15794.348548319596,
            "walletTotalBalance": 16783.753773919085
        },
        {
            "id": "0x6419a47727813e4ee327a9fb0257aaf1fe9b4f24",
            "val": 16.0,
            "walletRank": "#645",
            "walletTokenAmount": 18866.194140662774,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 14427.609140662775,
            "walletTotalBalance": 1042.5167548008233
        },
        {
            "id": "0x501ed674dcfb19471fd8ef70da84c7e3127bb3b4",
            "val": 4.0,
            "walletRank": "#1043",
            "walletTokenAmount": 6627.822338292836,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 14227.822338292835,
            "walletTotalBalance": 8628.639348277435
        },
        {
            "id": "0x3b1576f375ac67694c35459068d40e5852b2427c",
            "val": 8.0,
            "walletRank": "#856",
            "walletTokenAmount": 10316.827619950522,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 10316.827619950522,
            "walletTotalBalance": 19.299718539167934
        },
        {
            "id": "0x413b73eed10f7fbc312f28a00fbd53e8e46f006b",
            "val": 4.0,
            "clusterRank": "c#29",
            "clusterTokenAmount": 12152.993044048944,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 9481.0,
            "clusterTotalBalance": 864.4288358551029,
            "clusterInfomation": "#1127 #1039 ",
            "walletRank": "#1039",
            "walletTokenAmount": 6671.266502551371,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 9481.0,
            "walletTotalBalance": 855.0200324672999
        },
        {
            "id": "0x5a313b3df9179b9d69330d65273ff12c4fca5014",
            "val": 8.0,
            "walletRank": "#909",
            "walletTokenAmount": 9410.147449594833,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 9410.147449594833,
            "walletTotalBalance": 8.494924545665388
        },
        {
            "id": "0x8928d55fa1eb2744b14bdc4f4cc897e48c214d47",
            "val": 1,
            "walletRank": "#1886",
            "walletTokenAmount": 1270.2302335782563,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 9058.648137470664,
            "walletTotalBalance": 20552.407075969884
        },
        {
            "id": "0xe6e0177a0a4fe8e42d771f9e03cc44faa0e07be3",
            "val": 11.999999999999998,
            "walletRank": "#705",
            "walletTokenAmount": 16029.13854151402,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 9025.000000000002,
            "walletTotalBalance": 170.66329882944217
        },
        {
            "id": "0x8829859c535326c1de5f7e63fc54ac6e77305230",
            "val": 1,
            "walletRank": "#2236",
            "walletTokenAmount": 600,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 8900,
            "walletTotalBalance": 1060.6702426194895
        },
        {
            "id": "0xfc5e37e3a31ee00a4171dc5ba466e55b443ce474",
            "val": 11.999999999999998,
            "walletRank": "#678",
            "walletTokenAmount": 17385,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 8835,
            "walletTotalBalance": 1218.3341596808243
        },
        {
            "id": "0xb381caf723003f717318da304d3b623949d59a39",
            "val": 8.0,
            "walletRank": "#948",
            "walletTokenAmount": 8602.908624276602,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 8602.908624276602,
            "walletTotalBalance": 2088.532706768765
        },
        {
            "id": "0xed943988b57195a6668a212b189a2e9f8c151a61",
            "val": 1,
            "walletRank": "#2341",
            "walletTokenAmount": 466,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 8430,
            "walletTotalBalance": 0.46526372000000005
        },
        {
            "id": "0x8342a85e2369f5911cd9796c5ba60e6a214bbf86",
            "val": 4.0,
            "walletRank": "#1316",
            "walletTokenAmount": 3781.9316143542364,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 7562.563997904397,
            "walletTotalBalance": 514.7117801417979
        },
        {
            "id": "0x02aed212b3317ee947cf8e0f2f0e525d6f979b69",
            "val": 8.0,
            "walletRank": "#963",
            "walletTokenAmount": 8090.8673166751405,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 7488.513193683936,
            "walletTotalBalance": 1407.7135833402594
        },
        {
            "id": "0xa93d2bab49c4359aaefa29d8772e908a0cbe1fa3",
            "val": 172.0,
            "clusterRank": "c#1",
            "clusterTokenAmount": 146442526.66517448,
            "clusterTokenPercent": 2.9289,
            "clusterTokenChange": 27597482.619403057,
            "clusterTotalBalance": 96037.90038347476,
            "clusterInfomation": "#128 #3 ",
            "walletRank": "#128",
            "walletTokenAmount": 216137.13885316515,
            "walletTokenPercent": 0.0043,
            "walletTokenChange": 7477.522471094417,
            "walletTotalBalance": 1316.832040009597
        },
        {
            "id": "0xaa85ad79caa5ce232036750f883b63edbd3b944d",
            "val": 4.0,
            "walletRank": "#1371",
            "walletTokenAmount": 3383.9984963614265,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 7282.464711222659,
            "walletTotalBalance": 764.9628053630374
        },
        {
            "id": "0xd309c56d4eccd84d80116df42b80a275bbb93cc1",
            "val": 4.0,
            "walletRank": "#1249",
            "walletTokenAmount": 4369.05,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 6846.4415040963895,
            "walletTotalBalance": 8.35189717401568
        },
        {
            "id": "0x4737c5876a32a121db518b6c95618d3be7666666",
            "val": 23.999999999999996,
            "walletRank": "#513",
            "walletTokenAmount": 28151.29685286255,
            "walletTokenPercent": 0.0006,
            "walletTokenChange": 5700.0,
            "walletTotalBalance": 41.088316222078355
        },
        {
            "id": "0xa62cf52544064a248949516572c0a4683b8bab0c",
            "val": 4.0,
            "walletRank": "#1263",
            "walletTokenAmount": 4248.568708197422,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 5530.611590453332,
            "walletTotalBalance": 6238.504313018764
        },
        {
            "id": "0xc51cd7160045ecc2370aca4accdd4604f09ec87c",
            "val": 1,
            "walletRank": "#1703",
            "walletTokenAmount": 1899.05,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 5274.4,
            "walletTotalBalance": 2383.0961292808292
        },
        {
            "id": "0xb0a6b37fb0e4d1789eca2e886533559fe8146911",
            "val": 4.0,
            "walletRank": "#1144",
            "walletTokenAmount": 5240.5,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 5240.5,
            "walletTotalBalance": 3.255241385
        },
        {
            "id": "0xc12e94f996177c5637a7ff5d4c574fb2137bac43",
            "val": 20.0,
            "walletRank": "#558",
            "walletTokenAmount": 24447.686985259043,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 5225.0,
            "walletTotalBalance": 219.39326390568488
        },
        {
            "id": "0x7fa991505aca678ec67d8a21c201abc1065d52fa",
            "val": 8.0,
            "clusterRank": "c#31",
            "clusterTokenAmount": 9486.28572601984,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 8022.331482464302,
            "clusterTotalBalance": 1024.7281720618826,
            "clusterInfomation": "#991 #1797 #2431 ",
            "walletRank": "#991",
            "walletTokenAmount": 7631.048346122245,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 5186.955214483665,
            "walletTotalBalance": 556.1120251078893
        },
        {
            "id": "0xbffb4d22371a77913a5070e5c9d5ae08c8448401",
            "val": 36.0,
            "walletRank": "#380",
            "walletTokenAmount": 44802.92883360198,
            "walletTokenPercent": 0.0009,
            "walletTokenChange": 4750.0,
            "walletTotalBalance": 128.4991652096814
        },
        {
            "id": "0x4138f172a9dd0c3a832b570a78287ea9df9bab4b",
            "val": 8.0,
            "walletRank": "#907",
            "walletTokenAmount": 9453.746039372394,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 4702.5,
            "walletTotalBalance": 40.42936176859161
        },
        {
            "id": "0x8c09d388f89ea608f71bb371e9fb3c9af6f696b3",
            "val": 4.0,
            "walletRank": "#1016",
            "walletTokenAmount": 7047.499478029566,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 4563.941300595687,
            "walletTotalBalance": 9.584562251518692
        },
        {
            "id": "0xd050d1cc8d55afd81d9c6f81f0a70fa60adb874d",
            "val": 4.0,
            "walletRank": "#1261",
            "walletTokenAmount": 4275,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 4275,
            "walletTotalBalance": 42.958861303134114
        },
        {
            "id": "0x9a709162f9ce4e06a3e3f8ce97573abf151abbc2",
            "val": 4.0,
            "walletRank": "#1309",
            "walletTokenAmount": 3837.3376672488575,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 3837.3376672488575,
            "walletTotalBalance": 216.9409379785769
        },
        {
            "id": "0x9ac19aeed15e4d85fd93bacc88f8396858658064",
            "val": 80.0,
            "walletRank": "#229",
            "walletTokenAmount": 99965.35876996822,
            "walletTokenPercent": 0.002,
            "walletTokenChange": 3588.149999999994,
            "walletTotalBalance": 4933.662249453232
        },
        {
            "id": "0xabf7fb0015f326ee3edde04577e243a32f10124b",
            "val": 16.0,
            "walletRank": "#673",
            "walletTokenAmount": 17683.919991146104,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 3454.8481892559703,
            "walletTotalBalance": 1275205202.7756104
        },
        {
            "id": "0xc695c9c547235e673e99e3edce28c8097b983acb",
            "val": 11.999999999999998,
            "walletRank": "#703",
            "walletTokenAmount": 16119.902899019875,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 3325.0,
            "walletTotalBalance": 1978.7475679107113
        },
        {
            "id": "0xb2a6698bb78b0a12ec721a68f7896842bae10a1c",
            "val": 16.0,
            "walletRank": "#591",
            "walletTokenAmount": 21857.173762141683,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 3296.901449021523,
            "walletTotalBalance": 8972.32381726249
        },
        {
            "id": "0x17b173d4b80b0b5bb7e0f1e99f5962f2d51799eb",
            "val": 8.0,
            "walletRank": "#921",
            "walletTokenAmount": 9112.991599567387,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 3112.9915995673873,
            "walletTotalBalance": 5.660716991903274
        },
        {
            "id": "0x1f2d193b652df0b403319e16a80059096c6b18b3",
            "val": 16.0,
            "walletRank": "#668",
            "walletTokenAmount": 17823.256186158684,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 3079.3764162023617,
            "walletTotalBalance": 90.05699943302069
        },
        {
            "id": "0x501797bd0ca63c0e07bf169bfb0d79a69cce2870",
            "val": 4.0,
            "walletRank": "#1437",
            "walletTokenAmount": 3072.0717810455617,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 3072.0717810455617,
            "walletTotalBalance": 396.0480235359186
        },
        {
            "id": "0x208caf958ddbde0146bc40a3586e5c74608206ec",
            "val": 4.0,
            "walletRank": "#1013",
            "walletTokenAmount": 7123.1,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 3040.0,
            "walletTotalBalance": 73.15097232448751
        },
        {
            "id": "0x386ca514af3bcff0df79332d86a634f442dd2092",
            "val": 4.0,
            "walletRank": "#1441",
            "walletTokenAmount": 3010.246821402608,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 3010.246821402608,
            "walletTotalBalance": 4.366687759349968
        },
        {
            "id": "0xfffff9b1c2c387b1e3d19af292d91d913374f42b",
            "val": 1,
            "walletRank": "#2655",
            "walletTokenAmount": 115.54872516373894,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 2962.166971043328,
            "walletTotalBalance": 570.6439721448628
        },
        {
            "id": "0x0aed874b7ea3c2400a8fb9424f1eba3802c85f21",
            "val": 8.0,
            "clusterRank": "c#30",
            "clusterTokenAmount": 9500.984577792244,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 2548.1536593541277,
            "clusterTotalBalance": 3857.074869906861,
            "clusterInfomation": "#905 #3028 ",
            "walletRank": "#905",
            "walletTokenAmount": 9500.104905966331,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 2548.1536593541277,
            "walletTotalBalance": 3847.5553162120077
        },
        {
            "id": "0xd967982a0c915e4995ffef6b26697eecac97790a",
            "val": 1,
            "walletRank": "#1584",
            "walletTokenAmount": 2384.303856515457,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 2384.303856515457,
            "walletTotalBalance": 11.9134679741576
        },
        {
            "id": "0x1e7d7a3fbe3059007b157251ece49fe15566ad68",
            "val": 4.0,
            "walletRank": "#1206",
            "walletTokenAmount": 4756.377433713764,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 2375.0000000000005,
            "walletTotalBalance": 6607.179057576926
        },
        {
            "id": "0xfc8d75013620d1edd219172ec9beef5c4f71ed56",
            "val": 4.0,
            "walletRank": "#1359",
            "walletTokenAmount": 3449.97769906911,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 2269.016603931374,
            "walletTotalBalance": 6.633297792200415
        },
        {
            "id": "0xcee587dc35f25281c9bb01a6b299cc269d338938",
            "val": 1,
            "walletRank": "#1736",
            "walletTokenAmount": 1736.5884757724298,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 2225.5631859542677,
            "walletTotalBalance": 320.03645135131967
        },
        {
            "id": "0xd182ddc99cadbe9cb011695d786d444491d68a4e",
            "val": 11.999999999999998,
            "walletRank": "#760",
            "walletTokenAmount": 13635.853467297218,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 2219.9485527440083,
            "walletTotalBalance": 1308.1814731703116
        },
        {
            "id": "0xeef81321d24121963ba0196c788229992ad8ae97",
            "val": 1,
            "walletRank": "#1641",
            "walletTokenAmount": 2049.7443206600246,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 2218.892963225688,
            "walletTotalBalance": 3819.17761901657
        },
        {
            "id": "0x923f8ce1de14c3a58501f592497386b861696ef8",
            "val": 16.0,
            "walletRank": "#612",
            "walletTokenAmount": 20408.51225119965,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 2166.0,
            "walletTotalBalance": 9115.434166680334
        },
        {
            "id": "0xc87dd9778d33dc5da5184db74952d489cea34324",
            "val": 4.0,
            "walletRank": "#1274",
            "walletTokenAmount": 4091.4416934616547,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 2111.623638236182,
            "walletTotalBalance": 161.4873183847228
        },
        {
            "id": "0x5c6861841ade3c28c4d2f9ba3960ef0d788cc513",
            "val": 1,
            "walletRank": "#2294",
            "walletTokenAmount": 520.6998843934246,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 2011.8550100236023,
            "walletTotalBalance": 91.75955323329266
        },
        {
            "id": "0x397edfc4900c94afc926c078abed6e5d7f5dd000",
            "val": 1,
            "walletRank": "#1691",
            "walletTokenAmount": 1959.9150132391433,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1959.9150132391433,
            "walletTotalBalance": 122.36028335419316
        },
        {
            "id": "0xa334f29c811ccc7c0bd9aa4d9a6be2fb3eb9315f",
            "val": 20.0,
            "walletRank": "#570",
            "walletTokenAmount": 23437.912768345024,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 1900.0,
            "walletTotalBalance": 260.648495733306
        },
        {
            "id": "0x81f1b8ae8d92ea3b20b0bdabeb18c17b506613ed",
            "val": 1,
            "walletRank": "#3024",
            "walletTokenAmount": 0.8933556367495592,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1900.0,
            "walletTotalBalance": 148.66351667509636
        },
        {
            "id": "0x6fd8688f55cf6a0d8dc5ebf02bb2823923362d89",
            "val": 1,
            "walletRank": "#2833",
            "walletTokenAmount": 45.32,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1900.0,
            "walletTotalBalance": 105.52729805321283
        },
        {
            "id": "0x3070da3f90456452d7e718113861b1a5c0ecb1a9",
            "val": 1,
            "walletRank": "#1941",
            "walletTokenAmount": 1099.1451352726272,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1900.0,
            "walletTotalBalance": 4727.394820409095
        },
        {
            "id": "0x1940d6f96e402a8f2532e2f9b303f06a7770f54b",
            "val": 8.0,
            "walletRank": "#978",
            "walletTokenAmount": 7869.823095864228,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 1899.999999999999,
            "walletTotalBalance": 7.423889676987481
        },
        {
            "id": "0x3ee6d93bfdf9c4b8549f5080f1945311e61bcbc3",
            "val": 4.0,
            "clusterRank": "c#33",
            "clusterTokenAmount": 8869.836505347066,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 1805.0,
            "clusterTotalBalance": 1477.5778738505078,
            "clusterInfomation": "#1014 #1729 ",
            "walletRank": "#1014",
            "walletTokenAmount": 7112.336505347067,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 1805.0,
            "walletTotalBalance": 301.24172645398556
        },
        {
            "id": "0xeffd3686f8a0592e7a9446ea84b660705ec091b4",
            "val": 1,
            "walletRank": "#1721",
            "walletTokenAmount": 1802.468125891786,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1738.1083804683237,
            "walletTotalBalance": 630.5937698879144
        },
        {
            "id": "0xca2b62b5e10f8f468b02f828d7df3917f24c0526",
            "val": 11.999999999999998,
            "walletRank": "#729",
            "walletTokenAmount": 14863.51,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 1567.4999999999982,
            "walletTotalBalance": 3451.5119625180373
        },
        {
            "id": "0x50c57c918d52042bbd94b92c34e27dbd7c4b37ce",
            "val": 4.0,
            "walletRank": "#1409",
            "walletTokenAmount": 3225.2902195448924,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 1529.565558526565,
            "walletTotalBalance": 20979.60997817028
        },
        {
            "id": "0xc3b403b4a7e9a6e4c16f18569366393f22bedee4",
            "val": 1,
            "clusterRank": "c#31",
            "clusterTokenAmount": 9486.28572601984,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 8022.331482464302,
            "clusterTotalBalance": 1024.7281720618826,
            "clusterInfomation": "#991 #1797 #2431 ",
            "walletRank": "#1797",
            "walletTokenAmount": 1520,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1417.7551204203073,
            "walletTotalBalance": 374.88484331122544
        },
        {
            "id": "0x5823034209eff2d47924f950b34fca247ce0ed51",
            "val": 1,
            "clusterRank": "c#31",
            "clusterTokenAmount": 9486.28572601984,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 8022.331482464302,
            "clusterTotalBalance": 1024.7281720618826,
            "clusterInfomation": "#991 #1797 #2431 ",
            "walletRank": "#2431",
            "walletTokenAmount": 335.237379897595,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1417.62114756033,
            "walletTotalBalance": 93.731303642768
        },
        {
            "id": "0xe5d2c49c3461000a9848eac522194ac0170b3ca5",
            "val": 16.0,
            "walletRank": "#613",
            "walletTokenAmount": 20376.91486278786,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 1406.6841124524653,
            "walletTotalBalance": 3575.9838703237792
        },
        {
            "id": "0xe71c8c33302b023a3cdfd74a95c089806b838f52",
            "val": 1,
            "walletRank": "#1594",
            "walletTokenAmount": 2324.882387703223,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1406.6609246670773,
            "walletTotalBalance": 18.68970741015768
        },
        {
            "id": "0x638f32fe09baec1fdc54f962e3e8e5f2b286aa70",
            "val": 4.0,
            "walletRank": "#1017",
            "walletTokenAmount": 7041.563611634133,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 1297.5960698400004,
            "walletTotalBalance": 2871556.883879226
        },
        {
            "id": "0x2680933ab246524543706899396a560489a5367c",
            "val": 512.0,
            "walletRank": "#52",
            "walletTokenAmount": 640036.4693542944,
            "walletTokenPercent": 0.0128,
            "walletTokenChange": 1254.6999999999534,
            "walletTotalBalance": 441.3810388006394
        },
        {
            "id": "0x322988a3d7d67b9e79db20577a3545658aff4200",
            "val": 1,
            "walletRank": "#1663",
            "walletTokenAmount": 2000,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1200,
            "walletTotalBalance": 7.374036539928985
        },
        {
            "id": "0xa76610477c3ecf51a894805440b97c8423a501dc",
            "val": 1,
            "walletRank": "#2835",
            "walletTokenAmount": 42.916929313540784,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1184.1382742117773,
            "walletTotalBalance": 107.29233585162261
        },
        {
            "id": "0x7c8d50db0ff825d1b68124aa76b5061d2aaa4526",
            "val": 1,
            "walletRank": "#2892",
            "walletTokenAmount": 19.2866573861457,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1105.9365448228662,
            "walletTotalBalance": 265.3290272060771
        },
        {
            "id": "0x2ca6b5e99739f92fdc330a9055a79e416060bf78",
            "val": 1,
            "walletRank": "#1973",
            "walletTokenAmount": 1037.123287175601,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 1037.123287175601,
            "walletTotalBalance": 32.90916621413523
        },
        {
            "id": "0x75a16e87f4d5cd3400435419865f233abe321f6b",
            "val": 8.0,
            "walletRank": "#989",
            "walletTokenAmount": 7666.5,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 950.0,
            "walletTotalBalance": 50.843233596699605
        },
        {
            "id": "0xd2f2d08d506a57afeb68d236801c92dca5e5c21e",
            "val": 1,
            "walletRank": "#3232",
            "walletTokenAmount": 0.001854639007628444,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 883.5453833684977,
            "walletTotalBalance": 212.02337314341264
        },
        {
            "id": "0x7dfb8a88fbeef0f03c75bce3104a5dbca0970448",
            "val": 4.0,
            "walletRank": "#1420",
            "walletTokenAmount": 3183.2745989612204,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 870.8524695238475,
            "walletTotalBalance": 40.80260131984578
        },
        {
            "id": "0xf5d395070f428e4aa0e4fd52bf327f270b00fb18",
            "val": 1,
            "walletRank": "#2106",
            "walletTokenAmount": 827.1470888116074,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 827.1470888116074,
            "walletTotalBalance": 3406.3362046479056
        },
        {
            "id": "0x3293dc227589574c1356f1ab664bf4cfd9136251",
            "val": 1,
            "clusterRank": "c#35",
            "clusterTokenAmount": 7568.702233602868,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 710.3520610738207,
            "clusterTotalBalance": 61.15241395887839,
            "clusterInfomation": "#998 #2842 ",
            "walletRank": "#2842",
            "walletTokenAmount": 38.52845243227737,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 710.3520610738207,
            "walletTotalBalance": 2.0921314670902666
        },
        {
            "id": "0xa187712d483127ed9c0f223119dcc49213123143",
            "val": 1,
            "walletRank": "#2231",
            "walletTokenAmount": 612.882597601087,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 612.882597601087,
            "walletTotalBalance": 0.3545954844940609
        },
        {
            "id": "0x78775b983f4202157119e1aa80e884c0303f073a",
            "val": 4.0,
            "walletRank": "#1554",
            "walletTokenAmount": 2508.0916304030075,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 590.5351483126956,
            "walletTotalBalance": 1055761.2060631434
        },
        {
            "id": "0x8ad14d12707e7aa62c56369950c2dcd671bee250",
            "val": 1,
            "walletRank": "#2830",
            "walletTokenAmount": 45.79,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 535.8000000000001,
            "walletTotalBalance": 8.96340043269456
        },
        {
            "id": "0x11ededebf63bef0ea2d2d071bdf88f71543ec6fb",
            "val": 32.0,
            "walletRank": "#404",
            "walletTokenAmount": 40862.14379936346,
            "walletTokenPercent": 0.0008,
            "walletTokenChange": 493.4100036387681,
            "walletTotalBalance": 6.715196863362316e+60
        },
        {
            "id": "0xf820047db612039930d131a86cb483bf158f1ad4",
            "val": 1,
            "walletRank": "#3079",
            "walletTokenAmount": 0.4225956632953951,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 416.7292789728747,
            "walletTotalBalance": 111.76070240164469
        },
        {
            "id": "0xc7926a15014af37f87d600cd72f902a1af3406c7",
            "val": 4.0,
            "walletRank": "#1054",
            "walletTokenAmount": 6507.5,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 380.0,
            "walletTotalBalance": 3933.8755805985948
        },
        {
            "id": "0x1639b5a337c5be3776558e55b7ec55734fefad4d",
            "val": 4.0,
            "clusterRank": "c#34",
            "clusterTokenAmount": 7660,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 380,
            "clusterTotalBalance": 364.4003363616648,
            "clusterInfomation": "#1526 #1178 ",
            "walletRank": "#1526",
            "walletTokenAmount": 2660,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 380,
            "walletTotalBalance": 356.9821058859237
        },
        {
            "id": "0x83edd900cd276ef514dd6b577ce90c127189d67e",
            "val": 1,
            "walletRank": "#1946",
            "walletTokenAmount": 1087.4858839585452,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 357.5412093401726,
            "walletTotalBalance": 657.3320938574299
        },
        {
            "id": "0x6ae590ccef83c65acf798a9adf1893e7ba8beecf",
            "val": 1,
            "walletRank": "#2629",
            "walletTokenAmount": 140.00424844674635,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 190.00000000000003,
            "walletTotalBalance": 8.627970548860457
        },
        {
            "id": "0xd152aa61219f1af2cf5465b1d6c784196e9736b1",
            "val": 4.0,
            "walletRank": "#1308",
            "walletTokenAmount": 3841.8,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 190.0,
            "walletTotalBalance": 2588.548555796926
        },
        {
            "id": "0x7cbab6f71098a12fe93f5d839f93e113ecd409db",
            "val": 28.0,
            "clusterRank": "c#12",
            "clusterTokenAmount": 116019.81332010071,
            "clusterTokenPercent": 0.0023,
            "clusterTokenChange": 190.0,
            "clusterTotalBalance": 3180.05653872215,
            "clusterInfomation": "#264 #438 ",
            "walletRank": "#438",
            "walletTokenAmount": 36292.03137093534,
            "walletTokenPercent": 0.0007,
            "walletTokenChange": 190.0,
            "walletTotalBalance": 82.22096451280017
        },
        {
            "id": "0xbde45a77f6a861f4257d36f3c70e019cb28802f5",
            "val": 1,
            "clusterRank": "c#51",
            "clusterTokenAmount": 1938.45,
            "clusterTokenPercent": 0.0,
            "clusterTokenChange": 190,
            "clusterTotalBalance": 4051.772063345388,
            "clusterInfomation": "#1922 #2118 ",
            "walletRank": "#1922",
            "walletTokenAmount": 1140,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 190,
            "walletTotalBalance": 4014.7343601782127
        },
        {
            "id": "0xc8cd6ef6187ee64e0ad4cecaac938fd03ef3eda8",
            "val": 1,
            "walletRank": "#2809",
            "walletTokenAmount": 50.59305357344474,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 184.1478647414731,
            "walletTotalBalance": 1739.8641387042944
        },
        {
            "id": "0x7dd7cdd711093bd200ecbdf231d2e3ca1d2938a6",
            "val": 1,
            "walletRank": "#2582",
            "walletTokenAmount": 174.36939762730668,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 174.36939762730668,
            "walletTotalBalance": 20563.980196360233
        },
        {
            "id": "0xfbc9138126eac4fbba05686cd6a8effdedc9d530",
            "val": 1,
            "walletRank": "#2606",
            "walletTokenAmount": 156.80284035153167,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 156.80284035153167,
            "walletTotalBalance": 458.0405009930147
        },
        {
            "id": "0xf1703c935c8d5fc95b8e3c7686fc87369351c3d1",
            "val": 1,
            "walletRank": "#2720",
            "walletTokenAmount": 82.61858066206739,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 82.61858066206739,
            "walletTotalBalance": 821.7016965262656
        },
        {
            "id": "0x76af4c2290ae5f221c3e90779c62d539d631b73c",
            "val": 4.0,
            "walletRank": "#1260",
            "walletTokenAmount": 4279.127251477066,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 79.05126468519029,
            "walletTotalBalance": 128.01296489560687
        },
        {
            "id": "0x56cc8f3bc84c5bc37bcf04d35ef5cc38ccf99f91",
            "val": 4.0,
            "walletRank": "#1312",
            "walletTokenAmount": 3809.9044159716495,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 78.98111035233342,
            "walletTotalBalance": 4.214824958317832
        },
        {
            "id": "0x74bc54fdf48801eb2eface427dba0f20072e7f91",
            "val": 1,
            "walletRank": "#1614",
            "walletTokenAmount": 2206.734697369977,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 70.84139963964981,
            "walletTotalBalance": 225.90399921332656
        },
        {
            "id": "0x68081ed64e9a552c46ba8e459f6dac32dda73618",
            "val": 1,
            "walletRank": "#2771",
            "walletTokenAmount": 60.37945223440852,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 60.37945223440852,
            "walletTotalBalance": 341.53642420205887
        },
        {
            "id": "0x68ab40e5a83212cb5986bcec4a69c7d4f6284e58",
            "val": 16.0,
            "walletRank": "#665",
            "walletTokenAmount": 17883.295511353805,
            "walletTokenPercent": 0.0004,
            "walletTokenChange": 50.38500000000204,
            "walletTotalBalance": 155.48843259054527
        },
        {
            "id": "0x5ca83b0a0efe9eb22a2928d2e25cfaf45da9840f",
            "val": 1,
            "walletRank": "#2898",
            "walletTokenAmount": 16.6618646474387,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 46.75,
            "walletTotalBalance": 243.1890826559656
        },
        {
            "id": "0xe5e7116ab49666e9791f53aed4f5b7207770879d",
            "val": 1,
            "walletRank": "#2847",
            "walletTokenAmount": 36.44467019515431,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 45.4719417210944,
            "walletTotalBalance": 0.02967069934598098
        },
        {
            "id": "0xbb5905325ea3ebd3f2ecfe12e84b1b74c1cdbb1a",
            "val": 1,
            "walletRank": "#2858",
            "walletTokenAmount": 30.516416465582587,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 19.53358353441741,
            "walletTotalBalance": 206.36790246756578
        },
        {
            "id": "0x351d41c8bbcd4b102a854d2c133e7f0fdb49fb00",
            "val": 1,
            "walletRank": "#2905",
            "walletTokenAmount": 14.20323234938939,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 14.20323234938939,
            "walletTotalBalance": 4518.678672552869
        },
        {
            "id": "0x44802f5bb3700ef3f12492342f80840f41bd0ad4",
            "val": 1,
            "walletRank": "#2870",
            "walletTokenAmount": 26.442933797832584,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 7.490572652561486,
            "walletTotalBalance": 19493.835981013977
        },
        {
            "id": "0xdfd5c7f0c45c7bf72ec826017d2ce3204ed90fb9",
            "val": 1,
            "clusterRank": "c#51",
            "clusterTokenAmount": 1938.45,
            "clusterTokenPercent": 0.0,
            "clusterTokenChange": 190,
            "clusterTotalBalance": 4051.772063345388,
            "clusterInfomation": "#1922 #2118 ",
            "walletRank": "#2118",
            "walletTokenAmount": 798.45,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 0,
            "walletTotalBalance": 37.037703167175145
        },
        {
            "id": "0x9d837a2f6e9e4e916c3ef127ab95436675dd7746",
            "val": 32.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#401",
            "walletTokenAmount": 41881.54407446782,
            "walletTokenPercent": 0.0008,
            "walletTokenChange": 0,
            "walletTotalBalance": 5.9745098686
        },
        {
            "id": "0xbbb11ea2bb78a8e3424b63b9f7add18ffb9b4282",
            "val": 4.0,
            "clusterRank": "c#29",
            "clusterTokenAmount": 12152.993044048944,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 9481.0,
            "clusterTotalBalance": 864.4288358551029,
            "clusterInfomation": "#1127 #1039 ",
            "walletRank": "#1127",
            "walletTokenAmount": 5481.7265414975745,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 0,
            "walletTotalBalance": 9.40880338780303
        },
        {
            "id": "0xc67535ab55c2b6a07bc01f173bb6a89f5cbb1648",
            "val": 64.0,
            "clusterRank": "c#12",
            "clusterTokenAmount": 116019.81332010071,
            "clusterTokenPercent": 0.0023,
            "clusterTokenChange": 190.0,
            "clusterTotalBalance": 3180.05653872215,
            "clusterInfomation": "#264 #438 ",
            "walletRank": "#264",
            "walletTokenAmount": 79727.78194916538,
            "walletTokenPercent": 0.0016,
            "walletTokenChange": 0,
            "walletTotalBalance": 3097.83557420935
        },
        {
            "id": "0x58826040a202b5882982d5d8c7bbed79172a9bee",
            "val": 132.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#159",
            "walletTokenAmount": 166921.22,
            "walletTokenPercent": 0.0033,
            "walletTokenChange": 0,
            "walletTotalBalance": 191.37311150171482
        },
        {
            "id": "0xae75331abce214195acdc6a2176e609943e5855f",
            "val": 8.0,
            "clusterRank": "c#35",
            "clusterTokenAmount": 7568.702233602868,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 710.3520610738207,
            "clusterTotalBalance": 61.15241395887839,
            "clusterInfomation": "#998 #2842 ",
            "walletRank": "#998",
            "walletTokenAmount": 7530.173781170591,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 0,
            "walletTotalBalance": 59.06028249178812
        },
        {
            "id": "0x58b3360d28e3f570c97ad20246cfc74a622584ea",
            "val": 1,
            "clusterRank": "c#30",
            "clusterTokenAmount": 9500.984577792244,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 2548.1536593541277,
            "clusterTotalBalance": 3857.074869906861,
            "clusterInfomation": "#905 #3028 ",
            "walletRank": "#3028",
            "walletTokenAmount": 0.8796718259125376,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 0,
            "walletTotalBalance": 9.519553694853249
        },
        {
            "id": "0x525913a93161c6d095966e71dd45c77c2fda8c96",
            "val": 1,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#2674",
            "walletTokenAmount": 100.30700628774555,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 0,
            "walletTotalBalance": 629.1168567872858
        },
        {
            "id": "0xc1624611063682be948bd83aed9b321cc4855f5b",
            "val": 8.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#952",
            "walletTokenAmount": 8404.48948428327,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 0,
            "walletTotalBalance": 2702.917112966634
        },
        {
            "id": "0xeedf61528f22f9755b2612d5d4545439ff8a2e9a",
            "val": 20.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#568",
            "walletTokenAmount": 23467.212982167344,
            "walletTokenPercent": 0.0005,
            "walletTokenChange": 0,
            "walletTotalBalance": 5692.66470122573
        },
        {
            "id": "0x4911c5abcd586f181b05d70020659e2f497c240c",
            "val": 47.99999999999999,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#318",
            "walletTokenAmount": 58411.43667047999,
            "walletTokenPercent": 0.0012,
            "walletTokenChange": 0,
            "walletTotalBalance": 290.31479144334895
        },
        {
            "id": "0x662b0da61b0b6ed8b23f0ce3c0af9fb8afc8e24e",
            "val": 4.0,
            "clusterRank": "c#34",
            "clusterTokenAmount": 7660,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 380,
            "clusterTotalBalance": 364.4003363616648,
            "clusterInfomation": "#1526 #1178 ",
            "walletRank": "#1178",
            "walletTokenAmount": 5000,
            "walletTokenPercent": 0.0001,
            "walletTokenChange": 0,
            "walletTotalBalance": 7.418230475741106
        },
        {
            "id": "0x388889c175fd227c011e643ce045d7c0b41e0d73",
            "val": 8.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#860",
            "walletTokenAmount": 10223.8277,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 0,
            "walletTotalBalance": 1628.2954948836336
        },
        {
            "id": "0x5218a31e3f91a070e9ed08905ca2b4e4cd4ddef2",
            "val": 36.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#395",
            "walletTokenAmount": 42745.379589929755,
            "walletTokenPercent": 0.0009,
            "walletTokenChange": 0,
            "walletTotalBalance": 5445.021579308122
        },
        {
            "id": "0x8fc0d4bd22292537181bf01bea6ad69db8ff5b35",
            "val": 8.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#792",
            "walletTokenAmount": 12467.464299675705,
            "walletTokenPercent": 0.0002,
            "walletTokenChange": 0,
            "walletTotalBalance": 100.35701441938845
        },
        {
            "id": "0x4e4f1a51a1e77ac4b69d4207514a4a3fd40ca29e",
            "val": 11.999999999999998,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#717",
            "walletTokenAmount": 15403.87488778423,
            "walletTokenPercent": 0.0003,
            "walletTokenChange": 0,
            "walletTotalBalance": 5211.966523620588
        },
        {
            "id": "0x19e42b42e35013d8d1a9bf963ada13e1e16a2c2d",
            "val": 1,
            "clusterRank": "c#33",
            "clusterTokenAmount": 8869.836505347066,
            "clusterTokenPercent": 0.0002,
            "clusterTokenChange": 1805.0,
            "clusterTotalBalance": 1477.5778738505078,
            "clusterInfomation": "#1014 #1729 ",
            "walletRank": "#1729",
            "walletTokenAmount": 1757.5,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 0,
            "walletTotalBalance": 1176.3361473965222
        },
        {
            "id": "0x204ce989162cb1fbc5ad8a605499b52361bb50a4",
            "val": 36.0,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#394",
            "walletTokenAmount": 42797.372217051554,
            "walletTokenPercent": 0.0009,
            "walletTokenChange": 0,
            "walletTotalBalance": 4887.604822398174
        },
        {
            "id": "0x8832c14e275377cb55d0eca55190cf8d09a57b21",
            "val": 1,
            "clusterRank": "c#3",
            "clusterTokenAmount": 7015911.657496161,
            "clusterTokenPercent": 0.1403,
            "clusterTokenChange": 7218303.330791652,
            "clusterTotalBalance": 24109141.89832485,
            "clusterInfomation": "#318 #952 #717 #568 #860 #792 #13 #2674 #394 #159 #401 #2452 #268 #395 ",
            "walletRank": "#2452",
            "walletTokenAmount": 318.36756488406917,
            "walletTokenPercent": 0.0,
            "walletTokenChange": 0,
            "walletTotalBalance": 139.82576260305487
        }
    ],
    "links": [
        {
            "source": "0xbde45a77f6a861f4257d36f3c70e019cb28802f5",
            "target": "0xdfd5c7f0c45c7bf72ec826017d2ce3204ed90fb9"
        },
        {
            "source": "0x9d837a2f6e9e4e916c3ef127ab95436675dd7746",
            "target": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb"
        },
        {
            "source": "0xbbb11ea2bb78a8e3424b63b9f7add18ffb9b4282",
            "target": "0x413b73eed10f7fbc312f28a00fbd53e8e46f006b"
        },
        {
            "source": "0xc67535ab55c2b6a07bc01f173bb6a89f5cbb1648",
            "target": "0x7cbab6f71098a12fe93f5d839f93e113ecd409db"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x58826040a202b5882982d5d8c7bbed79172a9bee"
        },
        {
            "source": "0xae75331abce214195acdc6a2176e609943e5855f",
            "target": "0x3293dc227589574c1356f1ab664bf4cfd9136251"
        },
        {
            "source": "0x58b3360d28e3f570c97ad20246cfc74a622584ea",
            "target": "0x0aed874b7ea3c2400a8fb9424f1eba3802c85f21"
        },
        {
            "source": "0x5823034209eff2d47924f950b34fca247ce0ed51",
            "target": "0x7fa991505aca678ec67d8a21c201abc1065d52fa"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x525913a93161c6d095966e71dd45c77c2fda8c96"
        },
        {
            "source": "0x865c77d4ff6383e06c58350a2cfb95cca2c0f056",
            "target": "0xa93d2bab49c4359aaefa29d8772e908a0cbe1fa3"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0xc1624611063682be948bd83aed9b321cc4855f5b"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0xeedf61528f22f9755b2612d5d4545439ff8a2e9a"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x4911c5abcd586f181b05d70020659e2f497c240c"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x018b80c13684c481f72f09ac817a43bf1d3b776d"
        },
        {
            "source": "0x662b0da61b0b6ed8b23f0ce3c0af9fb8afc8e24e",
            "target": "0x1639b5a337c5be3776558e55b7ec55734fefad4d"
        },
        {
            "source": "0x388889c175fd227c011e643ce045d7c0b41e0d73",
            "target": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x5218a31e3f91a070e9ed08905ca2b4e4cd4ddef2"
        },
        {
            "source": "0xc3b403b4a7e9a6e4c16f18569366393f22bedee4",
            "target": "0x7fa991505aca678ec67d8a21c201abc1065d52fa"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x8fc0d4bd22292537181bf01bea6ad69db8ff5b35"
        },
        {
            "source": "0x4e4f1a51a1e77ac4b69d4207514a4a3fd40ca29e",
            "target": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb"
        },
        {
            "source": "0x19e42b42e35013d8d1a9bf963ada13e1e16a2c2d",
            "target": "0x3ee6d93bfdf9c4b8549f5080f1945311e61bcbc3"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x204ce989162cb1fbc5ad8a605499b52361bb50a4"
        },
        {
            "source": "0x4982085c9e2f89f2ecb8131eca71afad896e89cb",
            "target": "0x8832c14e275377cb55d0eca55190cf8d09a57b21"
        }
    ]
}

function RelationshipSpace(props) {
    const clusterChangeLog = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]

    const classes = useStyles();
    const theme = useTheme();

    const { RelationshipSpace } = props
    useEffect(() => {
        props.getTopWalletRelationship('0x38_0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', 'rank')
    }, [])

    let topWalletRelationship = []
    if (RelationshipSpace?.topWalletRelationship) {
        topWalletRelationship = RelationshipSpace?.topWalletRelationship
    }
    console.log(topWalletRelationship)

    const [addressWallet, setAddressWallet] = useState("0x0be840390e363f5bd2d922ca59e7c4c2dc2001e5")

    let walletChangeLogs = []
    // if (RelationshipSpace?.relationshipTokenChangeLogs) {
    //     walletChangeLogs = RelationshipSpace.relationshipTokenChangeLogs
    // }
    // // start menu 
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
    if (RelationshipSpace?.closeRelationEdges) {
        data_edges = RelationshipSpace.closeRelationEdges
    }

    let data = {"nodes":[{}], "link":[{}]}
    if (RelationshipSpace?.getTopWalletRelationship) {
        data = RelationshipSpace.getTopWalletRelationship
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

    // // real 
    // const [nodes, setNodes] = useState([])
    // useEffect(() => {
    //     setNodes(data_nodes);s
    // }, [data_nodes]);

    // // const [links, setLinks] = useState([])
    // // useEffect(() => {
    // //     setLinks(data_edges)
    // // }, [data_edges]);


    // // fake
    // // const [link_detail, setLinkDetail] = useState({})
    // // setLinkDetail(() => {
    // //     setNodes(data_edges);
    // // }, [data_edges]);

    const [nodes, setNodes] = useState([])
    // useEffect(() => {
    //     setNodes(data['nodes']);
    // }, [data]);

    // const [links, setLinks] = useState([])
    // useEffect(() => {
    //     setLinks(data['links']);
    // }, [data]);

    // // const [graphData, setGraphData] = useState()
    // // useEffect(() => {
    // //     let data = { "nodes": nodes, "links": links }
    // //     setGraphData(data)
    // // }, [nodes, links])

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
        handleClickOpenLinkDetail(`${link.source.id}_${link.target.id}`)

    }


    const [node_info, setNodeInfo] = useState("");
    const handleNodeInfo = (e) => {
        setNodeInfo(e.target.value)
    }

    const handleAddNode = () => {
        let _node={"id": "adfa", "walletRank": 1213, "clusterRank": "asfd"}
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

    // const [random, setRandom] = useState(1)
    // const handleRandomColor = (item) => {
    //     if (0) {
    //         return ""
    //     }
    //     else return item["nodeColor"]
    // }
    // // end react force graph

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
    const [nodeDetail, setNodeDetail] = useState({"id": 1, "clusterRank":1, "walletRank": 1, "clusterPercent":1, "walletPercent": 1})
    const handleClickOpenNodeDetail = (row) => {
        setNodeDetail(row)
        setOpenNodeDetail(true);
    };

    const handleClickToCluster = (rank) => {
        setOpenNodeDetail(true);
    }

    const handleCloseNodeDetail = () => {
        setOpenNodeDetail(false);
    };

    const descriptionNodeDetailRef = useRef(null);
    // useEffect(() => {
    //     if (openNodeDetail) {
    //         const { current: descriptionNodeDetail } = descriptionNodeDetailRef;
    //         if (descriptionNodeDetail !== null) {
    //             descriptionNodeDetail.focus();
    //         }
    //     }
    // }, [openNodeDetail]);

    const [alignmentNodeDetail, setAlignmentNodeDetail] = useState("wallet");
    const handleChangeToggleNodeDetail = (event, newAlignment) => {
        setAlignmentNodeDetail(newAlignment);
    };

    const [dataChart, setDataChart] = useState();
    const handleTypeNodeDetail = (type) => {
        if (type === "wallet") {
            setDataChart(walletChangeLogs)
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
            data: [],
            tooltip: {
                valueDecimals: 2
            }
        }]
    }
    // end node detail

    // start link detail
    const [openLinkDetail, setOpenLinkDetail] = useState(false);
    const handleClickOpenLinkDetail = (address) => {
        setOpenLinkDetail(true);
    };

    const handleCloseLinkDetail = () => {
        setOpenLinkDetail(false);
    };

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
                                <h4>New wallets in month: 200</h4>
                                <h5>Total balance of new wallets in month: 2000 USD</h5>
                                <h5>Token amount of new wallets in month: 2000000000000 TRAVA</h5>

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
                                                            ? rankWallets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : rankWallets
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                handleClickNode(row);
                                                            }}>
                                                                <TableCell style={{ width: 10, overflow: "hidden" }} align="left">{row["walletRank"]}</TableCell>
                                                                <TableCell style={{ width: 100, overflow: "hidden" }} align="left">{row["id"]}</TableCell>
                                                                <TableCell style={{ width: 10, overflow: "hidden" }} align="left">{row["walletPercent"]}</TableCell>
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
                                                            ? nodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                            : nodes
                                                        ).map((row) => (
                                                            <TableRow className={classes.tableRow} key={row.id} onClick={() => {
                                                                handleClickOpenLinkDetail(row.rank);
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

                            <h5>Address: {nodeDetail["id"]}</h5>
                            <h5>Wallet rank: #{nodeDetail["walletRank"]}</h5>
                            <h5>Wallet percentage: {nodeDetail["walletPercent"]}%</h5>
                            <h5>Token amount in wallet: 10000000000000 TRAVA</h5>
                            <h5>Total balance in wallet: 10000 USD</h5>
                            <h5>Cluster rank: #{nodeDetail["clusterRank"]}</h5>
                            <h5>Cluster percentage: {nodeDetail["clusterPercent"]}%</h5>
                            <h5>Token amount in cluster: 20000000000000 TRAVA</h5>
                            <h5>Total balance in cluster: 20000 USD</h5>
                            <h5>Token change in month: 122332</h5>
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
                            <h5>Average #1 to #343: 20000 (USD)</h5>
                            <h5>Average #343 to #1: 123123 (USD)</h5>
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
                        graphData={graphData}
                        nodeLabel={node => `${node.id}: #${node.walletRank}`}
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
    const { RelationshipSpace } = state;
    return { RelationshipSpace };
}
const actions = {
    getTopWalletRelationship: RelationshipSpaceActions.getTopWalletRelationship,
    getTopClusterRelationship: RelationshipSpaceActions.getTopClusterRelationship                                                                                         
};

export default connect(mapState, actions)(RelationshipSpace);