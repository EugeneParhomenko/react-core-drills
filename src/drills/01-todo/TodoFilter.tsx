import type { TodoStatus } from './type';

type FilterItem = { label: string; value: TodoStatus };

const FILTERS: FilterItem[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export type TodoFilterProps = {
  activeFilter: TodoStatus;
  onActiveFilterChange: (filter: TodoStatus) => void;
};

export function TodoFilter({
  activeFilter,
  onActiveFilterChange,
}: TodoFilterProps) {
  return (
    <div className="todo-filter" role="tablist" aria-label="Filter todos">
      {FILTERS.map((filter) => {
        const isActive = filter.value === activeFilter;
        return (
          <button
            key={filter.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={
              isActive
                ? 'todo-filter__tab todo-filter__tab--active'
                : 'todo-filter__tab'
            }
            onClick={() => onActiveFilterChange(filter.value)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
