import { UserConstants } from './constants';

export function user(state = {}, action) {
    switch (action.type) {
        case UserConstants.GET_USERS_REQUEST:
            return {
                ...state,
            }
        case UserConstants.GET_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        case UserConstants.GET_USERS_FAILURE:
            return {
                ...state,
            }

        case UserConstants.GET_CURRENT_USER_REQUEST:
            return {
                ...state,
            }
        case UserConstants.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload
            }
        case UserConstants.GET_CURRENT_USER_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}