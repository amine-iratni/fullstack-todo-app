import { Component } from '@angular/core';
import { ElectronService } from './shared/providers/electron.service';

import { Store } from '@ngrx/store';

import * as Auth from '../../../core/store/authentication/actions/auth';
import * as fromAuth from '../../../core/store/authentication/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public electronService: ElectronService, private store: Store<fromAuth.State>) {

    store.dispatch(new Auth.CheckAuthentication());

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
}
