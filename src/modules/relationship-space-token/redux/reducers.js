import { RelationshipSpaceConstants } from './constants';

export function RelationshipSpace(state = {}, action) {
    switch (action.type) {
        case RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                walletNodeRelationship: action.payload
            }
        case RelationshipSpaceConstants.GET_WALLET_NODE_RELATIONSHIP_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                walletLinkRelationship: action.payload
            }
        case RelationshipSpaceConstants.GET_WALLET_LINK_RELATIONSHIP_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                clusterNodeRelationship: action.payload
            }
        case RelationshipSpaceConstants.GET_CLUSTER_NODE_RELATIONSHIP_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_SUCCESS:
            return {
                ...state,
                clusterLinkRelationship: action.payload
            }
        case RelationshipSpaceConstants.GET_CLUSTER_LINK_RELATIONSHIP_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_LIST_CLUSTER_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_LIST_CLUSTER_SUCCESS:
            return {
                ...state,
                listCluster: action.payload
            }
        case RelationshipSpaceConstants.GET_LIST_CLUSTER_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_SUCCESS:
            return {
                ...state,
                topListCluster: action.payload
            }
        case RelationshipSpaceConstants.GET_CLUSTER_TOKEN_CHANGE_LOGS_FAILURE:
            return {
                ...state,
            }

        case RelationshipSpaceConstants.GET_LINK_DETAIL_REQUEST:
            return {
                ...state,
            }
        case RelationshipSpaceConstants.GET_LINK_DETAIL_SUCCESS:
            return {
                ...state,
                linkDetail: action.payload
            }
        case RelationshipSpaceConstants.GET_LINK_DETAIL_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}