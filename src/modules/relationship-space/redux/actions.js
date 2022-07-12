import { RelationGraphServices } from './services';
import { RelationGraphConstants } from './constants';


export const RelationGraphActions = {
  getCloseRelationEdges,
  getCloseRelationNodes,
  getRelationshipTokenChangeLogs
};

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

function getRelationshipTokenChangeLogs(token_name, chain_name, address) {
  return dispatch => {
    dispatch({
      type: RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_REQUEST
    });
    RelationGraphServices.getRelationshipTokenChangeLogs(token_name, chain_name, address)
      .then(res => {
        dispatch({
          type: RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_FAILURE,
          error: error
        });
      });
  };
}
