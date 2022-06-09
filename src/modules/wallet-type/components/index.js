import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TokenAllocationChart from './tokenAllocationChart';
import TotalHoldersChart from './totalHoldersChart';
import WalletClassificationChart from './walletClassificationChart';

import './style.scss'
function WalletType(props) {

  return (
    <Fragment>
      <div className='wallet-type'>
        <TokenAllocationChart/>
        <TotalHoldersChart/>
        <WalletClassificationChart/>
      </div>
    </Fragment>
  );
}

function mapState(state) {
  const {  } = state;
  return {  };
}
const actions = {
};

export default connect(mapState, actions)(WalletType);
