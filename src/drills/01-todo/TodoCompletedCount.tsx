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
    <div className="todo-footer">
      <span className="todo-footer__count">
        <strong>{itemsLeft}</strong> items left
      </span>
      {hasCompleted && (
        <button
          type="button"
          className="todo-footer__clear"
          onClick={() => onClearCompleted()}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
