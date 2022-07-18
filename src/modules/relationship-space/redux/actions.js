import { RelationshipSpaceService } from './services';
import { RelationshipSpaceConstants } from './constants';


export const RelationshipSpaceActions = {
  getTopWalletRelationship,
  getTopClusterRelationship,
  getClusterTokenChangeLogs,
  getTopListCluster,
  getLinkDetail
};

function getTopWalletRelationship(token_key, type) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getTopWalletRelationship(token_key, type)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}

function getTopClusterRelationship(token_key, type) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getTopClusterRelationship(token_key, type)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}

function getTopListCluster(token_key, type) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_TOP_LIST_CLUSTER_REQUEST
    });
    RelationshipSpaceService.getTopListCluster(token_key, type)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_LIST_CLUSTER_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOP_LIST_CLUSTER_FAILURE,
          error: error
        });
      });
  };
}

function getClusterTokenChangeLogs(token_key, rank) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_REQUEST
    });
    RelationshipSpaceService.getClusterTokenChangeLogs(token_key, rank)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_FAILURE,
          error: error
        });
      });
  };
}