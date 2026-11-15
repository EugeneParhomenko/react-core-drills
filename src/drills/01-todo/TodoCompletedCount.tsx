export type TodoCompletedCountProps = {
  itemsLeft: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

export function TodoCompletedCount({
  itemsLeft,
  hasCompleted,
  onClearCompleted,
}: TodoCompletedCountProps) {
  return (
    <div className="todo-list-footer">
      <span>{itemsLeft} items left</span>
      {hasCompleted && (
        <button onClick={() => onClearCompleted()}>Clear Completed</button>
      )}
    </div>
  );
}
