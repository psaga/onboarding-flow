import { Meta, StoryObj } from '@storybook/react';
import GroupedTasks from './GroupedTasks';
import { TasksGroup } from '@/types';
import './component.module.css';

const meta: Meta<typeof GroupedTasks> = {
  title: 'Components/GroupedTasks',
  component: GroupedTasks,
  argTypes: {
    opened: {
      control: 'boolean',
    },
    toggleTaskStatus: { action: 'toggled' },
  },
};

export default meta;

const mockTasksGroup: TasksGroup = {
  name: 'Example Task Group',
  tasks: [
    { description: 'Task 1', value: 10, checked: false },
    { description: 'Task 2', value: 15, checked: true },
    { description: 'Task 3', value: 8, checked: false },
  ],
};

const mockTasksGroupCompleted: TasksGroup = {
  name: 'Example Task Group Completed',
  tasks: [
    { description: 'Task 1', value: 10, checked: true },
    { description: 'Task 2', value: 15, checked: true },
    { description: 'Task 3', value: 8, checked: true },
  ],
};

type Story = StoryObj<typeof GroupedTasks>;

export const GroupedTasksDefault: Story = {
  args: {
    opened: false,
    tasksGroup: mockTasksGroup,
    toggleTaskStatus: () => {},
  },
};

export const GroupedTasksCompleted: Story = {
  args: {
    opened: true,
    tasksGroup: mockTasksGroupCompleted,
    toggleTaskStatus: () => {},
  },
};
