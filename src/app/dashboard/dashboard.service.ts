import { connection } from '../../database/mysql'

export const getDesktop = async () => {
  const statement = `
    SELECT 
      COUNT(id) AS total,
      SUM(IF(status = 0, 1, 0)) AS status0,
      SUM(IF(status = 1, 1, 0)) AS status1,
      SUM(IF(status = 2, 1, 0)) AS status2,
      SUM(IF(status = 3, 1, 0)) AS status3,
      SUM(IF(status = 4, 1, 0)) AS status4
    FROM desktop;
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getMonitor = async () => {
  const statement = `
    SELECT 
      COUNT(id) AS total,
      SUM(IF(status = 0, 1, 0)) AS status0,
      SUM(IF(status = 1, 1, 0)) AS status1,
      SUM(IF(status = 2, 1, 0)) AS status2,
      SUM(IF(status = 3, 1, 0)) AS status3,
      SUM(IF(status = 4, 1, 0)) AS status4
    FROM monitor;
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getOther = async () => {
  const statement = `
    SELECT 
      COUNT(id) AS total,
      SUM(IF(status = 0, 1, 0)) AS status0,
      SUM(IF(status = 1, 1, 0)) AS status1,
      SUM(IF(status = 2, 1, 0)) AS status2,
      SUM(IF(status = 3, 1, 0)) AS status3,
      SUM(IF(status = 4, 1, 0)) AS status4
    FROM other;
  `
  const [data] = await connection.promise().query(statement)
  return data
}
