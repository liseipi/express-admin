import { connection } from '../../database/mysql'

export const getAllUser = async () => {
  const statement = `
    SELECT * FROM user
  `
  const [data] = await connection.promise().query(statement)
  return data
}
