import { UserAnalysisServices } from './services';
import { UserAnalysisConstants } from './constants';

export const UserAnalysisActions = {
    getHoldingKnightDistribution,
    getHoldingArmouryDistribution,
    getTradingOfWallet
}

function getHoldingKnightDistribution(chainId) {
    return dispatch => {
        dispatch({
            type: UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_REQUEST
        });
        UserAnalysisServices.getHoldingKnightDistribution(chainId)
            .then(res => {
                dispatch({
                    type: UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_SUCCESS,
                    payload: res.data.result
                })
            })
            .catch(error => {
                dispatch({
                    type: UserAnalysisConstants.GET_HOLDING_KNIGHT_DISTRIBUTION_FAILURE,
                    error: error
                })
            })
    }
}


function getHoldingArmouryDistribution(chainId) {
    return dispatch => {
        dispatch({
            type: UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_REQUEST
        });
        UserAnalysisServices.getHoldingArmouryDistribution(chainId)
            .then(res => {
                dispatch({
                    type: UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_SUCCESS,
                    payload: res.data.result
                })
            })
            .catch(error => {
                dispatch({
                    type: UserAnalysisConstants.GET_HOLDING_ARMOURY_DISTRIBUTION_FAILURE,
                    error: error
                })
            })
    }
}

function getTradingOfWallet(data) {
    return dispatch => {
        dispatch({
            type: UserAnalysisConstants.GET_TRADING_OF_WALLET_REQUEST
        });
        UserAnalysisServices.getTradingOfWallet(data)
            .then(res => {
                dispatch({
                    type: UserAnalysisConstants.GET_TRADING_OF_WALLET_SUCCESS,
                    payload: res.data.result
                })
            })
            .catch(error => {
                dispatch({
                    type: UserAnalysisConstants.GET_TRADING_OF_WALLET_FAILURE,
                    error: error
                })
            })
    }
}

