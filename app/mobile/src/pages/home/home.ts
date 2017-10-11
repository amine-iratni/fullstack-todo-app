import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

import { Store } from "@ngrx/store";

import * as Todos from '../../../../core/store/todo/actions/todos';
import * as fromTodos from '../../../../core/store/todo/reducers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  unfineshedTodos$: any;
  finishedTodos$: any;
  error$: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController, 
    private store: Store<fromTodos.State>) {
    this.store.dispatch(new Todos.GetAllTodos());

    this.unfineshedTodos$ = this.store.select(fromTodos.getUnfinishedTodos);
    this.finishedTodos$ = this.store.select(fromTodos.getFinishedTodos);
    this.error$ = this.store.select(fromTodos.getError);
  }

  addTodo(data) {
    if(!data || !data.todo) {
      return;
    }
    this.store.dispatch(new Todos.AddTodo(
      {
        title: data.todo,
        completed: false
      }
    ));
  }

  setCompleted(todo) {
    let copy = Object.assign({}, todo);
    copy.completed = true;
    this.store.dispatch(new Todos.UpdateTodo({ todo: copy }));
  }

  delete(todo) {
    this.store.dispatch(new Todos.DeleteTodo({ todo }));
  }

  displayAddModal(){
    let prompt = this.alertCtrl.create({
      title: '',
      message: "Insert some todo here ",
      inputs: [
        {
          name: 'todo',
          placeholder: 'Todo'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Saved clicked');
            this.addTodo(data);
          }
        }
      ]
    });
    prompt.present();
  }
}
