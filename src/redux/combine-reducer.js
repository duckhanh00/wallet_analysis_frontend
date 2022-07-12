import { combineReducers } from 'redux';

import ThemeOptions from './ThemeOptions';
import { RelationGraph } from '../modules/relationship-space/redux/reducers'
import { WhaleSpace } from '../modules/whale-space/redux/reducers'


const appReducer = combineReducers({
    ThemeOptions,
    RelationGraph,
    WhaleSpace
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
    }

    return appReducer(state, action);
}

export default rootReducer;