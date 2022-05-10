import React, { Fragment, useClasses } from 'react';
import { connect } from 'react-redux';

function NotFound(props) {
  return (
    <Fragment>
      <div>Not Found</div>
    </Fragment>
  );
}

function mapState(state) {
  const {} = state;
  return {};
}
const actions = {};

export default connect(mapState, actions)(NotFound);
