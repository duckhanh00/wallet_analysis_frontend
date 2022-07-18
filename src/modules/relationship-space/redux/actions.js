import { RelationshipSpaceService } from './services';
import { RelationshipSpaceConstants } from './constants';


export const RelationshipSpaceActions = {
  getTopWalletRelationship
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