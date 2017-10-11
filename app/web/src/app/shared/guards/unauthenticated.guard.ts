import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Store } from '@ngrx/store';
import {Observable} from "rxjs/Rx";

import * as Auth from '../../../../../core/store/authentication/actions/auth';
import * as fromAuth from '../../../../../core/store/authentication/reducers';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.getLoggedIn).map(authed => {
        if (authed) {
          this.router.navigate(['/todos']);
          return false;
        }
        return true;
      })
      .take(1);
  }
}