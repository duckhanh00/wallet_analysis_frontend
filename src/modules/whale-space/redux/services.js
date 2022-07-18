/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers';

export const WhaleSpaceServices = {
    getTokenGeneral,
    getTopWallet,
    getTopWalletTokenChangeLogs,
    getTokenDistribution
}

function getTokenGeneral() {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/list_all_tokens`
    })
}

function getTopWallet(token_key) {
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