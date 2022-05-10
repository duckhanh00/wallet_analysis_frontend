import Cookies from 'js-cookie';

export const setCookie = (tag, value) => {
    Cookies.set(tag, value);
}

export const getCookie = (tag) => {
    Cookies.get(tag);
}

export const removeCookie = (tag) => {
    Cookies.remove(tag)
}