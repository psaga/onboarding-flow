export type Task = {
  description: string;
  value: number;
  checked: boolean;
};

export type TasksGroup = {
  name: string;
  tasks: Task[];
};
