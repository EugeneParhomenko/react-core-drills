import { useState } from "react"
import { TodoItem } from "./TodoItem"
import type { Todo } from "./type"

export type TodoListProps = {
  todos: Todo[],
  onToggle: (id: string) => void,
  onDelete: (id: string) => void,
  onEdit: (id: string, title: string) => void,
  onAdd: (title: string) => void,
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onAdd }: TodoListProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');

  const handleAddTodo = (title: string) => {
    setNewTodoTitle('');
    onAdd(title.trim());
  }

  const handleEditTodo = (id: string, title: string) => {
    onEdit(id, title.trim());
  }

  return (
    <><div className="todo-list-header">
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        onKeyUp={(e) => { if (e.key === 'Enter') { handleAddTodo(newTodoTitle) } }}
      />
      <button onClick={() => handleAddTodo(newTodoTitle)}>Add</button>
    </div>
    <div className="todo-list-items">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={handleEditTodo}
        />
      ))}
    </div>
    </>
  )
}
