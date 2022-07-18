/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers';

export const WhaleSpaceServices = {
    getTokenInfomation,
    getListAllTokens,
    getTopWhaleWallet,
    getTopWalletTokenChangeLogs,
    getTokenDistribution
}

function getTokenInfomation() {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/token_infomation?token_key=${token_key}`
    })
}

function getListAllTokens() {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/list_all_tokens`
    })
}

function getTopWhaleWallet(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_whale_wallets?token_key=${token_key}`
    })
}

function getTopWalletTokenChangeLogs(token_key, address) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_change_logs?token_key=${token_key}&address=${address}`
    })
}

function getTokenDistribution(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/token_distribution?token_key=${token_key}`
    })
}