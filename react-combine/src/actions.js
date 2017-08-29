//Actions
export const SIGN_UP_DATA = 'SIGN_UP_DATA';

//Action Creator
export function signUpData(data){
    return {type: SIGN_UP_DATA, data};
}