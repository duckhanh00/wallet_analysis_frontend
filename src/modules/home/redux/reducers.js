import { HomeSpaceConstants } from './constants';

export function HomeSpace(state = {}, action) {
    switch (action.type) {
        case HomeSpaceConstants.GET_LIST_ALL_TOKENS_REQUEST:
            return {
                ...state,
            }
        case HomeSpaceConstants.GET_LIST_ALL_TOKENS_SUCCESS:
            return {
                ...state,
                listAllTokens: action.payload
            }
        case HomeSpaceConstants.GET_LIST_ALL_TOKENS_FAILURE:
            return {
                ...state,
            }

        default:
            return state;
    }
}