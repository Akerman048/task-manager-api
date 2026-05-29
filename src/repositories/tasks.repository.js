import { pool } from "../db/pool.js";

/* FIND TASKS */
export const findTasksRepository = async ({
  userId,
  projectId,
  limit,
  offset,
}) => {
  const result = await pool.query(
    `
    SELECT tasks.* FROM tasks
    JOIN projects
    ON tasks.project_id = projects.id
    WHERE tasks.project_id = $1
    AND projects.user_id = $2
    ORDER BY tasks.created_at DESC
    LIMIT $3
    OFFSET $4
    `,
    [projectId, userId, limit, offset],
  );

  return result.rows;
};

/* COUNT TASKS */
export const countTasksRepository = async ({ userId, projectId }) => {
  const result = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM tasks
    JOIN projects ON tasks.project_id = projects.id
    WHERE tasks.project_id = $1
    AND projects.user_id = $2
    `,
    [projectId, userId],
  );
  
  return Number(result.rows[0].count)
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

/* UPDATE TASK */
export const updateTaskRepository = async ({ projectId, taskId, data }) => {
  const allowedFields = ["title", "description", "status", "due_date"];

  const fields = [];
  const values = [];

  for (const key of allowedFields) {
    if (data[key] !== undefined) {
      fields.push(`${key} = $${values.length + 1}`);
      values.push(data[key]);
    }
  }

  if (values.length === 0) {
    return null;
  }

  values.push(taskId, projectId);

  const taskIdIndex = values.length - 1;
  const projectIdIndex = values.length;

  const result = await pool.query(
    `
  UPDATE tasks
  SET ${fields.join(", ")}
  WHERE id = $${taskIdIndex}
  AND project_id = $${projectIdIndex}
  RETURNING *
  `,
    values,
  );

  return result.rows[0];
};

/* DELETE TASK */
export const deleteTaskRepository = async ({ projectId, taskId }) => {
  const result = await pool.query(
    `
    DELETE FROM tasks
    WHERE project_id = $1
    AND id = $2
    RETURNING *
    `,
    [projectId, taskId],
  );

  return result.rows[0];
};
