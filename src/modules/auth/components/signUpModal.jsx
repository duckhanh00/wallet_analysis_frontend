import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  FormControlLabel,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Button,
  List,
  ListItem,
  TextField,
  FormControl,
  ListItemText,
  Grid
} from '@material-ui/core';

import { AuthActions } from '../redux/actions';

function SignUpModal(props) {
  const { openLoginModal } = props;
  const [state, setState] = useState({
    email: '',
    password: '',
    rememberMeChecked: true
  });
  const { email, password, rememberMeChecked } = state;

  const handleEmail = e => {
    setState({
      ...state,
      email: e.target.value
    });
  };

  const handlePassword = e => {
    setState({
      ...state,
      password: e.target.value
    });
  };

  const handleLogin = e => {
    e.preventDefault();
    props.login(state);
    props.handleCloseLoginModal();
  };

  const handleLoginGoogle = () => {
    window.open(
      `${process.env.REACT_APP_SERVER}/api/v1/auth/google`,
      '',
      `height=500,width=500,top=${window.innerHeight /
        2}, left=${window.innerWidth / 2}`
    );
  };

  const handleRememberMe = () => {};

  return (
    <Dialog
      open={openLoginModal}
      onClose={() => props.handleCloseLoginModal()}
      fullWidth
      maxWidth="xs"
      aria-labelledby="form-dialog-title">
      <DialogContent>
        <div>
          <div className="bg-secondary border-0">
            <div className="card-header d-block bg-white pt-4 pb-5">
              <div className="text-muted text-center mb-3">
                <span>Login in with</span>
              </div>
              <div className="text-center">
                <Button variant="outlined" className="mr-2 text-facebook">
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                  </span>
                  <span className="btn-wrapper--label">Facebook</span>
                </Button>
                <Button variant="outlined" className="ml-2 text-google"  onClick={() => handleLoginGoogle()}>
                  <span className="btn-wrapper--icon">
                    <FontAwesomeIcon icon={['fab', 'google']} />
                  </span>
                  <span className="btn-wrapper--label">Google</span>
                </Button>
              </div>
            </div>
            <div className="card-body px-lg-5 py-lg-5">
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item xs={12}>
                  <TextField fullWidth label="Email" type="email" id="input-email"/>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Password" type="password" id="input-password"/>
                </Grid>
              </Grid>
              <div className="w-100">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMeChecked}
                      onChange={() => handleRememberMe()}
                      value="rememberMeChecked"
                      color="primary"
                    />
                  }
                  label="Remember me"
                />
              </div>
              <div className="text-center">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleLogin()}
                  className="mt-4">
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function mapState(state) {
  const { auth } = state;
  return { auth };
}
const actions = {
  login: AuthActions.login
};

export default connect(mapState, actions)(SignUpModal);
