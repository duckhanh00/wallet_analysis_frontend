import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton
} from '@material-ui/core';

import { UserActions } from '../redux/actions'

import { PageTitle } from '../../../layout-components';

function UserManagement(props) {
  const { user } = props;

  useEffect(() => {
    props.getUsers({})
  }, [])

  let users = user?.currentUser;
  return (
    <Fragment>
      <PageTitle titleHeading={`User management`} />
      <TableContainer className="mb-4">
        <Table className="table table-hover table-borderless table-alternate text-nowrap">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell className="text-center">Email</TableCell>
              <TableCell className="text-center">Phone</TableCell>
              <TableCell className="text-center">Status</TableCell>
              <TableCell className="text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.docs?.length > 0 &&
              users.docs.map(item => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="d-flex">
                      <div>
                        <span className="text-black-50 d-block">
                          {item.fullname}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-weight-bold">
                      {item.email}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-weight-bold">
                      {item.phone}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="badge badge-danger">{item.status}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Box>
                      <IconButton color="primary" size="small">
                        <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

function mapState(state) {
  const { user } = state;
  return { user };
}
const actions = {
  getUsers: UserActions.getUsers
};

export default connect(mapState, actions)(UserManagement);
