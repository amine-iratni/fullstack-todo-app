import {Action} from '@ngrx/store';
import {type} from '../../../shared/helpers/helper';

export const CHECK_AUTH =  type('[Auth] Check authentication');
export const CHECK_AUTH_SUCCESS = type('[Auth] Check authentication succes');
export const CHECK_AUTH_FAILED = type('[Auth] Check authentication failed');
export const CHECK_AUTH_SUCCESS_NO_USER = type('[Auth] Check authentication succes, but no user');
export const LOGIN = type('[Auth] Login user');
export const LOGIN_SUCCESS = type('[Auth] Login with success');
export const LOGIN_FAILED = type('[Auth] Login failed');
export const REGISTER = type('[Auth] Register user');
export const REGISTER_SUCCESS = type('[Auth] Register with success');
export const REGISTER_FAILED = type('[Auth] Register failed');
export const LOGOUT = type('[Auth] Logout user');
export const LOGOUT_SUCCESS = type('[Auth] Logout with success');
export const LOGOUT_FAILED = type('[Auth] Logout failed');
export const RESET_VIEW_STATE = type('[Auth] Reset views state');


export class CheckAuthentication implements Action {
  readonly type = CHECK_AUTH;

  constructor(public payload: any = {}) {}
}

export class CheckAuthenticationSuccess implements Action {
  readonly type = CHECK_AUTH_SUCCESS;

  constructor(public payload: any = {}) {}
}

export class CheckAuthenticationFailure implements Action {
  readonly type = CHECK_AUTH_FAILED;

  constructor(public payload: any = {}) {
  }
}
export class CheckAuthenticationNoUser implements Action {
  readonly type = CHECK_AUTH_SUCCESS_NO_USER;

  constructor(public payload: any = {}) {}
}

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: any = {}) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: any = {}) {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILED;

  constructor(public payload: any = {}) {}
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: any = {}) {}
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: any = {}) {}
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILED;

  constructor(public payload: any = {}) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  
  constructor(public payload: any = {}) {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor(public payload: any = {}) {}
}

export class LogoutFailure implements Action {
  readonly type = LOGOUT_FAILED;

  constructor(public payload: any = {}) {}
}

export class ResetViewState implements Action {
  readonly type = RESET_VIEW_STATE;

  constructor(public payload: any = {}) {}
}

export type Actions =
| CheckAuthentication
| CheckAuthenticationSuccess
| CheckAuthenticationFailure
| CheckAuthenticationNoUser
| Login
| LoginSuccess
| LoginFailure
| Register
| RegisterSuccess
| RegisterFailure
| Logout
| LogoutSuccess
| LogoutFailure
| ResetViewState;