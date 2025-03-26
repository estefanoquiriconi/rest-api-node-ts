import express, { Express } from 'express'
import db from './config/db'
import router from './router'
import colors from 'colors'

async function connectDB() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.magenta('Conexión exitosa a la DB'))
  } catch (error) {
    console.error(error)
    console.log(colors.red('Hubo un error al conectar a la DB'))
  }
}

connectDB()

const server: Express = express()

server.use(express.json())

server.use('/products', router)

export default server
