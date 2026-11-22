export type Task = {
  id: string;
  title: string;
};

export type TaskView = Task & {
  done: boolean;
};

export type MemoVariant = 'plain' | 'broken' | 'fixed';
