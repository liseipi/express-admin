export default async (connection: any) => {
  let tabName = 'monitor'

  const dropSql = `DROP TABLE IF EXISTS ${tabName};`
  await connection.promise().query(dropSql)

  const statement = `CREATE TABLE IF NOT EXISTS ${tabName} (
    id                  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    sn_id               CHAR(255) NOT NULL COMMENT '关联资产编号ID',
    brand               CHAR(255) COMMENT '品牌',
    model               CHAR(255) COMMENT '型号',
    other               CHAR(255) COMMENT '其它参数',
    status              TINYINT UNSIGNED  DEFAULT 0 COMMENT '商品状态0：正常，1：损坏',
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
