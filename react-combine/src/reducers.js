import {SIGN_UP_DATA} from './actions';
import {combineReducers} from 'redux';

function signUp(state = {}, action){
    switch(action.type){
        case SIGN_UP_DATA:
            return Object.assign({}, state, {
                SIGN_UP_DATA: action.data
            })
        default: return state;
    }
}

const EntryDSM = combineReducers({
    signUp
})

export default EntryDSM;