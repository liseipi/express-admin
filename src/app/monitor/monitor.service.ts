import { connection } from '../../database/mysql'
import { SearchMonitorModel, AddMonitorModel, UpdateMonitorModel } from './monitor.model'

export const getAllMonitor = async (key: SearchMonitorModel) => {
  let whereName = ''
  if (key.keyword) {
    // if (key.select == 'name') {
    //   whereName = `WHERE user.${key.select} LIKE '%${key.keyword}%'`
    // }
    if (key.select) {
      whereName = `WHERE monitor.${key.select} = '${key.keyword}'`

      if (key.status && String(key.status) !== '-1') {
        whereName += `AND monitor.status = ${Number(key.status)}`
      }
    }
  } else {
    if (key.status && String(key.status) !== '-1') {
      whereName = `WHERE monitor.status = ${Number(key.status)}`
    }
  }
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
    ${whereName}
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getAllMonitorNull = async () => {
  const statement = `
    SELECT *
      FROM monitor
      WHERE desktop_id = 0 OR desktop_id IS NULL;
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getDetails = async (id: number) => {
  const statement = `
    SELECT
      monitor.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      CAST(
        IF(
          COUNT(desktop.id),
          CONCAT(
            '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', monitor.id,
                'snID', monitor.snID,
                'brand', monitor.brand,
                'model', monitor.model
              )
            ),
            ']'
          ),
          NULL
        ) AS JSON
      ) AS desktop_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM monitor
    LEFT JOIN user
      ON user.id = monitor.user_id
    LEFT JOIN desktop
      ON monitor.desktop_id = desktop.id
    LEFT JOIN position
      ON position.id = monitor.position 
    LEFT JOIN attribution
      ON attribution.id = monitor.attribution
    LEFT JOIN branch
      ON branch.id = monitor.branch
    LEFT JOIN department
      ON department.id = monitor.department
    WHERE monitor.id = ${id}
    GROUP BY monitor.id;
  `

  const [data] = await connection.promise().query(statement, id)
  return data
}

export const add = async(values: AddMonitorModel) => {
  const statement = `
    INSERT INTO monitor
    SET ?
  `
  const [data] = await connection.promise().query(statement, values)
  return data
}

export const update = async(id: number, values: AddMonitorModel) => {
  const statement = `
    UPDATE monitor
      SET ?
      WHERE id = ?;
  `
  const [data] = await connection.promise().query(statement, [values, id])
  return data
}
