import { WhaleSpaceServices } from './services';
import { WhaleSpaceConstants } from './constants';

export const WhaleSpaceActions = {
  getTokenInfomation,
  getTopWallet,
  getTopWalletTokenChangeLogs,
  getTokenDistribution
};

function getTokenInfomation() {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_INFOMATION_REQUEST
    });
    WhaleSpaceServices.getTokenInfomation()
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_INFOMATION_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_INFOMATION_FAILURE,
          error: error
        });
      });
  };
}

function getTopWallet(token_key) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOP_WALLET_REQUEST
    });
    WhaleSpaceServices.getTopWallet(token_key)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WALLET_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WALLET_FAILURE,
          error: error
        });
      });
  };
}

function getTopWalletTokenChangeLogs(token_key, address) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_REQUEST
    });
    WhaleSpaceServices.getTopWalletTokenChangeLogs(token_key, address)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_FAILURE,
          error: error
        });
      });
  };
}

function getTokenDistribution(token_key) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_REQUEST
    });
    WhaleSpaceServices.getTokenDistribution(token_key)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_FAILURE,
          error: error
        });
      });
  };
}


