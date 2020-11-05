import { connection } from '../../database/mysql'
import { CreateUserModel } from './register.model'

export const createUser = async (user: CreateUserModel) => {
  let statement = `INSERT admin SET ?`
  const [data] = await connection.promise().query(statement, user)
  return data
}

export const getUserByEmail = async (email: string) => {
  let statement = `
    SELECT id, email
    FROM admin
    WHERE email = ?
  `
  const [data] = await connection.promise().query(statement, email)
  return Array.isArray(data) && data[0]
}
