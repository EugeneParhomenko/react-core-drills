import { useState } from 'react';
import { TodoCompletedCount } from './TodoCompletedCount';
import { TodoFilter } from './TodoFilter';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
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
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage);
  const [activeFilter, setActiveFilter] = useState<TodoStatus>('all');

  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !todo.done;
    return todo.done;
  });

  const itemsLeft = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);

  const commit = (newTodos: Todo[]) => {
    setTodosToLocalStorage(newTodos);
    setTodos(newTodos);
  };

  const handleAddTodo = (title: string) => {
    const newTodos = [
      ...todos,
      { id: crypto.randomUUID(), title, done: false },
    ];
    commit(newTodos);
  };

  const handleToggleTodo = (id: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    commit(newTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    commit(newTodos);
  };

  const handleEditTodo = (id: string, title: string) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title } : todo,
    );
    commit(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.done);
    commit(newTodos);
  };

  return (
    <div className="todo-app">
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
