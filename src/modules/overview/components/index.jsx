import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ForceGraph3D } from "react-force-graph";
import NetworkGraph from './networkGraph';

import data from './block.json'

function OverviewDashboard(props) { 
  return (
    <Fragment>
      <NetworkGraph/>
    </Fragment>  
  );
}

function mapState(state) {
  const { } = state;
  return {};
}
const actions = {
};

export default connect(mapState, actions)(OverviewDashboard);
