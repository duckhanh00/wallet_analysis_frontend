/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const UserAnalysisServices = {
    getHoldingKnightDistribution,
    getHoldingArmouryDistribution,
    getTradingOfWallet
}

/** Get knight holding */
function getHoldingKnightDistribution(chainId) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/wallet/nft/trava_knight/${chainId}/holding`,
    })
}

/** Get armoury holding */
function getHoldingArmouryDistribution(chainId) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/wallet/nft/trava_armoury/${chainId}/holding`,
    })
}

/** Get trading of wallet */
function getTradingOfWallet(data) {
    data = filterObject(data, ["range_time"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/wallet/nft/trade`,
        params: data
    })
}

