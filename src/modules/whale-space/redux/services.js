/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers';

export const WhaleSpaceServices = {
    getTokenGeneral,
    getTopWallet,
    getTopWalletTokenChangeLogs,
    getTokenDistribution
}

function getTokenGeneral(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/token_general?token_name=${token_name}&chain_name=${chain_name}`
    })
}

function getTopWallet(token_name, chain_name, variable, is_contract) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/top_wallet?token_name=${token_name}&chain_name=${chain_name}&variable=${variable}&is_contract=${is_contract}`
    })
}

function getTopWalletTokenChangeLogs(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/top_wallet_token_change_logs?token_name=${token_name}&chain_name=${chain_name}`
    })
}

function getTokenDistribution(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/token_distribution?token_name=${token_name}&chain_name=${chain_name}`
    })
}