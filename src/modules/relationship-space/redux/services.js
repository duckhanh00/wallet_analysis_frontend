/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const RelationshipSpaceService = {
    getWalletNodeRelationship,
    getClusterNodeRelationship,
    getClusterLinkRelationship,
    getTopListCluster,
    getClusterTokenChangeLogs,
    getLinkDetail
}

function getWalletNodeRelationship(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet_node_relationship?token_key=${token_key}`
    })
}

function getClusterNodeRelationship(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/cluster_node_relationship?token_key=${token_key}`
    })
}

function getClusterLinkRelationship(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/cluster_link_relationship?token_key=${token_key}`
    })
}

function getTopListCluster(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_list_cluster?token_key=${token_key}`
    })
}

function getClusterTokenChangeLogs(token_key, rank) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/cluster_token_change_logs?token_key=${token_key}&rank=${rank}`
    })
}

function getLinkDetail(token_key, source, target) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/link_detail?token_key=${token_key}&source=${source}&target=${target}`
    })
}