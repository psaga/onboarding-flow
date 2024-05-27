import { Meta, StoryObj } from '@storybook/react';
import Header from './Header';
import './component.module.css';

const meta: Meta<typeof Header> = {
  title: 'Components/GroupedTasks',
  component: Header,
  argTypes: {
    progress: {
      control: 'number',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Header>;

export const HeaderDefault: Story = {
  args: {
    progress: 60,
  },
};
