import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../key/private.key'))
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../key/public.key'))
process.env['PRIVATE_KEY'] = privateKey.toString()
process.env['PUBLIC_KEY'] = publicKey.toString()

//生成 base64
//Buffer.from(privateKey).toString('base64')
//base64换回原内容
//Buffer.from(privateKey, 'base64').toString()

export default process.env
