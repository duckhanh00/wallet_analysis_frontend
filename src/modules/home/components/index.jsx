import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container , Paper, Typography} from "@mui/material";
import { HomeSpaceActions } from '../redux/actions'
import TokenListItem from "./token-list-item";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import './style.scss'

const chains = {
  "bsc": ["rgb(232, 179, 11)", "bsc.png", "BSC"],
  "polygon": ["", "polygon.svg", "POLYGON"],
  "eth": ["", "eth.png", "ETH"],
  "ftm": ["", "ftm.png", "FTM"],
}

function HomeSpace(props) {
  const [curChain, setCurChain] = useState("bsc");
  const [displayToggle, setDisplayToggle] = useState(false);
  const [listAllTokens, setListAllTokens] = useState(null);
  const [loading, setLoading] = useState(true);
  const {HomeSpace} = props;

  const handleChangeDisplayToggle = () => {
    setDisplayToggle(!displayToggle);
  }

  const handleChangeChain = (new_chain) => {
    setCurChain(new_chain);
    setDisplayToggle(false);
  }

  const fetchData = async () => {
      setLoading(true);
      await props.getListAllTokens();
      setLoading(false);
  }

  useEffect(() => {
    if(loading) {
      fetchData();
      setListAllTokens(HomeSpace.listAllTokens);
    }
  }, [loading])

  return (
    <Box sx={{minHeight: "100vh", paddingTop: "100px"}}>
      <Container>
        <Paper elevation={3} sx={{width: "50%", minHeight: "200px", backgroundColor: "#17171a", padding: "20px 0 40px 0", margin: "0 auto", border: "1px solid #323546", boxShadow: "rgb(232 179 11 / 20%) 0px 0px 24px"}}> 
          
          <Box sx={{backgroundColor: "#17171a", padding: "0 10px", borderRadius: "15px", display: "flex", width: "90%", margin: "0 auto"}} onClick={() => handleChangeDisplayToggle()}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", width: "142px", height: "35px", backgroundColor: "rgba(35,31,39,.5)", borderRadius: "15px"}}>
              <img
                className="logo-img"
                src={require(`../../../assets/images/${chains[curChain][1]}`)}
                alt="lo"
              />
              <Typography variant="body1" className="selected-text">{chains[curChain][2]}</Typography>
              <ArrowRightIcon sx={{color: "white"}}/>
            </Box>
            {Object.keys(chains).map((chain) => (
              chain == curChain ? " " :
              (<Box className={displayToggle ? "unhide-box" : "hide-box"} sx={{alignItems: "center", padding: "0 10px", marginLeft: "10px", backgroundColor: "rgba(35,31,39,.5)", justifyContent: "center", height: "35px", borderRadius: "15px"}} onClick={() => handleChangeChain(chain)}>
                <img
                  className="unselected-logo-img"
                  src={require(`../../../assets/images/${chains[chain][1]}`)}
                  alt="lo"
                />
                <Typography variant="body1" className="unselected-text">{chains[chain][2]}</Typography>
              </Box>)
            ))}
          </Box>

          <Typography variant="h4" sx={{textAlign: "center", color: "white", fontWeight: 700 }}> Token List </Typography>
          {listAllTokens ? <Box>
            {listAllTokens.map((token) => (
              token.chainName == curChain ? <TokenListItem name={token.name} imgSrc={token.image} /> : " "
            ))}
          </Box> : ""
           }
         
        </Paper>
      </Container>
    </Box>
  );
}

function mapState(state) {
  const { HomeSpace } = state;
  return { HomeSpace };
}
const actions = {
  getListAllTokens: HomeSpaceActions.getListAllTokens
};

export default connect(mapState, actions)(HomeSpace);
