import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { Button, Page } from "src/components";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const taskId = useParams<{ id: string }>().id;

  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (!taskId) {
      return;
    }

    getTask(taskId).then((res) => {
      if (!res.success) {
        console.error(res.error);
        return;
      }
      setTask(res.data);
    });
  }, [taskId]);

  return (
    <Page>
      <Helmet>
        <title>{task !== null ? task.title : ""} | TSE Todos</title>
      </Helmet>
      <p>
        <Link to="/">Back to home</Link>
      </p>
      {task === null ? (
        <p className={styles.notFound}>This task doesn&apos;t exist!</p>
      ) : (
        <div className={styles.taskDetail}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{task.title}</h1>
            <Button className={styles.edit} label="Edit Task" />
          </div>
          <span className={styles.description}>
            {task.description ? task.description : "(No description)"}
          </span>
          <div className={styles.itemWrapper}>
            <span className={styles.itemTitle}>Assignee</span>
            <span className={styles.itemValue}>
              {task.assignee ? task.assignee.name : "Not assigned"}
            </span>
          </div>
          <div className={styles.itemWrapper}>
            <span className={styles.itemTitle}>Status</span>
            <span className={styles.itemValue}>{task.isChecked ? "Done" : "Not done"}</span>
          </div>
          <div className={styles.itemWrapper}>
            <span className={styles.itemTitle}>Date created</span>
            <span className={styles.itemValue}>
              {Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              }).format(task.dateCreated)}
            </span>
          </div>
        </div>
      )}
    </Page>
  );
}
