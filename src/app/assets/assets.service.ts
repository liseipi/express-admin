import { connection } from '../../database/mysql'
import { SearchAssetsModel, AddAssetsModel, EditAssetsModel, SaveLog } from './assets.model'

export const getAllAssets = async (key: SearchAssetsModel) => {
  let whereName = ''
  if (key.keyword) {
    // if (key.select == 'name') {
    //   whereName = `WHERE user.${key.select} LIKE '%${key.keyword}%'`
    // }
    if (key.select) {
      whereName = `WHERE desktop.${key.select} LIKE '%${key.keyword}%'`

      if (key.status && String(key.status) !== '-1') {
        whereName += `AND desktop.status = ${Number(key.status)}`
      }
    }
  } else {
    if (key.status && String(key.status) !== '-1') {
      whereName = `WHERE desktop.status = ${Number(key.status)}`
    }
  }
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
    ${whereName}
    ORDER BY desktop.snID ASC
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getDetails = async (id: number) => {
  const statement = `
    SELECT
      desktop.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info,
      CAST(
        IF(
          COUNT(monitor.id),
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
      ) AS monitor_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM desktop
    LEFT JOIN user
      ON user.id = desktop.user_id
    LEFT JOIN monitor
      ON monitor.desktop_id = desktop.id
    LEFT JOIN position
      ON position.id = desktop.position 
    LEFT JOIN attribution
      ON attribution.id = desktop.attribution
    LEFT JOIN branch
      ON branch.id = desktop.branch
    LEFT JOIN department
      ON department.id = desktop.department
    WHERE desktop.id = ${id}
    GROUP BY desktop.id;
  `

  const [data] = await connection.promise().query(statement, id)
  return data
}

export const add = async (values: AddAssetsModel) => {
  const statement = `
    INSERT INTO desktop
    SET ?
  `
  const [data] = await connection.promise().query(statement, values)
  return data
}

export const update = async (id: number, values: EditAssetsModel) => {
  const statement = `
    UPDATE desktop
      SET ?
      WHERE id = ?;
  `
  const [data] = await connection.promise().query(statement, [values, id])
  return data
}

export const relatedMonitor = async (desktop_id: number, id: Array<number>) => {
  const statement = `
      UPDATE monitor SET desktop_id = ? WHERE id in (${id.toString()});
    `
  const [data] = await connection.promise().query(statement, desktop_id)
  return data
}

export const delMonitor = async (id: Array<number>) => {
  const statement = `
      UPDATE monitor SET desktop_id = 0 WHERE id in (${id.toString()});
    `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getRelatedMonitor = async (desktop_id: number) => {
  const statement = `
      SELECT id FROM monitor WHERE desktop_id = ?;
    `
  const [data] = await connection.promise().query(statement, desktop_id)
  return data
}

export const saveLog = async (saveLog: SaveLog) => {
  const statement = `
    INSERT INTO desktop_log
    SET ?
  `
  const [data] = await connection.promise().query(statement, saveLog)
  return data
}

export const saveLogEnd = async (desktop_id: Number, user_id: Number, end_time: Number) => {
  const statement = `
    UPDATE desktop_log
      SET end_time = ${end_time}
      WHERE desktop_id = ${desktop_id} AND user_id = ${user_id};
  `
  const [data] = await connection.promise().query(statement)
  return data
}

export const getLogs = async (id: number) => {
  const statement = `
    SELECT
      desktop_log.*,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info
    FROM desktop_log
    LEFT JOIN user
      ON user.id = desktop_log.user_id
    WHERE desktop_log.desktop_id = ${id}
  `

  const [data] = await connection.promise().query(statement)
  return data
}