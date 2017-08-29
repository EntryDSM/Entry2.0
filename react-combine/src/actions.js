//Actions
export const SIGN_UP_DATA = 'SIGN_UP_DATA';
export const CLASSIFICATION_DATA = 'CLASSIFICATION_DATA';

//Action Creator
//Input1
export function signUpData(data){
    return {type: SIGN_UP_DATA, data};
}
//Input2
export function classficationData(data){
    return {type: CLASSIFICATION_DATA, data};
}