import { AuthConstants } from './constants';

export function auth(state = {}, action) {
    switch (action.type) {
        case AuthConstants.LOGIN_REQUEST:
            return {
                ...state,
            }
        case AuthConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
                loginError: false,
                user: {
                    walletAddress: action.payload.address
                }
            }
        case AuthConstants.LOGIN_FAILURE:
            return {
                ...state,
                loginError: true
            }

        case AuthConstants.LOG_OUT_REQUEST:
            return {
                ...state,
            }
        case AuthConstants.LOG_OUT_SUCCESS:
            return {
                ...state,
            }
        case AuthConstants.LOG_OUT_FAILURE:
            return {
                ...state,
            }

    
        default:
            return state;
    }
}