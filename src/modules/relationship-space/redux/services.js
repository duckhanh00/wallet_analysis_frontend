/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const RelationGraphServices = {
    getCloseRelationEdges,
    getCloseRelationNodes,
    getRelationshipTokenChangeLogs
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

function getRelationshipTokenChangeLogs(token_name, chain_name, address) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet/relationship_token_change_logs_with_address?token_name=${token_name}&chain_name=${chain_name}&address=${address}`
    })
}