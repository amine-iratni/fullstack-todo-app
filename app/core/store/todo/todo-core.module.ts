import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';

import { TodosService } from './services/todos.service';
import { TodosEffects } from './effects/todos.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [],
})
export class TodosCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootTodosModule,
      providers: [ TodosService ],
    };
  }
}

@NgModule({
  imports: [
    TodosCoreModule,
    StoreModule.forFeature('todos', reducers),
    EffectsModule.forFeature([TodosEffects]),
  ],
})
export class RootTodosModule {}