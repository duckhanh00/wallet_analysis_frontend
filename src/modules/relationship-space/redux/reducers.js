import { RelationGraphConstants } from './constants';

export function RelationGraph(state = {}, action) {
    switch (action.type) {
        case RelationGraphConstants.GET_CLOSE_RELATION_EDGES_REQUEST:
            return {
                ...state,
            }
        case RelationGraphConstants.GET_CLOSE_RELATION_EDGES_SUCCESS:
            return {
                ...state,
                closeRelationEdges: action.payload
            }
        case RelationGraphConstants.GET_CLOSE_RELATION_EDGES_FAILURE:
            return {
                ...state,
            }


        case RelationGraphConstants.GET_CLOSE_RELATION_NODES_REQUEST:
            return {
                ...state,
            }
        case RelationGraphConstants.GET_CLOSE_RELATION_NODES_SUCCESS:
            return {
                ...state,
                closeRelationNodes: action.payload
            }
        case RelationGraphConstants.GET_CLOSE_RELATION_NODES_FAILURE:
            return {
                ...state,
            }

        case RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_REQUEST:
            return {
                ...state,
            }
        case RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_SUCCESS:
            return {
                ...state,
                relationshipTokenChangeLogs: action.payload
            }
        case RelationGraphConstants.GET_RELATIONSHIP_TOKEN_CHANGE_LOGS_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}