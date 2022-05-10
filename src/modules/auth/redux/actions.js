import { AuthServices } from './services';
import { AuthConstants } from './constants';

import { clearStorage, setCookie, removeCookie } from '../../../helpers';

export const AuthActions = {
  login,
  loginOAuth,
  logout
};

/** Đăng nhập */
function login(data) {
  return dispatch => {
    dispatch({
      type: AuthConstants.LOGIN_REQUEST
    });
    AuthServices.login(data)
      .then(res => {
        localStorage.setItem("address", res.data.result.address)
        setCookie('token', res.data.result.jwt)
        setCookie('refreshToken', res.data.result.refreshToken)
        dispatch({
          type: AuthConstants.LOGIN_SUCCESS,
          payload: res.data.result
        });
      })
      .catch(error => {
        dispatch({
          type: AuthConstants.LOGIN_FAILURE,
          error: error
        });
      });
  };
}

function loginOAuth() {
  return dispatch => {
    dispatch({
      type: AuthConstants.LOGIN_REQUEST
    });
    AuthServices.loginOAuth()
      .then(res => {
        localStorage.setItem('id', res.data.content.user._id);
        localStorage.setItem('fullname', res.data.content.user.fullname);
        window.opener.location.reload();
        window.close();

        dispatch({
          type: AuthConstants.LOGIN_SUCCESS,
          payload: res.data.content
        });
      })
      .catch(error => {
        dispatch({
          type: AuthConstants.LOGIN_FAILURE,
          error: error
        });
      });
  };
}

function logout() {
  return dispatch => {
    dispatch({
      type: AuthConstants.LOG_OUT_REQUEST
    });
    AuthServices.logout()
      .then(res => {
        clearStorage();
        removeCookie("token")
        window.location.reload();

        dispatch({
          type: AuthConstants.LOG_OUT_SUCCESS,
          payload: res.data.content
        });
      })
      .catch(error => {
        dispatch({
          type: AuthConstants.LOG_OUT_FAILURE,
          error: error
        });
      });
  };
}
