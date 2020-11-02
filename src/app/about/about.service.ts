import { connection } from '../../database/mysql'

export const getAbout = async () => {
  const statement = `SELECT * FROM SequelizeMeta`
  const [data] = await connection.promise().query(statement)
  return data
}
