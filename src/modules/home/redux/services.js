/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const HomeSpaceService = {
    getListAllTokens
}

function getListAllTokens() {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/list_all_tokens`
    })
}
