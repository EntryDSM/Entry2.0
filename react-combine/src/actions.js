//Actions
export const SIGN_UP_DATA = 'SIGN_UP_DATA';
export const CLASSIFICATION_DATA = 'CLASSIFICATION_DATA';
export const SIGN_IN_DATA = 'SIGN_IN_DATA';
export const INFO_INPUT_DATA = 'INFO_INPUT_DATA';
export const INTRODUCE_DATA = 'INTRODUCE_DATA';

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

//Input3 인적사항
export function infoInputData(data){
    return {type: INFO_INPUT_DATA, data};
}
//Input5 자기소개서
export function introduceData(data){
    return {typs: INTRODUCE_DATA, data};
}