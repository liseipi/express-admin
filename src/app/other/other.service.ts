import { connection } from '../../database/mysql'
import { SearchMonitorModel, AddMonitorModel, UpdateMonitorModel } from './other.model'

export const getAll = async (key: SearchMonitorModel) => {
  let whereName = ''
  if (key.keyword && key.select) {
    if (key.select == 'name') {
      whereName = `WHERE user.${key.select} LIKE '%${key.keyword}%'`
    } else {
      whereName = `WHERE monitor.${key.select} = '${key.keyword}'`
    }
  }
  const statement = `
    SELECT 
      other.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM other
    LEFT JOIN user
      ON user.id = other.user_id
    LEFT JOIN position
      ON position.id = other.position 
    LEFT JOIN attribution
      ON attribution.id = other.attribution
    LEFT JOIN branch
      ON branch.id = other.branch
    LEFT JOIN department
      ON department.id = other.department
    ${whereName}
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getDetails = async (id: number) => {
  const statement = `
    SELECT
      other.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM other
    LEFT JOIN user
      ON user.id = other.user_id
    LEFT JOIN position
      ON position.id = other.position 
    LEFT JOIN attribution
      ON attribution.id = other.attribution
    LEFT JOIN branch
      ON branch.id = other.branch
    LEFT JOIN department
      ON department.id = other.department
    WHERE other.id = ${id}
    GROUP BY other.id;
  `

  const [data] = await connection.promise().query(statement, id)
  return data
}

export const add = async(values: AddMonitorModel) => {
  const statement = `
    INSERT INTO other
    SET ?
  `
  const [data] = await connection.promise().query(statement, values)
  return data
}

export const update = async(id: number, values: AddMonitorModel) => {
  const statement = `
    UPDATE other
      SET ?
      WHERE id = ?;
  `
  const [data] = await connection.promise().query(statement, [values, id])
  return data
}
