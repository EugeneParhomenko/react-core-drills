import type { TodoStatus } from "./type";

type FilterItem = { label: string; value: TodoStatus }

export type TodoFilterProps = {
  activeFilter: TodoStatus,
  onActiveFilterChange: (filter: TodoStatus) => void,
}

export function TodoFilter({ activeFilter, onActiveFilterChange }: TodoFilterProps) {
  const filters: FilterItem[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' },
  ]
  return (
    <div>
      { filters.map((filter) => (
        <button key={filter.value} className={filter.value === activeFilter ? 'active' : ''} onClick={() => onActiveFilterChange(filter.value)}>
          {filter.label}
        </button>
      ))}
    </div>
  )
}