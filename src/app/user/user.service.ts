import { connection } from '../../database/mysql'
import { AddUserModel, SearchUserModel } from './user.model'

export const getAllUser = async (key: SearchUserModel) => {
  let whereName = ''
  if(key.keyword && key.select){
    whereName = `WHERE ${key.select} LIKE '%${key.keyword}%'`
  }
  const statement = `
    SELECT * FROM user ${whereName}
  `
  // console.log(statement)
  const [data] = await connection.promise().query(statement)
  return data
}

export const userAdd = async (user: AddUserModel) => {
  const statement = `
    INSERT INTO user
    SET ?
  `
  const [data] = await connection.promise().query(statement, user)
  return data
}

export const destroyUser = async (uid: number) => {
  const statement = `
    DELETE FROM user
    WHERE id = ?
  `
  const [data] = await connection.promise().query(statement, uid)
  return data
}
