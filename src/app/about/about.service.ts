import { connection } from '../../database/mysql'

export const getAbout = async () => {
  const statement = `SELECT * FROM admin`
  const [data] = await connection.promise().query(statement)
  return data
}
