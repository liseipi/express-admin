import mysql from 'mysql2'
import env from '../config/env'

const pool = mysql.createPool({
  host: `${env.MYSQL_HOST}`,
  port: Number(env.MYSQL_PORT),
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE
})

export const connection = pool