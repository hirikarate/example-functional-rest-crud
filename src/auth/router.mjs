import express from 'express'


const router = express.Router()

const handleDefault = (_, res) => res.send('auth router')
router.get('/', handleDefault)

export { router as default }
