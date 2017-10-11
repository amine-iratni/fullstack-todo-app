import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Store } from "@ngrx/store";

import * as Auth from '../../../core/store/authentication/actions/auth';
import * as fromAuth from '../../../core/store/authentication/reducers';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public app: App,
    public splashScreen: SplashScreen,
    private store: Store<fromAuth.State>) {

    store.dispatch(new Auth.CheckAuthentication());

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'md-home' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.store.select(fromAuth.getLoggedIn).subscribe((isAuthenticated)=> {
        this.app.getRootNav().setRoot( isAuthenticated ? 'HomePage' : 'LoginPage' );     
      }); 
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.store.dispatch(new Auth.Logout());
  }
}
