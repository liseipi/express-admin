export default async (connection: any) => {
  let tabName = 'profile'

  const dropSql = `DROP TABLE IF EXISTS ${tabName};`
  await connection.promise().query(dropSql)

  const statement = `CREATE TABLE IF NOT EXISTS ${tabName} (
    id                  INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    uid                 INT NOT NULL UNIQUE KEY,
    username            CHAR(255),
    createdAt           BIGINT NOT NULL,
    updatedAt           BIGINT NOT NULL
  ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  await connection.promise().query(statement)
}
