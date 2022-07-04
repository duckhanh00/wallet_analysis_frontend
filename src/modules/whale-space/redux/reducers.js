import { WalletTypeConstants } from './constants';

export function WalletType(state = {}, action) {
    switch (action.type) {
        case WalletTypeConstants.GET_TOKEN_GENERAL_REQUEST:
            return {
                ...state,
            }
        case WalletTypeConstants.GET_TOKEN_GENERAL_SUCCESS:
            return {
                ...state,
                tokenGeneral: action.payload
            }
        case WalletTypeConstants.GET_TOKEN_GENERAL_FAILURE:
            return {
                ...state,
            }

        case WalletTypeConstants.GET_WALLET_TYPE_REQUEST:
            return {
                ...state,
            }
        case WalletTypeConstants.GET_WALLET_TYPE_SUCCESS:
            return {
                ...state,
                walletType: action.payload
            }
        case WalletTypeConstants.GET_WALLET_TYPE_FAILURE:
            return {
                ...state,
            }


        default:
            return state;
    }
}