import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import * as Todos from '../../../../../../core/store/todo/actions/todos';
import * as fromTodos from '../../../../../../core/store/todo/reducers';


@Component({
    selector: 'td-todos-page',
    templateUrl: 'todos.page.html',
    styleUrls: ['./todos.page.scss']
})
export class TodosPageComponent {

    unfineshedTodos$: any;
    finishedTodos$: any;
    error$: any;
    todoInput: string;

    constructor(private store: Store<fromTodos.State>) {
        this.store.dispatch(new Todos.GetAllTodos());

        this.unfineshedTodos$ = this.store.select(fromTodos.getUnfinishedTodos);
        this.finishedTodos$ = this.store.select(fromTodos.getFinishedTodos);        
        this.error$ = this.store.select(fromTodos.getError);
    }

    addTodo() {
        this.store.dispatch(new Todos.AddTodo(
            {
                title: this.todoInput,
                completed: false
            }
        ));
        this.todoInput = "";
    }

    setCompleted(todo) {
        let copy = Object.assign({}, todo);
        copy.completed = true;
        this.store.dispatch(new Todos.UpdateTodo({todo:copy}));
    }

    delete(todo) {
        this.store.dispatch(new Todos.DeleteTodo({todo}));        
    }
}