import { OverviewDashboardServices } from './services';
import { OverviewDashboardConstants } from './constants';

import { clearStorage, setCookie } from '../../../helpers';

export const OverviewDashboardActions = {
  getWalletType,
  getCloseRelationEdges,
  getCloseRelationNodes
};

function getWalletType(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: OverviewDashboardConstants.GET_WALLET_TYPE_REQUEST
    });
    OverviewDashboardServices.getWalletType(token_name, chain_name)
      .then(res => {
        dispatch({
          type: OverviewDashboardConstants.GET_WALLET_TYPE_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: OverviewDashboardConstants.GET_WALLET_TYPE_FAILURE,
          error: error
        });
      });
  };
}

function getCloseRelationEdges(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_REQUEST
    });
    OverviewDashboardServices.getCloseRelationEdges(token_name, chain_name)
      .then(res => {
        dispatch({
          type: OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_FAILURE,
          error: error
        });
      });
  };
}

function getCloseRelationNodes(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_REQUEST
    });
    OverviewDashboardServices.getCloseRelationNodes(token_name, chain_name)
      .then(res => {
        dispatch({
          type: OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_FAILURE,
          error: error
        });
      });
  };
}

