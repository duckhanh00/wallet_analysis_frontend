import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  Grid, Card
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';

import { checkLogin } from '../../../helpers/'

import KnightHoldingChart from './knightHoldingChart'
import ArmouryHoldingChart from './armouryHoldingChart'
import TradingOfWalletChart from './tradingOfWalletChart'

function UserAnalysis(props) {
  return (
    <Fragment>
      {checkLogin()
        ? <>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TradingOfWalletChart />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <KnightHoldingChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <ArmouryHoldingChart />
            </Grid>
          </Grid>
        </>
        : <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card className="card-box mb-4" style={{ padding: '10px', textAlign: 'center' }}>
              <WarningIcon style={{ color: "#aca10ade" }} />
              <div>Please Connect Wallet !</div>
            </Card>
          </Grid>
        </Grid>
      }
    </Fragment>
  );
}

function mapState(state) {
  const { user } = state;
  return { user };
}
const actions = {
};

export default connect(mapState, actions)(UserAnalysis);
