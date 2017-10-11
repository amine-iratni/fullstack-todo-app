import {Action} from '@ngrx/store';

import {type} from '../../../shared/helpers/helper';

export const GET_ALL_TODOS = type('[Todo] Get all todos');
export const GET_ALL_TODOS_SUCCESS = type('[Todo] Get all todos success');
export const GET_ALL_TODOS_FAILED = type('[Todo] Get all todos failed');

export const ADD_TODO = type('[Todo] Add todo');
export const ADD_TODO_SUCCESS = type('[Todo] Add todo success');
export const ADD_TODO_FAILED = type('[Todo] Add todo failed');

export const UPDATE_TODO = type('[Todo] Update todo');
export const UPDATE_TODO_SUCESS = type('[Todo] Update todo success');
export const UPDATE_TODO_FAILED = type('[Todo] Update todo failed');

export const DELETE_TODO = type('[Todo] Delete todo');
export const DELETE_TODO_SUCCESS = type('[Todo] Delete todo success');
export const DELETE_TODO_FAILED = type('[Todo] Delete todo failed');     

export const RESET_VIEW_STATE = type('[Todo] Reset views state');


export class GetAllTodos implements Action {
    readonly type = GET_ALL_TODOS;
    constructor(public payload: any = {}) {}
  }

  export class GetAllTodosSuccess implements Action {
    readonly type = GET_ALL_TODOS_SUCCESS;
    constructor(public payload: any = {}) {}
  }
  
  export class GetAllTodosFailure implements Action {
    readonly type = GET_ALL_TODOS_FAILED;
    constructor(public payload: any = {}) {}
  }

  export class AddTodo implements Action {
    readonly type = ADD_TODO;
    constructor(public payload: any = {}) {}
  }

  export class AddTodoSuccess implements Action {
    readonly type = ADD_TODO_SUCCESS;
    constructor(public payload: any = {}) {}
  }

  export class AddTodoFailure implements Action {
    readonly type = ADD_TODO_FAILED;
    constructor(public payload: any = {}) {}
  }

  export class UpdateTodo implements Action {
    readonly type = UPDATE_TODO;
  
    constructor(public payload: any = {}) {}
  }

  export class UpdateTodoSuccess implements Action {
    readonly type = UPDATE_TODO_SUCESS;
    constructor(public payload: any = {}) {}
  }

  export class UpdateTodoFailure implements Action {
    readonly type = UPDATE_TODO_FAILED;
    constructor(public payload: any = {}) {}
  }

  export class DeleteTodo implements Action {
    readonly type = DELETE_TODO;
    constructor(public payload: any = {}) {}
  }

  export class DeleteTodoSuccess implements Action {
    readonly type = DELETE_TODO_SUCCESS;
    constructor(public payload: any = {}) {}
  }

  export class DeleteTodoFailure implements Action {
    readonly type = DELETE_TODO_FAILED;
    constructor(public payload: any = {}) {}
  }

  export class ResetTodosVieState implements Action {
    readonly type = RESET_VIEW_STATE;
    constructor(public payload: any = {}) {}
  }

  export type Actions = 
  | GetAllTodos 
  | GetAllTodosSuccess
  | GetAllTodosFailure
  | AddTodo
  | AddTodoSuccess
  | AddTodoFailure
  | UpdateTodo
  | UpdateTodoSuccess
  | UpdateTodoFailure
  | DeleteTodo
  | DeleteTodoSuccess
  | DeleteTodoFailure
  | ResetTodosVieState;
