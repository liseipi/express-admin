export default async (connection: any) => {
    let tabName = 'admin'

    const dropSql = `DROP TABLE IF EXISTS ${tabName};`
    await connection.promise().query(dropSql)

    const statement = `
    CREATE TABLE IF NOT EXISTS ${tabName} (
      id                  INT NOT NULL AUTO_INCREMENT PRIMARY KEY NOT NULL,
      email               CHAR(255) NOT NULL UNIQUE KEY,
      password            CHAR(255) NOT NULL,
      createdAt           BIGINT NOT NULL,
      updatedAt           BIGINT NOT NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
    await connection.promise().query(statement)
}
