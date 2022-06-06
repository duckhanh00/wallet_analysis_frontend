import { RelationGraphServices } from './services';
import { RelationGraphConstants } from './constants';

import { clearStorage, setCookie } from '../../../helpers';

export const RelationGraphActions = {
  getWalletType,
  getCloseRelationEdges,
  getCloseRelationNodes
};

function getWalletType(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: RelationGraphConstants.GET_WALLET_TYPE_REQUEST
    });
    RelationGraphServices.getWalletType(token_name, chain_name)
      .then(res => {
        dispatch({
          type: RelationGraphConstants.GET_WALLET_TYPE_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationGraphConstants.GET_WALLET_TYPE_FAILURE,
          error: error
        });
      });
  };
}

function getCloseRelationEdges(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: RelationGraphConstants.GET_CLOSE_RELATION_EDGES_REQUEST
    });
    RelationGraphServices.getCloseRelationEdges(token_name, chain_name)
      .then(res => {
        dispatch({
          type: RelationGraphConstants.GET_CLOSE_RELATION_EDGES_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationGraphConstants.GET_CLOSE_RELATION_EDGES_FAILURE,
          error: error
        });
      });
  };
}

function getCloseRelationNodes(token_name, chain_name) {
  return dispatch => {
    dispatch({
      type: RelationGraphConstants.GET_CLOSE_RELATION_NODES_REQUEST
    });
    RelationGraphServices.getCloseRelationNodes(token_name, chain_name)
      .then(res => {
        dispatch({
          type: RelationGraphConstants.GET_CLOSE_RELATION_NODES_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationGraphConstants.GET_CLOSE_RELATION_NODES_FAILURE,
          error: error
        });
      });
  };
}

