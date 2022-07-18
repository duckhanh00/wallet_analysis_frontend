import { RelationshipSpaceConstants } from './constants';

export function RelationshipSpace(state = {}, action) {
    switch (action.type) {
        case RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                topWalletRelationship: action.payload
            }
        case RelationshipSpaceConstants.GET_TOP_WALLET_RELATIONSHIP_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}