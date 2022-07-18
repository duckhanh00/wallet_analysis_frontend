/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const RelationshipSpaceService = {
    getTopWalletRelationship,
    getTopClusterRelationship,
    getTopListCluster,
    getClusterTokenChangeLogs
}

function getTopWalletRelationship(token_key, type) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_wallet_relationship?token_key=${token_key}&type=${type}`
    })
}

function getTopClusterRelationship(token_key, type) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_cluster_relationship?token_key=${token_key}&type=${type}`
    })
}

function getTopListCluster(token_key, type) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/top_list_cluster?token_key=${token_key}&type=${type}`
    })
}

function getClusterTokenChangeLogs(token_key, type) {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/cluster_token_change_logs?token_key=${token_key}&rank=${rank}`
    })
}