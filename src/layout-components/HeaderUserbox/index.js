import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  Avatar,
  Box,
  Menu,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider
} from '@material-ui/core';

import { AuthActions } from '../../modules/auth/redux/actions'

function HeaderUserbox(props) {
  const { user } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    props.logout()
  }

  let currentUser = user?.currentUser;
  let walletAddress = localStorage.getItem('address')
  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={handleClick}
        className="text-capitalize px-3 text-left btn-inverse d-flex align-items-center">
        <Box>
          <Avatar sizes="44" alt="Emma Taylor" src={currentUser?.avatar} />
        </Box>
        {walletAddress &&
          <div className="d-xl-block pl-2">
            <div className="font-weight-bold pt-1 line-height-3">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</div>
          </div>
        }
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        onClose={handleClose}
        className="ml-2">
        <div className="dropdown-menu-right dropdown-menu-lg overflow-hidden p-0">
          <List className="text-left bg-transparent d-flex align-items-center flex-column pt-0">
            <Box>
              <Avatar sizes="44" alt="Emma Taylor" src={currentUser?.avatar} />
            </Box>
            <div className="pl-3  pr-3">
              <div className="font-weight-bold text-center pt-2 line-height-1">
                {currentUser?.fullname}
              </div>
              <span className="text-black-50 text-center">
                {currentUser?.roles?.[0]?.name}
              </span>
            </div>
            <Divider className="w-100 mt-2" />
            <ListItem button>My Account</ListItem>
            <ListItem button>Profile settings</ListItem>
            <ListItem button>Active tasks</ListItem>
            <ListItem button style={{ color: '#f83245' }} onClick={() => handleLogout()}>Log out</ListItem>
          </List>
        </div>
      </Menu>
    </Fragment>
  );
}

function mapState(state) {
  const { user } = state;
  return { user };
}
const actions = {
  logout: AuthActions.logout
};

export default connect(mapState, actions)(HeaderUserbox);
