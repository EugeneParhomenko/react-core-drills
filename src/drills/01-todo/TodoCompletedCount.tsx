import type { Todo } from './type';

export type TodoCompletedCountProps = {
  todos: Todo[];
  onClearCompleted: () => void;
};

export function TodoCompletedCount({
  todos,
  onClearCompleted,
}: TodoCompletedCountProps) {
  const itemsLeft = todos.filter((todo) => !todo.done).length;
  const hasCompleted = todos.some((todo) => todo.done);
  return (
    <div className="todo-list-footer">
      <span>{itemsLeft} items left</span>
      {hasCompleted && (
        <button onClick={() => onClearCompleted()}>Clear Completed</button>
      )}
    </div>
  );
}
