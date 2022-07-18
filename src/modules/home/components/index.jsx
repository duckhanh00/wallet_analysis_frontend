import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Container , Paper, Typography} from "@mui/material";
import { HomeSpaceActions } from '../redux/actions'
import TokenListItem from "./token-list-item";


import './style.scss'

function HomeSpace(props) {
  const {HomeSpace} = props
  useEffect(()=>{
    props.getListAllTokens()
  }, [])

  let listAllTokens = []
  if (HomeSpace?.listAllTokens) {
    listAllTokens = HomeSpace.listAllTokens
  }
  console.log(listAllTokens)
  return (
    <Box sx={{minHeight: "92vh", paddingTop: "100px"}}>
      <Container>
        <Paper elevation={3} sx={{width: "50%", minHeight: "200px", backgroundColor: "#17171a", padding: "20px 0 40px 0", margin: "0 auto", border: "1px solid #323546", boxShadow: "rgb(232 179 11 / 20%) 0px 0px 24px"}}> 
          <Typography variant="h4" sx={{textAlign: "center", color: "white", fontWeight: 700 }}> Token List </Typography>
          <TokenListItem/>
          <TokenListItem/>
          <TokenListItem/>
          <TokenListItem/>
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
