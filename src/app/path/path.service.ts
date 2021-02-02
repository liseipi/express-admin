import { connection } from '../../database/mysql'

export const getPosition = async () => {
  const statement = `
    SELECT * FROM position
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getAttribution = async () => {
  const statement = `
    SELECT * FROM attribution
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getBranch= async () => {
  const statement = `
    SELECT * FROM branch
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getDepartment= async () => {
  const statement = `
    SELECT * FROM department
  `
  const [data] = await connection.promise().query(statement)
  return data
}