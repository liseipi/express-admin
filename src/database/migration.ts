import fs from 'fs'
import path from 'path'
import { connection } from './mysql'

const schemaDir = path.join(__dirname, 'schema')
// const basename = path.basename(__filename)

/*
import AdminTable from './schema/admin'
import ProfileTable from './schema/profile'

!(async () => {
  await AdminTable(connection)
  await ProfileTable(connection)

  process.exit()
})()
*/

fs.readdirSync(schemaDir).filter(file => {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
}).forEach(async (file, index, arr) => {
  let schema = require(path.join(__dirname, 'schema', file))
  await schema.default(connection)
  if (arr.length == index + 1) {
    process.exit()
  }
})



