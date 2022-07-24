import { RelationshipSpaceService } from './services';
import { RelationshipSpaceConstants } from './constants';


export const RelationshipSpaceActions = {
  getWalletNodeRelationship,
  getWalletLinkRelationship,
  getClusterNodeRelationship,
  getClusterLinkRelationship,
  getClusterTokenChangeLogs,
  getTokenChangeLogs,
  getListCluster,
  getLinkDetail,
  getTokenInfomation
};

function getWalletNodeRelationship(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getWalletNodeRelationship(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}

function getWalletLinkRelationship(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getWalletLinkRelationship(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}

function getClusterNodeRelationship(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getClusterNodeRelationship(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}

function getClusterLinkRelationship(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_REQUEST
    });
    RelationshipSpaceService.getClusterLinkRelationship(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_FAILURE,
          error: error
        });
      });
  };
}


function getListCluster(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_LIST_CLUSTER_REQUEST
    });
    RelationshipSpaceService.getListCluster(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_LIST_CLUSTER_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_LIST_CLUSTER_FAILURE,
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

function getTokenChangeLogs(token_key, address) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_TOKEN_CHANGE_LOGS_REQUEST
    });
    RelationshipSpaceService.getTokenChangeLogs(token_key, address)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOKEN_CHANGE_LOGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOKEN_CHANGE_LOGS_FAILURE,
          error: error
        });
      });
  };
}

function getLinkDetail(token_key, source, target) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_LINK_DETAIL_REQUEST
    });
    RelationshipSpaceService.getLinkDetail(token_key, source, target)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_LINK_DETAIL_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_LINK_DETAIL_FAILURE,
          error: error
        });
      });
  };
}

function getTokenInfomation(token_key) {
  return dispatch => {
    dispatch({
      type: RelationshipSpaceConstants.GET_TOKEN_INFOMATION_REQUEST
    });
    RelationshipSpaceService.getTokenInfomation(token_key)
      .then(res => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOKEN_INFOMATION_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationshipSpaceConstants.GET_TOKEN_INFOMATION_FAILURE,
          error: error
        });
      });
  };
}