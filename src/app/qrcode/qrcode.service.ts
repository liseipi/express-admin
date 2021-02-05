import { connection } from '../../database/mysql'

export const getDesktop = async (id: number) => {
  const statement = `
    SELECT 
      desktop.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM desktop
    LEFT JOIN user
      ON user.id = desktop.user_id
    LEFT JOIN position
      ON position.id = desktop.position 
    LEFT JOIN attribution
      ON attribution.id = desktop.attribution
    LEFT JOIN branch
      ON branch.id = desktop.branch
    LEFT JOIN department
      ON department.id = desktop.department
    WHERE desktop.id = ?;
  `
  const [data] = await connection.promise().query(statement, id)
  return data
}

export const getMonitor = async (id: number) => {
  const statement = `
    SELECT 
      monitor.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM monitor
    LEFT JOIN user
      ON user.id = monitor.user_id
    LEFT JOIN position
      ON position.id = monitor.position 
    LEFT JOIN attribution
      ON attribution.id = monitor.attribution
    LEFT JOIN branch
      ON branch.id = monitor.branch
    LEFT JOIN department
      ON department.id = monitor.department
    WHERE monitor.id = ?;
  `
  const [data] = await connection.promise().query(statement, id)
  return data
}

export const getOther = async (id: number) => {
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
    WHERE other.id = ?;
  `
  const [data] = await connection.promise().query(statement, id)
  return data
}