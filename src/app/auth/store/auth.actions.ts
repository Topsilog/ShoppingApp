import { Action } from "@ngrx/store";

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const TRY_SINGUP = 'TRY_SIGNUP';

export class SignUp implements Action {
    readonly type = SIGNUP;
}
export class SignIn implements Action {
    readonly type = SIGNIN;
}
export class LogOut implements Action {
    readonly type = LOGOUT;
}
export class SetToken implements Action {
    readonly type = SET_TOKEN;

    constructor(public payload: string) {}
}
export class TrySIgnup implements Action {
    readonly type = TRY_SINGUP;
    constructor(public payload: {username: string, password: string}) {}
}

export type AuthActions = SignUp | SignIn | LogOut | SetToken | TrySIgnup;