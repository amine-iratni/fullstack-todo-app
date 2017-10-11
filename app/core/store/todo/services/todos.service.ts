import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

import {ApiService} from "../../../shared/services/api.service";

/**
 * API Constants
 */
const TODOS_ENDPOINT: string = 'todos';

@Injectable()
export class TodosService {

  constructor(private apiService: ApiService) {}

  getAll() {
    return new Observable(observer => {
      return this.apiService.get(TODOS_ENDPOINT).subscribe((response) => {
        observer.next(response);
      }, (err) => {
        return observer.error({error: err});
      });
    });
  }

  add(todo: any) {
    return new Observable(observer => {
      return this.apiService.post(TODOS_ENDPOINT, todo).subscribe((response) => {
        observer.next(response);
      }, (err) => {
        return observer.error({error: err});
      });
    });
  }

  update(todo: any) {
    return new Observable(observer => {
      return this.apiService.put(`${TODOS_ENDPOINT}/${todo.id}`, todo).subscribe((response) => {
        observer.next(response);
      }, (err) => {
        return observer.error({error: err});
      });
    });
  }

  delete(todo: any) {
    return new Observable(observer => {
      return this.apiService.delete(`${TODOS_ENDPOINT}/${todo.id}`).subscribe((response) => {
        observer.next(response);
      }, (err) => {
        return observer.error({error: err});
      });
    });
  }
}