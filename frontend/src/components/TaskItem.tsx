import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

/**
 * The component that displays a single task item. It shows the task's title,
 * description, and a checkbox to mark the task as complete.
 *
 * @param props.title The title of the task
 * @param props.description Optional description of the task
 * @param props.checked Whether the task is complete or not
 */
export function TaskItem({ task }: TaskItemProps) {
  return (
    <div className={styles.item}>
      <CheckButton checked={task.isChecked} className={styles.check} />
      <div className={`${styles.content} ${task.isChecked ? styles.checked : ""}`}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
