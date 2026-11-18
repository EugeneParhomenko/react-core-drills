import type { Todo } from './type';

type AddTodoAction = {
  type: 'ADD_TODO';
  payload: { title: string };
};

type ToggleTodoAction = {
  type: 'TOGGLE_TODO';
  payload: { id: string };
};

type DeleteTodoAction = {
  type: 'DELETE_TODO';
  payload: { id: string };
};

type EditTodoAction = {
  type: 'EDIT_TODO';
  payload: { id: string; title: string };
};

type ClearCompletedAction = {
  type: 'CLEAR_COMPLETED_TODOS';
};

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | ClearCompletedAction;

export function todosReducer(todos: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD_TODO': {
      const { title } = action.payload;
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        done: false,
      };
      return [...todos, newTodo];
    }
    case 'TOGGLE_TODO': {
      const { id } = action.payload;
      return todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      );
    }
    case 'DELETE_TODO': {
      const { id } = action.payload;
      return todos.filter((todo) => todo.id !== id);
    }
    case 'EDIT_TODO': {
      const { id, title } = action.payload;
      return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
    }
    case 'CLEAR_COMPLETED_TODOS': {
      return todos.filter((todo) => !todo.done);
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
}
