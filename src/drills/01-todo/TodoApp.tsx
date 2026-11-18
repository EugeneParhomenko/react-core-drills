import { useEffect, useReducer, useState } from 'react';
import './TodoApp.css';
import { TodoCompletedCount } from './TodoCompletedCount';
import { TodoFilter } from './TodoFilter';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import {
  TODOS_ADDED,
  TODOS_CLEARED_COMPLETED,
  TODOS_DELETED,
  TODOS_EDITED,
  TODOS_TOGGLED,
  todosReducer,
} from './todosReducer';
import type { Todo, TodoStatus } from './type';

const TODOS_LOCAL_STORAGE_KEY = 'todos';

const getTodosFromLocalStorage = (key: string): Todo[] => {
  try {
    const todos = localStorage.getItem(key);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error getting todos from localStorage:', error);
    return [];
  }
};

const setTodosToLocalStorage = (key: string, todos: Todo[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(todos));
  } catch (error) {
    console.error('Error setting todos to localStorage:', error);
  }
};

export function TodoApp() {
  const [activeFilter, setActiveFilter] = useState<TodoStatus>('all');
  const [todos, dispatch] = useReducer(
    todosReducer,
    TODOS_LOCAL_STORAGE_KEY,
    getTodosFromLocalStorage,
  );

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !todo.done;
    return todo.done;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  useEffect(() => {
    setTodosToLocalStorage(TODOS_LOCAL_STORAGE_KEY, todos);
  }, [todos]);

  const handleAddTodo = (title: string) => {
    dispatch({
      type: TODOS_ADDED,
      payload: { id: crypto.randomUUID(), title },
    });
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: TODOS_TOGGLED, payload: { id } });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: TODOS_DELETED, payload: { id } });
  };

  const handleEditTodo = (id: string, title: string) => {
    dispatch({ type: TODOS_EDITED, payload: { id, title } });
  };

  const handleClearCompleted = () => {
    dispatch({ type: TODOS_CLEARED_COMPLETED });
  };

  return (
    <div className="todo-app">
      <h2 className="todo-app__title">Todo</h2>
      <TodoFilter
        activeFilter={activeFilter}
        onActiveFilterChange={setActiveFilter}
      />
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />
      <TodoCompletedCount
        itemsLeft={itemsLeft}
        hasCompleted={hasCompleted}
        onClearCompleted={handleClearCompleted}
      />
    </div>
  );
}
