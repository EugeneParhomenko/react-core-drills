import { TodoItem } from './TodoItem';
import type { Todo } from './type';

export type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onClearCompleted: () => void;
};

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onClearCompleted,
}: TodoListProps) {
  const itemsLeft = todos.filter((todo) => !todo.done).length;
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
      <div className="todo-list-footer">
        <span>{itemsLeft} items left</span>
        <button onClick={() => onClearCompleted()}>Clear Completed</button>
      </div>
    </>
  );
}
