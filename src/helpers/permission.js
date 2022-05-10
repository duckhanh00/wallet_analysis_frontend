import Cookies from 'js-cookie';

export const checkLogin = () => {
    let isLogin = Cookies.get('token');

    return isLogin
}

export const checkRole = (rolePermissions, userRoles) => {
    if (rolePermissions === "@all") {
        return true
    } else {
        let intersection = []

        if (Array.isArray(rolePermissions) && Array.isArray(userRoles)) {
            intersection = rolePermissions?.filter(element => userRoles?.includes(element));
        }
        
        if (intersection?.length > 0) {
            return true
        }
    }

    return false
}