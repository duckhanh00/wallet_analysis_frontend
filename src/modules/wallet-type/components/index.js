import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import TokenAllocationChart from './tokenAllocationChart';
import WalletClassificationChart from './walletClassificationChart';
import TotalHoldersChart from "./totalHoldersChart";
import MarketCapChart from "./marketCapChart";

import './style.scss'
function WalletType(props) {
  return (
    <Fragment>
      <div className='wallet-type'>
        <MarketCapChart />
        <TokenAllocationChart/>
        <TotalHoldersChart/>
        <WalletClassificationChart/>
      </div>
      {/* <TokenAllocationChart /> */}
      {/* <TotalHoldersChart /> */}
    </Fragment>
  );
}

function mapState(state) {
  const {} = state;
  return {};
}
const actions = {};

export default connect(mapState, actions)(WalletType);
