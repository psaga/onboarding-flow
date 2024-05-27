/**
 * @jest-environment jsdom
 */

import { render, fireEvent, screen } from '@testing-library/react';
import GroupedTasks from './GroupedTasks';

describe('GroupedTasks', () => {
  const mockTasksGroup = {
    name: 'General Info',
    tasks: [
      {
        description: 'Add name and surname',
        value: 10,
        checked: true,
      },
      {
        description: 'Add email',
        value: 15,
        checked: false,
      },
      {
        description: 'Add linkedin profile',
        value: 8,
        checked: false,
      },
      {
        description: 'Provide websites page url',
        value: 5,
        checked: true,
      },
    ],
  };

  const mockToggleTaskStatus = jest.fn();

  it('renders group name', () => {
    render(<GroupedTasks tasksGroup={mockTasksGroup} toggleTaskStatus={mockToggleTaskStatus} />);

    const groupName = screen.getByText('General Info');
    expect(groupName).toBeDefined();
  });

  it('toggles display on click and applies completed styles if all tasks are checked', () => {
    const { getByLabelText } = render(
      <GroupedTasks tasksGroup={mockTasksGroup} toggleTaskStatus={mockToggleTaskStatus} />,
    );

    const toggleSpan = screen.getByText('Show');
    fireEvent.click(toggleSpan);
    expect(screen.getByText('Hide')).toBeDefined();

    const groupIconContainer = getByLabelText(mockTasksGroup.name);
    expect(groupIconContainer.classList.contains('completed')).toBeFalsy();
  });

  it('calls toggleTaskStatus on task click', () => {
    render(<GroupedTasks tasksGroup={mockTasksGroup} opened toggleTaskStatus={mockToggleTaskStatus} />);

    const task = screen.getByText('Add name and surname');
    fireEvent.click(task);
    expect(mockToggleTaskStatus).toHaveBeenCalledWith(0);
  });

  it('renders a completed tasks group', () => {
    mockTasksGroup.tasks.forEach((task) => {
      if (!task.checked) {
        task.checked = true;
      }
    });
    const { getByLabelText } = render(
      <GroupedTasks tasksGroup={mockTasksGroup} toggleTaskStatus={mockToggleTaskStatus} />,
    );

    const groupIconContainer = getByLabelText(mockTasksGroup.name);
    expect(groupIconContainer.classList.contains('completed')).toBeTruthy();
  });
});
