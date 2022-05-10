/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const UserServices = {
    getUsers,
    getCurrentUser,
    createUser
}

function getUsers(data) {
    data = filterObject(data, ["page", "limit"])
   
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/api/v1/user/users`,
        params: data
    })
}

function getCurrentUser() {
    return sendRequestToServer({
        method: 'GET',
        url: `${process.env.REACT_APP_SERVER}/api/v1/user`,
    })
}


/** Sign up */
function createUser(data) {
    data = filterObject(data, ["fullname", "email", "password"])

    return sendRequestToServer({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/api/v1/user/users`,
        data: data
    })
}
