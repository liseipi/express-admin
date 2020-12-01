import { connection } from '../../database/mysql'

export const getAllAssets = async () => {
  const statement = `
    SELECT 
      *,
      JSON_OBJECT(
        'name', user.name,
        'name_en', user.name_en
      ) AS user_info
    FROM desktop
    LEFT JOIN user
      ON user.id = desktop.user_id
  `
  const [data] = await connection.promise().query(statement)
  return data
}

/*
* JSON_OBJECT(
        'id', mt.id,
        'dt_id', mt.dt_id,
        'sn_id', mt.sn_id,
        'brand', mt.brand,
        'model', mt.model
      ) as monitor_info
* */
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
      ) AS monitor_info
    FROM desktop
    LEFT JOIN user
      ON user.id = desktop.user_id
    LEFT JOIN monitor
      ON monitor.desktop_id = desktop.id
    WHERE desktop.id = ${id}
    GROUP BY desktop.id;
  `

  const [data] = await connection.promise().query(statement, id)
  return data
}
