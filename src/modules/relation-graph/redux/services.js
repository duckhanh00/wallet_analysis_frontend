/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const RelationGraphServices = {
    getWalletType,
    getCloseRelationEdges,
    getCloseRelationNodes
}

function getWalletType(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/wallet_type?token_name=${token_name}&chain_name=${chain_name}`
    })
}

function getCloseRelationEdges(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/close_relation_edges?token_name=${token_name}&chain_name=${chain_name}`
    })
}

function getCloseRelationNodes(token_name, chain_name) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/close_relation_nodes?token_name=${token_name}&chain_name=${chain_name}`
    })
}
