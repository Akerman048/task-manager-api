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
