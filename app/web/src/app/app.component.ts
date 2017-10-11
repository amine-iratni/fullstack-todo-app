import { Component } from '@angular/core';

import { Store } from '@ngrx/store';

import * as Auth from '../../../core/store/authentication/actions/auth';
import * as fromAuth from '../../../core/store/authentication/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private store: Store<fromAuth.State>) {
      store.dispatch(new Auth.CheckAuthentication());
  }
}