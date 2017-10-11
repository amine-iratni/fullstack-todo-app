import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

/*
  LOAD DATA FROM CORE 
*/
import { ApiService } from '../../../core/shared/services/api.service';

import { reducers, metaReducers } from '../../../core/store/reducers';
import { AuthCoreModule } from '../../../core/store/authentication/auth-core.module';
import { TodosCoreModule } from '../../../core/store/todo/todo-core.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    AuthCoreModule.forRoot(),
    TodosCoreModule.forRoot(),

    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiService
  ]
})
export class AppModule { }
