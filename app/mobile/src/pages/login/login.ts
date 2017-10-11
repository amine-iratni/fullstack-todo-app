import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  LoadingController,
  Loading,
  MenuController
} from 'ionic-angular';

import {FormControl, FormGroup, Validators} from "@angular/forms";

import { Store } from "@ngrx/store";

import * as Auth from '../../../../core/store/authentication/actions/auth';
import * as fromAuth from '../../../../core/store/authentication/reducers';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup; 
  
  private isAuthenticated$;
  private inProgress$;
  private error$;
  
  private loading: Loading = null;

  constructor(
    private navCtrl: NavController, 
    private menu: MenuController,    
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private store: Store<fromAuth.State>) {

    // Disable sidemenu
    this.menu.enable(false);
    
    // Create login form
    this.createForm();

    this.isAuthenticated$ = this.store.select(fromAuth.getLoggedIn).subscribe((isAuthenticated)=> {
      if (isAuthenticated) {
        this.isAuthenticated$.unsubscribe();
        this.menu.enable(true);
        this.navCtrl.setRoot('HomePage', {});
      }
    });

    this.inProgress$ = this.store.select(fromAuth.getInProgress).subscribe((inProgress: boolean) => {
      this.handleProgressDialog(inProgress);
    });

    this.error$ = this.store.select(fromAuth.getError).subscribe((error: any) => {
      if (error)
        this.displayAlert('Error', error);
    });
  }

  /**
   * ----------------------------------------------------
   * View Events
   * ----------------------------------------------------
   */

  ionViewDidLeave() {
    this.store.dispatch(new Auth.ResetViewState());
    this.isAuthenticated$.unsubscribe();
    this.inProgress$.unsubscribe();
    this.error$.unsubscribe();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

   /**
   * ----------------------------------------------------
   * View Actions
   * ----------------------------------------------------
   */

  loginClicked(event) {
    this.store.dispatch(new Auth.Login(
      {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
    ));
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  /**
   * ----------------------------------------------------
   * Other private functions
   * ----------------------------------------------------
   */

  createForm() {
    let email = new FormControl('', [Validators.required, Validators.email]);
    let password = new FormControl('', [Validators.required]);

    this.loginForm = new FormGroup({
      email,
      password
    });
  }

  displayAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  handleProgressDialog(_inProgress) {
    if (_inProgress && this.loading === null) {
      this.loading = this.loadingCtrl.create({
        content: "Loading..."
      });
      this.loading.present();
    }

    if (!_inProgress.inProgress && this.loading !== null) {
      this.loading && this.loading.dismiss();
      this.loading = null;
    }
  }
}
