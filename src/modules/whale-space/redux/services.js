/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers';

export const WalletTypeServices = {
    getTokenGeneral,
    getWalletType
   
}

function getTokenGeneral(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/token_general?token_name=${token_name}&chain_name=${chain_name}`
    })
}

function getWalletType(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/wallet_type?token_name=${token_name}&chain_name=${chain_name}`
    })
}

