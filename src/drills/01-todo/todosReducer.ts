import type { Todo } from './type';

export const TODOS_ADDED = 'todos/added';
export const TODOS_TOGGLED = 'todos/toggled';
export const TODOS_DELETED = 'todos/deleted';
export const TODOS_EDITED = 'todos/edited';
export const TODOS_CLEARED_COMPLETED = 'todos/clearedCompleted';

export type AddTodoAction = {
  type: typeof TODOS_ADDED;
  payload: { id: string; title: string };
};

export type ToggleTodoAction = {
  type: typeof TODOS_TOGGLED;
  payload: { id: string };
};

export type DeleteTodoAction = {
  type: typeof TODOS_DELETED;
  payload: { id: string };
};

export type EditTodoAction = {
  type: typeof TODOS_EDITED;
  payload: { id: string; title: string };
};

export type ClearCompletedAction = {
  type: typeof TODOS_CLEARED_COMPLETED;
};

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | ClearCompletedAction;

export function todosReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case TODOS_ADDED: {
      const { title, id } = action.payload;
      const newTodo: Todo = {
        id,
        title,
        done: false,
      };
      return [...todos, newTodo];
    }
    case TODOS_TOGGLED: {
      const { id } = action.payload;
      return todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      );
    }
    case TODOS_DELETED: {
      const { id } = action.payload;
      return todos.filter((todo) => todo.id !== id);
    }
    case TODOS_EDITED: {
      const { id, title } = action.payload;
      return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
    }
    case TODOS_CLEARED_COMPLETED: {
      return todos.filter((todo) => !todo.done);
    }
    default: {
      const unhandled: never = action;
      throw new Error(`Unhandled action: ${JSON.stringify(unhandled)}`);
    }
  }
}
