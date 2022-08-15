/* eslint-disable no-undef */
import { sendRequestToServer } from '../../../helpers/';

export const RelationshipSpaceService = {
    getWalletNodeRelationship,
    getWalletLinkRelationship,
    getClusterNodeRelationship,
    getClusterLinkRelationship,
    getListCluster,
    getClusterTokenChangeLogs,
    getTokenChangeLogs,
    getLinkDetail,
    getTokenInfomation
}

function getWalletNodeRelationship(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet_node_relationship?token_key=${token_key}`
    })
}

function getWalletLinkRelationship(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/wallet_link_relationship?token_key=${token_key}`
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

function getListCluster(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/list_cluster_relationship?token_key=${token_key}`
    })
}

function getClusterTokenChangeLogs(token_key, cluster_rank) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/cluster_token_change_logs?token_key=${token_key}&cluster_rank=${cluster_rank}`
    })
}

function getTokenChangeLogs(token_key, address) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/token_change_logs?token_key=${token_key}&address=${address}`
    })
}

function getLinkDetail(token_key, source, target) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/link_detail?token_key=${token_key}&source=${source}&target=${target}`
    })
}

function getTokenInfomation(token_key) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/token_infomation?token_key=${token_key}`
    })
}