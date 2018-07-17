import express = require('express')
import EnginePostgres from 'machinomy/lib/storage/postgresql/EnginePostgres'
const router = express.Router()

require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) throw new Error('Please, set DATABASE_URL env variable')

const dbEngine = new EnginePostgres(DATABASE_URL!)

router.post('/bc-nodes', async (req: express.Request, res: express.Response, next: Function) => {

})

router.post('/el-nodes', async (req: express.Request, res: express.Response, next: Function) => {

})

router.get('/bc-nodes', async (req: express.Request, res: express.Response, next: express.NextFunction) => {

})

router.get('/el-nodes', async (req: express.Request, res: express.Response, next: express.NextFunction) => {

})
