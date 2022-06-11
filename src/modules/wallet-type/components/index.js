import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import GeneralTokenInfo from "./general-token-info/components/index.jsx";
import TokenAllocationChart from './token-allowcation-chart/components/index.jsx';
import WalletClassificationChart from './wallet-classification-chart/components/index.jsx';
import TotalHoldersChart from "./total-holders-chart/components/index.jsx";
import MarketCapChart from "./market-cap-chart/components/index.jsx";

import './style.scss'
function WalletType(props) {
  return (
    <Fragment>
        <GeneralTokenInfo/>
        <WalletClassificationChart/>
        <MarketCapChart />
        <TokenAllocationChart/>
        <TotalHoldersChart/>     
    </Fragment>
  );
}

function mapState(state) {
  const {} = state;
  return {};
}
const actions = {};

export default connect(mapState, actions)(WalletType);
