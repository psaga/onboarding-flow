import axios from 'axios';
import Header from './Header/Header';
import GroupedTasks from './GroupedTasks/GroupedTasks';
import { useEffect, useMemo, useState } from 'react';
import type { TasksGroup } from '@/types';
import styles from './component.module.css';

export default function OnboardingFlow() {
  const [tasksGroups, setTasksGroups] = useState<TasksGroup[]>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const TASKS_API =
    'https://gist.githubusercontent.com/psaga/2b579633400f2a6a92594a820e5a1ea6/raw/61168c77f715a1782681a9fc2017e743d6c9fbf5/tasks.json';

  useEffect(() => {
    axios
      .get(TASKS_API)
      .then((response) => {
        setTasksGroups(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const progress = useMemo(() => {
    const tasks = tasksGroups?.map((group) => group.tasks).flat() || [];

    const result = tasks?.reduce(
      (accumulator, task) => {
        accumulator.totalValue += task.value;

        if (task.checked) {
          accumulator.totalCheckedValue += task.value;
        }

        return accumulator;
      },
      { totalValue: 0, totalCheckedValue: 0 },
    );

    return result?.totalValue !== 0 ? (100 / result.totalValue) * result.totalCheckedValue : 0;
  }, [tasksGroups]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!tasksGroups) return <p>No data fetched</p>;

  if (tasksGroups.length === 0) return <div>No tasks available.</div>;

  const handleToggleTaskStatus = (taskGroupIndex: number, taskIndex: number) => {
    setTasksGroups((prevTaskGroups: TasksGroup[] | undefined) => {
      if (!prevTaskGroups) return;
      const newTaskGroups = prevTaskGroups.map((group, index) => {
        if (index === taskGroupIndex) {
          const tasks = group.tasks.map((task, idx) => {
            if (idx === taskIndex) {
              return { ...task, checked: !task.checked };
            }
            return task;
          });
          return { ...group, tasks: tasks };
        }
        return group;
      });

      return newTaskGroups;
    });
  };

  return (
    <div className={styles.onboardingFlow}>
      <Header progress={progress} />
      <div className={styles.content}>
        {tasksGroups.map(
          (tasksGroup: TasksGroup, taskGroupIndex: number) =>
            tasksGroup.tasks.length && (
              <GroupedTasks
                key={tasksGroup.name}
                tasksGroup={tasksGroup}
                toggleTaskStatus={(taskIndex: number) => handleToggleTaskStatus(taskGroupIndex, taskIndex)}
              />
            ),
        )}
      </div>
    </div>
  );
}
