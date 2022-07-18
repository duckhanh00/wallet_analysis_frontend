import { HomeSpaceService } from './services';
import { HomeSpaceConstants } from './constants';


export const HomeSpaceActions = {
  getListAllTokens
};

function getListAllTokens(token_key, type) {
  return dispatch => {
    dispatch({
      type: HomeSpaceConstants.GET_LIST_ALL_TOKENS_REQUEST
    });
    HomeSpaceService.getListAllTokens(token_key, type)
      .then(res => {
        dispatch({
          type: HomeSpaceConstants.GET_LIST_ALL_TOKENS_SUCCESS,
          payload: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: HomeSpaceConstants.GET_LIST_ALL_TOKENS_FAILURE,
          error: error
        });
      });
  };
}