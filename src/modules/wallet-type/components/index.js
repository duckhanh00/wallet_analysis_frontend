import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import TokenAllocationChart from './tokenAllocationChart';
import TotalHoldersChart from './totalHoldersChart';

function WalletType(props) {

  return (
    <Fragment>
        <TokenAllocationChart/>
        <TotalHoldersChart/>
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
