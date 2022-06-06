import { combineReducers } from 'redux';

import ThemeOptions from './ThemeOptions';
import { RelationGraph } from '../modules/relation-graph/redux/reducers'



const appReducer = combineReducers({
    ThemeOptions,
    RelationGraph
})

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
    }

    return appReducer(state, action);
}

export default rootReducer;