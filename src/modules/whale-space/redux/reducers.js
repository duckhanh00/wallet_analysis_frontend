import { WhaleSpaceConstants } from './constants';

export function WhaleSpace(state = {}, action) {
    switch (action.type) {
        case WhaleSpaceConstants.GET_TOKEN_INFOMATION_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOKEN_INFOMATION_SUCCESS:
            return {
                ...state,
                tokenInfomation: action.payload
            }
        case WhaleSpaceConstants.GET_TOKEN_INFOMATION_FAILURE:
            return {
                ...state,
            }

        case WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_REQUEST:
            return {
                ...state,
            }
        case WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_SUCCESS:
            return {
                ...state,
                topWhaleWallets: action.payload
            }
        case WhaleSpaceConstants.GET_TOP_WHALE_WALLETS_FAILURE:
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