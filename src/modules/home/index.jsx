import React, { Fragment, useClasses } from 'react';
import { connect } from 'react-redux';

function Home(props) {
  return (
    <Fragment>
    </Fragment>
  );
}

function mapState(state) {
  const {} = state;
  return {};
}
const actions = {};

export default connect(mapState, actions)(Home);
