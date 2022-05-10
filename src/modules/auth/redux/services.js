/* eslint-disable no-undef */
import { sendRequestToServer, filterObject } from '../../../helpers/';

export const AuthServices = {
    login,
    loginOAuth,
    logout,
}

/** Đăng nhập */
function login(data) {
    data = filterObject(data, ["address", "signature"])

    return sendRequestToServer({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/v1/auth/login`,
        data: data
    })
}

/** Đăng nhập */
function loginOAuth() {
    return sendRequestToServer({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/api/v1/auth/login-oauth`,
    })
}

function logout() {
    return sendRequestToServer({
        method: 'POST',
        url: `${process.env.REACT_APP_SERVER}/api/v1/auth/logout`
    })
}
