import { pool } from "../db/pool.js";

/* FIND PROJECTS */
export const findProjectsRepository = async (userId) => {
  const result = await pool.query(
    `
  SELECT * FROM projects
  WHERE user_id = $1
  ORDER BY created_at DESC
  `,
    [userId],
  );

  return result.rows;
};

/* CREATE PROJECT */
export const createProjectRepository = async ({
  userId,
  title,
  description,
}) => {
  const result = await pool.query(
    `
    INSERT INTO projects (user_id,title,description)
    VALUES ($1,$2,$3)
    RETURNING *
    `,
    [userId, title, description],
  );

  return result.rows[0];
};
