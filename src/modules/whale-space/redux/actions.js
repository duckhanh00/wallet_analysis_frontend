import { WhaleSpaceServices } from './services';
import { WhaleSpaceConstants } from './constants';

export const WhaleSpaceActions = {
  getTokenGeneral,
  getTopWallet,
  getTopWalletTokenChangeLogs,
  getTokenDistribution
};

function getTokenGeneral(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_GENERAL_REQUEST
    });
    WhaleSpaceServices.getTokenGeneral(token_name, chain_name)
      .then(res => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_GENERAL_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WhaleSpaceConstants.GET_TOKEN_GENERAL_FAILURE,
          error: error
        });
      });
  };
}

function getTopWallet(token_name, chain_name, variable, is_contract) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOP_WALLET_REQUEST
    });
    WhaleSpaceServices.getTopWallet(token_name, chain_name, variable, is_contract)
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

function getTopWalletTokenChangeLogs(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_REQUEST
    });
    WhaleSpaceServices.getTopWalletTokenChangeLogs(token_name, chain_name)
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

function getTokenDistribution(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_REQUEST
    });
    WhaleSpaceServices.getTokenDistribution(token_name, chain_name)
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


