import { pool } from "../db/pool.js";

/* FIND TASKS */
export const findTasksRepository = async ({ userId, projectId }) => {
  const result = await pool.query(
    `
    SELECT tasks.* FROM tasks
    JOIN projects
    ON tasks.project_id = projects.id
    WHERE tasks.project_id = $1
    AND projects.user_id = $2
    ORDER BY tasks.created_at DESC
    `,
    [projectId, userId],
  );

  return result.rows;
};

/* CREATE TASK */
export const createTaskRepository = async ({
  projectId,
  title,
  description,
  status,
  due_date,
}) => {
  const result = await pool.query(
    `
    INSERT INTO tasks 
    (project_id,title,description, status,due_date)
    VALUES
    ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [projectId, title, description, status, due_date],
  );

  return result.rows[0];
};

/* FIND TASK */
export const findTaskRepository = async ({ projectId, taskId }) => {
  const result = await pool.query(
    `
    SELECT * FROM tasks
    WHERE id = $1
    AND project_id = $2
    `,
    [taskId, projectId],
  );

  return result.rows[0];
};
