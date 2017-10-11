import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { routes } from './app-routing.module';

import { ElectronService } from './shared/providers/electron.service';

import { SharedModule } from './shared/shared.module';

import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';

/*
  LOAD DATA FROM CORE 
*/
import { ApiService} from '../../../core/shared/services/api.service';

import { reducers, metaReducers} from '../../../core/store/reducers';
import { AuthCoreModule} from '../../../core/store/authentication/auth-core.module';
import { TodosCoreModule} from '../../../core/store/todo/todo-core.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    NgbModule.forRoot(),
    
        SharedModule,
        routes,
    
        TodosModule,
        AuthModule,
    
         StoreModule.forRoot(reducers, {metaReducers}),
    
         AuthCoreModule.forRoot(),
         TodosCoreModule.forRoot(),
    
         EffectsModule.forRoot([]),
         
         StoreDevtoolsModule.instrument()
  ],
  providers: [ElectronService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
