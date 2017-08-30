//Actions
export const SIGN_UP_DATA = 'SIGN_UP_DATA';
export const CLASSIFICATION_DATA = 'CLASSIFICATION_DATA';
export const SIGN_IN_DATA = 'SIGN_IN_DATA';

//Action Creator

//Input1
export function signUpData(data){
    return {type: SIGN_UP_DATA, data};
}

//Input2
export function classificationData(data){
    return {type: CLASSIFICATION_DATA, data};
}

//SignIn
export function signInData(data){
    return {type: SIGN_IN_DATA, data};
}