import type { Task } from './types';

export function generateTasks(count = 5000): Task[] {
  return Array.from({ length: count }, (_, index) => {
    const id = String(index + 1);
    return {
      id,
      title: `Task ${id.padStart(4, '0')} item`,
    };
  });
}
