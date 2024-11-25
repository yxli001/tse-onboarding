import { useState, useEffect } from "react";
import { getAllTasks, Task } from "src/api/tasks";

import styles from "src/components/TaskList.module.css";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then((res) => {
      if (!res.success) {
        return console.error(res.error);
      }
      setTasks(res.data);
    });
  }, []);

  return (
    <div className={styles.listContainer}>
      <span className={styles.title}>All Tasks</span>
      <div className={styles.tasks}>
        {tasks.length === 0 ? (
          <span className={styles.noTasks}>No tasks yet. Add one above to get started.</span>
        ) : (
          tasks.map((task) => <TaskItem task={task} key={task._id} />)
        )}
      </div>
    </div>
  );
}
