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
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup; 
  
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
    private store: Store<fromAuth.State>
  ) {

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

  registerClicked(event) {
    this.store.dispatch(new Auth.Register(
      {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,        
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      }
    ));
  }

  /**
   * ----------------------------------------------------
   * Other private functions
   * ----------------------------------------------------
   */

  createForm() {
    let firstName = new FormControl('', [Validators.required]);
    let lastName = new FormControl('', [Validators.required]);
    let email = new FormControl('', [Validators.required, Validators.email]);
    let password = new FormControl('', [Validators.required]);

    this.registerForm = new FormGroup({
      firstName,
      lastName,
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
