import { WhaleSpaceServices } from './services';
import { WhaleSpaceConstants } from './constants';

export const WhaleSpaceActions = {
  getTokenInfomation,
  getTopWhaleWallets,
  getTokenChangeLogs,
  getTokenDistribution
};

function getTokenInfomation(tokey_key) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_INFOMATION_REQUEST
    });
    WhaleSpaceServices.getTokenInfomation(tokey_key)
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

function getTopWhaleWallets(token_key) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_REQUEST
    });
    WhaleSpaceServices.getTopWhaleWallets(token_key)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_FAILURE,
          error: error
        });
      });
  };
}

function getTokenChangeLogs(token_key, address) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_CHANGE_LOGS_REQUEST
    });
    WhaleSpaceServices.getTokenChangeLogs(token_key, address)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_CHANGE_LOGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_CHANGE_LOGS_FAILURE,
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

