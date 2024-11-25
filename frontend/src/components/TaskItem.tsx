import { useState } from "react";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  initialTask: Task;
}

/**
 * The component that displays a single task item. It shows the task's title,
 * description, and a checkbox to mark the task as complete.
 *
 * @param props.title The title of the task
 * @param props.description Optional description of the task
 * @param props.checked Whether the task is complete or not
 */
export function TaskItem({ initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    setLoading(true);

    // Update the task's isChecked field
    const updatedTask = { ...task, isChecked: !task.isChecked };

    const res = await updateTask(updatedTask);
    if (!res.success) {
      alert("Failed to update task");
      console.error(res.error);
      return setLoading(false);
    }

    setTask(res.data);
    setLoading(false);
  };

  return (
    <div className={styles.item}>
      <CheckButton
        checked={task.isChecked}
        className={styles.check}
        onPress={handleToggleCheck}
        disabled={loading}
      />
      <div className={`${styles.content} ${task.isChecked ? styles.checked : ""}`}>
        <span className={styles.title}>{task.title}</span>
        {task.description && <span className={styles.description}>{task.description}</span>}
      </div>
    </div>
  );
}
