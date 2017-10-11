import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';

import { routes } from './app.routes';
 
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
    HttpModule,
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
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }