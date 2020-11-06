import { connection } from '../../database/mysql'
// import { CreateUserModel } from './register.model'

// export const createUser = async (user: CreateUserModel) => {
//   let statement = `INSERT admin SET ?`
//   const [data] = await connection.promise().query(statement, user)
//   return data
// }

export const getUserByEmail = async (email: string) => {
  let statement = `
    SELECT 
      id,
      email,
      password
    FROM admin
    WHERE admin.email = ?
  `
  const [data] = await connection.promise().query(statement, email)
  let result = data as any
  return result[0]
}

export const getUserInfo = async (email: string) => {
  let statement = `
    SELECT 
      admin.id, 
      admin.email,
      JSON_OBJECT(
        'username', profile.username
      ) as profile
    FROM admin
    LEFT JOIN profile
      ON profile.uid = admin.id
    WHERE admin.email = ?
  `
  const [data] = await connection.promise().query(statement, email)
  let result = data as any
  return result[0]
}
