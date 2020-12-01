export default async (connection: any) => {
  let tabName = 'disk'

  const dropSql = `DROP TABLE IF EXISTS ${tabName};`
  await connection.promise().query(dropSql)

  const statement = `CREATE TABLE IF NOT EXISTS ${tabName} (
    id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    snID                CHAR(255) NOT NULL UNIQUE KEY COMMENT '资产编号ID',
    name                CHAR(255),
    name_en             CHAR(255),
    position            CHAR(255) COMMENT '城域',
    attribution         CHAR(255) COMMENT '公司',
    branch              CHAR(255) COMMENT '办公室',
    desktop_id          INT UNIQUE KEY COMMENT '关联主机资产编号ID',
    details             CHAR(255) COMMENT '详细参数',
    brand               CHAR(255) COMMENT '品牌',
    type                CHAR(255) COMMENT '类型0：机械，1：SSD，2：M2-SSD，3：其它',
    size                CHAR(255) COMMENT '容量',
    status              TINYINT UNSIGNED  DEFAULT 0 COMMENT '商品状态0：正常，1：损坏',
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
