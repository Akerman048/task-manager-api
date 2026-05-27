import { pool } from "../db/pool.js";

/* FIND TASKS */
export const findTasks = async ({ userId, projectId }) => {
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
