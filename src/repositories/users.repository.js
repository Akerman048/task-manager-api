import { pool } from "../db/pool.js";

/* REGISTER USER */
export const registerUserRepository = async ({ name, email, passwordHash }) => {
  const result = await pool.query(
    `
    INSERT INTO users (name,email,password_hash)
    VALUES ($1,$2,$3)
    RETURNING id,name,email,created_at
    `,
    [name, email, passwordHash],
  );

  return result.rows[0];
};

/* FIND USER BY EMAIL */
export const findUserByEmail = async (email) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  return result.rows[0];
};
