import GroupIcon from '@/assets/icons/group.svg';
import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import ChevronUpIcon from '@/assets/icons/chevron-up.svg';
import { useMemo, useState } from 'react';
import type { Task, TasksGroup } from '@/types';
import styles from './component.module.css';

export type GroupedTasksProps = {
  tasksGroup: TasksGroup;
  opened?: boolean;
  toggleTaskStatus: (taskIndex: number) => void;
};

export default function GroupedTasks({ tasksGroup, opened, toggleTaskStatus }: GroupedTasksProps) {
  const [open, setOpen] = useState(opened);
  const handleToogleGroup = () => {
    setOpen((prevStatus) => !prevStatus);
  };

  const completed = useMemo(() => {
    return tasksGroup.tasks.every((task) => task.checked);
  }, [tasksGroup]);

  return (
    <>
      <div className={styles.groupHeader} onClick={handleToogleGroup} aria-label="Toogle Group">
        <span
          aria-label={tasksGroup.name}
          className={`${completed ? `${styles.groupIconContainer} ${styles.completed}` : styles.groupIconContainer}`}
        >
          <img src={GroupIcon} alt="Group" />
        </span>
        <span className={`${completed ? `${styles.name} ${styles.completed}` : styles.name}`}>{tasksGroup.name}</span>
        <span className={styles.actions}>
          {open ? (
            <>
              <span aria-label="Hide">Hide</span>
              <img src={ChevronUpIcon} alt="Chevron Up" />
            </>
          ) : (
            <>
              <span aria-label="Show">Show</span>
              <img src={ChevronDownIcon} alt="Chevron Down" />
            </>
          )}
        </span>
      </div>
      <div className={`${!open ? `${styles.tasks} ${styles.closed}` : styles.tasks}`}>
        {tasksGroup.tasks.map((task: Task, taskIndex: number) => (
          <div className={styles.task} key={task.description} onClick={() => toggleTaskStatus(taskIndex)}>
            <input
              id={task.description}
              name={task.description}
              className={styles.inputCheckbox}
              type="checkbox"
              defaultChecked={task.checked}
              readOnly
            />
            <label
              aria-label={`Toggle Task`}
              className={`${styles.descriptionContainer} ${task.checked ? styles.checked : ''}`}
            >
              {task.description}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
