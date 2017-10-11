import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodos from './todos';
import * as fromRoot from '../../reducers';

export interface TodosState {
    status: fromTodos.State;
}

export interface State extends fromRoot.State {
    auth: fromTodos.State;
}

export const reducers  = {
    status: fromTodos.reducer
  };

  export const selectTodosState = createFeatureSelector<TodosState>('todos');
  
  export const selectTodosStatusState = createSelector(
    selectTodosState,
    (state: TodosState) => state.status 
  );
  
export const getError = createSelector(selectTodosStatusState,fromTodos.getError);
export const getInProgress = createSelector(selectTodosStatusState,fromTodos.getInProgress);
export const getAllTodos = createSelector(selectTodosStatusState,fromTodos.getAllTodos);
export const getUnfinishedTodos = createSelector(selectTodosStatusState,fromTodos.getUnfinishedTodos);
export const getFinishedTodos = createSelector(selectTodosStatusState,fromTodos.getFinishedTodos);