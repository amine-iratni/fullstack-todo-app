import {tassign} from 'tassign';
import * as todos from '../actions/todos';


export interface State {
    error: null;
    inProgress: boolean;
    todos: Array<any>;
  }


  export const initialState: State = {
    error: null,
    inProgress: false,
    todos: []
  };
  

export function reducer(state = initialState, action: todos.Actions): State {
    switch (action.type) {

        /**
         * --------------------------------------------------
         * Get All Todos Actions
         * --------------------------------------------------
         */

        case todos.GET_ALL_TODOS: {
            return tassign(state, {
                inProgress: true,
                error: null,
                todos: []
            });
        }

        case todos.GET_ALL_TODOS_SUCCESS: {
            return tassign(state, {
                inProgress: false,
                error: null,
                todos: action.payload.todos
            });
        }

        case todos.GET_ALL_TODOS_FAILED: {
            return tassign(state, {
                inProgress: false,
                error: action.payload.error,
                todos: []
            });
        }

        case todos.RESET_VIEW_STATE: {
            return tassign(state, {
                inProgress: false,
                error: null
            });
        }

        /**
         * --------------------------------------------------
         * Add Todos Actions
         * --------------------------------------------------
         */

        case todos.ADD_TODO: {
            return tassign(state, {
                inProgress: true,
                error: null
            });
        }

        case todos.ADD_TODO_SUCCESS: {
            return tassign(state, {
                inProgress: false,
                error: null,
                todos: [action.payload.todo, ...state.todos]
            });
        }

        case todos.ADD_TODO_FAILED: {
            return tassign(state, {
                inProgress: false,
                error: action.payload.error
            });
        }

        /**
         * --------------------------------------------------
         * Update Todos Actions
         * --------------------------------------------------
         */

        case todos.UPDATE_TODO: {
            return tassign(state, {
                inProgress: true,
                error: null
            });
        }

        case todos.UPDATE_TODO_SUCESS: {

            let index = state.todos.map(todo => todo.id).indexOf(action.payload.todo.id);

            return tassign(state, {
                inProgress: false,
                error: null,
                todos: [
                    ...state.todos.slice(0, index),
                    tassign(state.todos[index], action.payload.todo),
                    ...state.todos.slice(index + 1)
                ]
            });
        }

        case todos.UPDATE_TODO_FAILED: {
            return tassign(state, {
                inProgress: false,
                error: action.payload.error
            });
        }

        /**
       * --------------------------------------------------
       * Delete Todos Actions
       * --------------------------------------------------
       */

        case todos.DELETE_TODO: {
            return tassign(state, {
                inProgress: true,
                error: null
            });
        }

        case todos.DELETE_TODO_SUCCESS: {
            return tassign(state, {
                inProgress: false,
                error: null,
                todos: state.todos.filter(item => {
                    return item.id !== action.payload.todo.id;
                })
            });
        }

        case todos.DELETE_TODO_FAILED: {
            return tassign(state, {
                inProgress: false,
                error: action.payload.error
            });
        }

        default:
            return state;
    }
}

export const getError = (state: State) => state.error;
export const getInProgress = (state: State) => state.inProgress;

export const getAllTodos = (state: State) => state.todos;

export const getUnfinishedTodos = (state: State) => {
    let unfinished = state.todos.filter((todo) => !todo.completed);
    return unfinished;
}

export const getFinishedTodos = (state: State) => {
    let finished = state.todos.filter((todo) => todo.completed);
    return finished;
}