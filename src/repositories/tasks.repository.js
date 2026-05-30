import { pool } from "../db/pool.js";

/* FIND TASKS */
export const findTasksRepository = async ({
  userId,
  projectId,
  status,
  search,
  sortBy,
  order,
  limit,
  offset,
}) => {
  const values = [projectId, userId];

  let where = `WHERE tasks.project_id = $1 AND projects.user_id = $2`;

  if (status) {
    values.push(status);
    where += ` AND tasks.status = $${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    where += ` AND tasks.title ILIKE $${values.length}`;
  }

  const allowedSortBy = ["created_at", "due_date", "title", "status"];
  const safeSortBy = allowedSortBy.includes(sortBy) ? sortBy : "created_at";

  const allowedOrderBy = ["asc", "desc"];
  const safeOrder = allowedOrderBy.includes(order) ? order : "desc";

  values.push(limit);
  const limitIndex = values.length;

  values.push(offset);
  const offsetIndex = values.length;

  const result = await pool.query(
    `
    SELECT tasks.* FROM tasks
    JOIN projects
    ON tasks.project_id = projects.id
    ${where}
    ORDER BY tasks.${safeSortBy} ${safeOrder}
    LIMIT $${limitIndex}
    OFFSET $${offsetIndex}
    `,
    values,
  );

  return result.rows;
};

/* COUNT TASKS */
export const countTasksRepository = async ({
  userId,
  projectId,
  status,
  search,
}) => {
  const values = [projectId, userId];

  let where = `
  WHERE tasks.project_id = $1
    AND projects.user_id = $2 
  `;

  if (status) {
    values.push(status);
    where += ` AND tasks.status = $${values.length}`;
  }

  if (search) {
    values.push(`%${search}%`);
    where += ` AND tasks.title ILIKE $${values.length}`;
  }

  const result = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM tasks
    JOIN projects ON tasks.project_id = projects.id
    ${where}
    `,
    values,
  );

  return Number(result.rows[0].total);
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
