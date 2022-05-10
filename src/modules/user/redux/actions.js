import { UserServices } from './services';
import { UserConstants } from './constants';

export const UserActions = {
    getUsers,
    getCurrentUser
}

function getUsers(data) {
    return dispatch => {
        dispatch({
            type: UserConstants.GET_USERS_REQUEST
        });
        UserServices.getUsers(data)
            .then(res => {
                dispatch({
                    type: UserConstants.GET_USERS_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(error => {
                dispatch({
                    type: UserConstants.GET_USERS_FAILURE,
                    error: error
                })
            })
    }
}


function getCurrentUser() {
    return dispatch => {
        dispatch({
            type: UserConstants.GET_CURRENT_USER_REQUEST
        });
        UserServices.getCurrentUser()
            .then(res => {
                dispatch({
                    type: UserConstants.GET_CURRENT_USER_SUCCESS,
                    payload: res.data.content
                })
            })
            .catch(error => {
                dispatch({
                    type: UserConstants.GET_CURRENT_USER_FAILURE,
                    error: error
                })
            })
    }
}

