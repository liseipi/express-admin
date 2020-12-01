export default async (connection: any) => {
  let tabName = 'monitor'

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
    model               CHAR(255) COMMENT '型号',
    status              TINYINT UNSIGNED  DEFAULT 0 COMMENT '商品状态0：正常，1：损坏',
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
