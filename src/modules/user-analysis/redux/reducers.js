import { UserAnalysisConstants } from './constants';

export function userAnalysis(state = {}, action) {
    switch (action.type) {
        case UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_REQUEST:
            return {
                ...state,
            }
        case UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                hodingKnightDistribution: action.payload
            }
        case UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_FAILURE:
            return {
                ...state,
            }

        case UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_REQUEST:
            return {
                ...state,
            }
        case UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_SUCCESS:
            return {
                ...state,
                hodingArmouryDistribution: action.payload
            }
        case UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_FAILURE:
            return {
                ...state,
            }

        case UserAnalysisConstants.GET_TRADING_OF_WALLET_REQUEST:
            return {
                ...state,
            }
        case UserAnalysisConstants.GET_TRADING_OF_WALLET_SUCCESS:
            return {
                ...state,
                tradingOfWallet: action.payload
            }
        case UserAnalysisConstants.GET_TRADING_OF_WALLET_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}