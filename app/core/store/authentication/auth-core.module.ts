import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';

import { AuthService } from './services/auth.service';
import { AuthenticationEffects } from './effects/auth.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
})
export class AuthCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [ AuthService ],
    };
  }
}

@NgModule({
  imports: [
    AuthCoreModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
})
export class RootAuthModule {}