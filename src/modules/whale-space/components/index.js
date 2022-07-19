import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

import GeneralTokenInfo from "./general-token-info/components/index.jsx";
import TokenDistribution from "./token-distribution/components/index.jsx";
import TopWhaleInfo from "./token-change-logs/components/index.jsx"
// import AntDesignGrid from "./wallet-table/AntDesignGrid.js";

import './style.scss'
function WhaleSpace(props) {
  return (
    <Fragment>
      <div className="whale-space">
        <GeneralTokenInfo />
        <TopWhaleInfo />
        <TokenDistribution />
      </div>
    </Fragment>
  );
}

function mapState(state) {
  const { } = state;
  return {};
}
const actions = {};

export default connect(mapState, actions)(WhaleSpace);
