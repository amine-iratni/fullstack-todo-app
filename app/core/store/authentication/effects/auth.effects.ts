import { Injectable } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Effect, Actions, toPayload } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { Observable } from "rxjs/Observable";

import * as Auth from '../actions/auth';


@Injectable()
export class AuthenticationEffects {
  constructor(private authService: AuthService, private actions$: Actions) { }

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(Auth.LOGIN)
    .map<Action, { email: string, password: string }>(toPayload)
    .switchMap(payload => this.authService.login(payload.email, payload.password)
      .mergeMap((res: any) => {
        return [
          new Auth.LoginSuccess(res),
        ];
      })
      .catch((_error) => Observable.of(new Auth.LoginFailure(_error)))
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(Auth.REGISTER)
    .map<Action, { email: string, password: string, firstName: string, lastName: string }>(toPayload)
    .switchMap(payload => this.authService.register(payload.email, payload.password, payload.firstName, payload.lastName)
      .mergeMap((res: any) => {
        return [
          new Auth.RegisterSuccess(res)
        ];
      })
      .catch((_error) => Observable.of(new Auth.RegisterFailure(_error)))
    );

  @Effect()
  logout$ = this.actions$
    .ofType(Auth.LOGOUT)
    .switchMap(action => this.authService.logout()
      .map((res: any) => new Auth.LogoutSuccess())
    );

  @Effect()
  checkAuth$ = this.actions$
    .ofType(Auth.CHECK_AUTH)
    .map<Action, void>(toPayload)
    .exhaustMap(() =>
      this.authService
        .checkAuth()
        .map(user => {

          return user ? new Auth.CheckAuthenticationSuccess(user) : new Auth.CheckAuthenticationNoUser({});
        })
        .catch(error => Observable.of(new Auth.LoginFailure(error)))
    );
}