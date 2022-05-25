import { OverviewDashboardConstants } from './constants';

export function overviewDashboard(state = {}, action) {
    switch (action.type) {
        case OverviewDashboardConstants.GET_WALLET_TYPE_REQUEST:
            return {
                ...state,
            }
        case OverviewDashboardConstants.GET_WALLET_TYPE_SUCCESS:
            return {
                ...state,
                walletType: action.payload
            }
        case OverviewDashboardConstants.GET_WALLET_TYPE_FAILURE:
            return {
                ...state,
            }


        case OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_REQUEST:
            return {
                ...state,
            }
        case OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_SUCCESS:
            return {
                ...state,
                closeRelationEdges: action.payload
            }
        case OverviewDashboardConstants.GET_CLOSE_RELATION_EDGES_FAILURE:
            return {
                ...state,
            }


        case OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_REQUEST:
            return {
                ...state,
            }
        case OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_SUCCESS:
            return {
                ...state,
                closeRelationNodes: action.payload
            }
        case OverviewDashboardConstants.GET_CLOSE_RELATION_NODES_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}