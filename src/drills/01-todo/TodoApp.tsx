import { useEffect, useReducer, useState } from 'react';
import './TodoApp.css';
import { TodoCompletedCount } from './TodoCompletedCount';
import { TodoFilter } from './TodoFilter';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { todosReducer } from './todosReducer';
import type { Todo, TodoStatus } from './type';

const TODOS_LOCAL_STORAGE_KEY = 'todos';

const getTodosFromLocalStorage = (): Todo[] => {
  try {
    const todos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Error getting todos from localStorage:', error);
    return [];
  }
};

const setTodosToLocalStorage = (todos: Todo[]) => {
  try {
    localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error setting todos to localStorage:', error);
  }
};

export function TodoApp() {
  const [activeFilter, setActiveFilter] = useState<TodoStatus>('all');
  const [todos, dispatch] = useReducer(
    todosReducer,
    getTodosFromLocalStorage(),
  );

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !todo.done;
    return todo.done;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  useEffect(() => {
    setTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = (title: string) => {
    dispatch({ type: 'ADD_TODO', payload: { title } });
  };

  const handleToggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: { id } });
  };

  const handleDeleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: { id } });
  };

  const handleEditTodo = (id: string, title: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, title } });
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED_TODOS' });
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
