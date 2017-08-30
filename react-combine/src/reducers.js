import {SIGN_UP_DATA, CLASSIFICATION_DATA, SIGN_IN_DATA, INFO_INPUT_DATA} from './actions';
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

function selectClassification(state = {}, action){
    switch(action.type){
        case CLASSIFICATION_DATA:
            return Object.assign({}, state, {
                CLASSIFICATION_DATA: action.data
            })
        default: return state;
    }
}

function signIn(state = {}, action){
    switch(action.type){
        case SIGN_IN_DATA:
            return Object.assign({}, state, {
                SIGN_IN_DATA: action.data
            })
        default: return state;
    }
}

function infoInput(state = {}, action){
    switch(action.type){
        case INFO_INPUT_DATA:
            return Object.assign({}, state, {
                INFO_INPUT_DATA: action.data
            })
        default: return state;
    }
}

const EntryDSM = combineReducers({
    signUp, selectClassification, signIn, infoInput
})

export default EntryDSM;