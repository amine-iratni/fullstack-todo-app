import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";

import { TodosService } from "../services/todos.service";
import * as Todos from '../actions/todos';

@Injectable()
export class TodosEffects {
    constructor(private todosService: TodosService, private actions$: Actions) { }

    @Effect()
    getAll$: Observable<Action> = this.actions$
        .ofType(Todos.GET_ALL_TODOS)
        .map<Action, {}>(toPayload)
        .switchMap(payload => this.todosService.getAll()
            .mergeMap((res: any) => {
                return [
                    new Todos.GetAllTodosSuccess({todos: res})
                ];
            })
            .catch((_error) => Observable.of(new Todos.GetAllTodosFailure(_error)))
        );

    @Effect()
    add$: Observable<Action> = this.actions$
        .ofType(Todos.ADD_TODO)
        .map<Action, { todo: any }>(toPayload)
        .switchMap(payload => this.todosService.add(payload)
            .mergeMap((res: any) => {
                return [
                   new Todos.AddTodoSuccess({todo: res})
                   // new Todos.GetAllTodos()
                ];
            })
            .catch((_error) => Observable.of(new Todos.AddTodoFailure(_error)))
        );

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(Todos.UPDATE_TODO)
        .map<Action, { todo: any }>(toPayload)
        .switchMap(payload => this.todosService.update(payload.todo)
            .mergeMap((res: any) => {
                return [
                    new Todos.UpdateTodoSuccess({todo: res})
                    // new Todos.GetAllTodos()
                ];
            })
            .catch((_error) => Observable.of(new Todos.UpdateTodoFailure(_error)))
        );

    @Effect()
    delete$: Observable<Action> = this.actions$
        .ofType(Todos.DELETE_TODO)
        .map<Action, { todo: any }>(toPayload)
        .switchMap(payload => this.todosService.delete(payload.todo)
            .mergeMap((res: any) => {
                return [
                    new Todos.DeleteTodoSuccess({todo: payload.todo})
                   // new Todos.GetAllTodos()
                ];
            })
            .catch((_error) => Observable.of(new Todos.DeleteTodoFailure(_error)))
        );
}