import Cookies from 'js-cookie';

const axios = require('axios');

export function sendRequestToServer(req) {
    try {
        const { method, url, data, params } = req;

        return axios({
            method: method,
            url: url,
            data: data,
            // withCredentials: true,
            // headers: {
            //     'X-Content-Type-Options': 'nosniff',
            //     'X-Frame-Options':'deny',
            //     'Access-Control-Allow-Origin':'*',
            //     'content-type':'application/json'
            // },
            params: params
        })
        .then(response => {
            return response;
        })
        .catch(err => {
            console.log("error", err.response)
        });
    } catch (error) {
        return Promise.reject(error);
    }
}