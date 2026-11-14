import { TodoItem } from './TodoItem';
import type { Todo } from './type';

export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
  return (
    <>
      <div className="todo-list-items">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </>
  );
}
