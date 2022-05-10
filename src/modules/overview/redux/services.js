/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const OverviewDashboardServices = {
    getNftDashboardMarketCapVolume,
    getNftDashboardMarketPlaceTrend,
    getNftDashboardHolder,
    getNftDashboardTrader,
    getNftDashboardAveragePrice,
    getNftDashboardStaking
}

/** Get market cap and volume */
function getNftDashboardMarketCapVolume(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/dashboard/nft/${nft}/${chainId}/market-cap-volume`,
        params: data
    })
}

/** Get market place trend */
function getNftDashboardMarketPlaceTrend(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/nft/${nft}/${chainId}/history/market-place`,
        params: data
    })
}

/** Get holder */
function getNftDashboardHolder(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/nft/${nft}/${chainId}/history/amount`,
        params: data
    })
}

/** Get trader */
function getNftDashboardTrader(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/nft/${nft}/${chainId}/history/trader`,
        params: data
    })
}

/** Get average price */
function getNftDashboardAveragePrice(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/nft/${nft}/${chainId}/history/average-price`,
        params: data
    })
}

/** Get staking */
function getNftDashboardStaking(nft, chainId, data) {
    data = filterObject(data, ["range_time", "interval"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/nft/${nft}/${chainId}/history/staking`,
        params: data
    })
}

/** Get NFT stats */
function getNftStats(nft, chainId, data) {
    data = filterObject(data, ["range_time"])

    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/v1/dashboard/nft/${nft}/${chainId}/stats`,
        params: data
    })
}

