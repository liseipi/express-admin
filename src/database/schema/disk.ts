export default async (connection: any) => {
  let tabName = 'disk'

  const dropSql = `DROP TABLE IF EXISTS ${tabName};`
  await connection.promise().query(dropSql)

  const statement = `CREATE TABLE IF NOT EXISTS ${tabName} (
    id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    sn_id               CHAR(255) NOT NULL COMMENT '关联资产编号ID',
    brand               CHAR(255) COMMENT '品牌',
    type                CHAR(255) COMMENT '类型0：机械，1：SSD，2：M2-SSD，3：其它',
    size                CHAR(255) COMMENT '容量',
    other               CHAR(255) COMMENT '其它参数',
    status              TINYINT UNSIGNED  DEFAULT 0 COMMENT '商品状态0：正常，1：损坏',
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
