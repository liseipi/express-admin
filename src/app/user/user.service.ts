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

export const getAssets = async (uid: number) => {
  const statement = `
    SELECT
      user.*,
      CAST(
        IF(
          COUNT(desktop.id),
          CONCAT(
            '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', desktop.id,
                'snID', desktop.snID,
                'ip', desktop.ip_address,
                'mac_address', desktop.mac_address,
                'ram', desktop.ram,
                'cpu_info', desktop.cpu_info,
                'disk', desktop.disk
              )
            ),
            ']'
          ),
          NULL
        ) AS JSON
      ) AS desktop_info,
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
      CAST(
        IF(
          COUNT(other.id),
          CONCAT(
            '[',
            GROUP_CONCAT(
              DISTINCT JSON_OBJECT(
                'id', other.id,
                'snID', other.snID,
                'sn_name', other.sn_name,
                'model', other.model
              )
            ),
            ']'
          ),
          NULL
        ) AS JSON
      ) AS other_info,
      position.name as position_name,
      attribution.name as attribution_name,
      branch.name as branch_name,
      department.name as department_name
    FROM user
    LEFT JOIN desktop
      ON desktop.user_id = user.id
    LEFT JOIN monitor
      ON monitor.user_id = user.id
    LEFT JOIN other
      ON other.user_id = user.id
    LEFT JOIN position
      ON position.id = user.position 
    LEFT JOIN attribution
      ON attribution.id = user.attribution
    LEFT JOIN branch
      ON branch.id = user.branch
    LEFT JOIN department
      ON department.id = user.department
    WHERE user.id = ${uid}
    GROUP BY user.id;
  `

  const [data] = await connection.promise().query(statement, uid)
  return data
}
