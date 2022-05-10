import React, { Fragment, useState, useEffect } from 'react';

import clsx from 'clsx';
import { Link } from 'react-router-dom';

import {
  Hidden,
  IconButton,
  AppBar,
  Box,
  Button,
  Tooltip
} from '@material-ui/core';
import { ethers } from "ethers";
import { connect } from 'react-redux';

import { setSidebarToggleMobile } from '../../redux/ThemeOptions';
import projectLogo from '../../assets/images/react.svg';

import HeaderLogo from '../../layout-components/HeaderLogo';
import HeaderUserbox from '../../layout-components/HeaderUserbox';

import MenuOpenRoundedIcon from '@material-ui/icons/MenuOpenRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import { UserActions } from '../../modules/user/redux/actions'
import { AuthActions } from '../../modules/auth/redux/actions';

import { checkLogin } from '../../helpers';

const Header = props => {
  useEffect(() => {
    if (checkLogin()) {
      props.getCurrentUser();
    }
  }, []);

  const toggleSidebarMobile = () => {
    setSidebarToggleMobile(!sidebarToggleMobile);
  };
  const {
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile,
    auth
  } = props;

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(res => {
          // Return the address of the wallet
          handleLogin(res[0])
        })
    } else {
      alert("install metamask extension!!")
    }
  }

  const handleLogin = async (wallet_address) => {
    let data = await fetch(`${process.env.REACT_APP_SERVER}/v1/wallet?wallet_address=${wallet_address}`)
      .then(response => response.json())
      .catch(err => {
        return handleSignup(wallet_address)
      })
   
    if (data?.result) {
      let signature = await handleSignMessage(data.result.nonce)
      handleAuthenticate(data.result.address, signature)
    }
  };
  const handleSignup = async (wallet_address) => {
    let data = await fetch(`${process.env.REACT_APP_SERVER}/v1/wallet`, {
      body: JSON.stringify({ 'wallet_address': wallet_address }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json());
    return data
  }

  const handleSignMessage = async (nonce) => {
    try {
      const message = `I am signing my one-time nonce: ${nonce}`
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
  
      return signature
    } catch (err) {
      console.log(err)
    }
  };

  const handleAuthenticate = (address, signature) => {
    props.login({ 'address': address, 'signature': signature })
  }

  return (
    <Fragment>
      <AppBar
        color="secondary"
        className={clsx('app-header', {})}
        position={headerFixed ? 'fixed' : 'absolute'}
        elevation={headerShadow ? 11 : 3}>
        {!props.isCollapsedLayout && <HeaderLogo />}
        <Box className="app-header-toolbar">
          <Hidden lgUp>
            <Box
              className="app-logo-wrapper"
              title="Carolina React Admin Dashboard with Material-UI Free">
              <Link to="/DashboardDefault" className="app-logo-link">
                <IconButton
                  color="primary"
                  size="medium"
                  className="app-logo-btn">
                  <img
                    className="app-logo-img"
                    alt="Carolina React Admin Dashboard with Material-UI Free"
                    src={projectLogo}
                  />
                </IconButton>
              </Link>
              <Hidden smDown>
                <Box className="app-logo-text">NFT Analyze</Box>
              </Hidden>
            </Box>
          </Hidden>
          <Box className="d-flex align-items-center">
          </Box>
          <Box className="d-flex align-items-center">
            {checkLogin() ? (
              <HeaderUserbox />
            ) : (
              <Box className="d-flex align-items-center">
                <Button
                  className="m-1" variant="contained" color="default" size="small"
                  onClick={() => connectWallet()}>
                  Connect Wallet
                </Button>
              </Box>
            )}
            <Box className="toggle-sidebar-btn-mobile">
              <Tooltip title="Toggle Sidebar" placement="right">
                <IconButton
                  color="inherit"
                  onClick={toggleSidebarMobile}
                  size="medium">
                  {sidebarToggleMobile ? (
                    <MenuOpenRoundedIcon />
                  ) : (
                    <MenuRoundedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow,
  headerFixed: state.ThemeOptions.headerFixed,
  sidebarToggleMobile: state.ThemeOptions.sidebarToggleMobile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  setSidebarToggleMobile: enable => dispatch(setSidebarToggleMobile(enable)),
  getCurrentUser: () => dispatch(UserActions.getCurrentUser()),
  login: (data) => dispatch(AuthActions.login(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
