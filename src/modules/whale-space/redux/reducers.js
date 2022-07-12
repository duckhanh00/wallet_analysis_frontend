import { WhaleSpaceConstants } from './constants';

export function WhaleSpace(state = {}, action) {
    switch (action.type) {
        case WhaleSpaceConstants.GET_TOKEN_GENERAL_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOKEN_GENERAL_SUCCESS:
            return {
                ...state,
                tokenGeneral: action.payload
            }
        case WhaleSpaceConstants.GET_TOKEN_GENERAL_FAILURE:
            return {
                ...state,
            }

        case WhaleSpaceConstants.GET_TOP_WALLET_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOP_WALLET_SUCCESS:
            return {
                ...state,
                topWallet: action.payload
            }
        case WhaleSpaceConstants.GET_TOP_WALLET_FAILURE:
            return {
                ...state,
            }

        case WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_SUCCESS:
            return {
                ...state,
                topWalletTokenChangeLogs: action.payload
            }
        case WhaleSpaceConstants.GET_TOP_WALLET_TOKEN_CHANGE_LOGS_FAILURE:
            return {
                ...state,
            }

        case WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                tokenDistribution: action.payload
            }
        case WhaleSpaceConstants.GET_TOKEN_DISTRIBUTION_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}