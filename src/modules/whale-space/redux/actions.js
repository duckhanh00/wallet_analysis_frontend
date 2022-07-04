import { WalletTypeServices } from './services';
import { WalletTypeConstants } from './constants';

export const WalletTypeActions = {
  getTokenGeneral,
  getWalletType
};

function getTokenGeneral(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: WalletTypeConstants.GET_TOKEN_GENERAL_REQUEST
    });
    WalletTypeServices.getTokenGeneral(token_name, chain_name)
      .then(res => {
        dispatch({
          type: WalletTypeConstants.GET_TOKEN_GENERAL_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WalletTypeConstants.GET_TOKEN_GENERAL_FAILURE,
          error: error
        });
      });
  };
}

function getWalletType(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: WalletTypeConstants.GET_WALLET_TYPE_REQUEST
    });
    WalletTypeServices.getWalletType(token_name, chain_name)
      .then(res => {
        dispatch({
          type: WalletTypeConstants.GET_WALLET_TYPE_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: WalletTypeConstants.GET_WALLET_TYPE_FAILURE,
          error: error
        });
      });
  };
}



