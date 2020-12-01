export default async (connection: any) => {
  let tabName = 'desktop'

  const dropSql = `DROP TABLE IF EXISTS ${tabName};`
  await connection.promise().query(dropSql)

  const statement = `CREATE TABLE IF NOT EXISTS ${tabName} (
    id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
    snID                CHAR(255) NOT NULL UNIQUE KEY COMMENT '主机资产编号',
    name                CHAR(255),
    name_en             CHAR(255),
    position            CHAR(255) COMMENT '城域',
    attribution         CHAR(255) COMMENT '公司',
    branch              CHAR(255) COMMENT '办公室',
    department          CHAR(255) COMMENT '部门',
    ip_address          CHAR(255) UNIQUE KEY COMMENT 'IP',
    mac_address         CHAR(255) COMMENT '物理地址',
    ram                 CHAR(255) COMMENT '内存',
    cpu_info            CHAR(255) COMMENT 'CPU信息',
    gpu_info            CHAR(255) COMMENT '显卡信息',
    motherboard_info    CHAR(255) COMMENT '主板信息',
    disk                CHAR(255) COMMENT '硬盘信息',
    remarks             CHAR(255) COMMENT '其它备注',
    status              TINYINT UNSIGNED DEFAULT 0 COMMENT '状态0：正常，1：损坏',
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
