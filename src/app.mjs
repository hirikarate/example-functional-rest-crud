import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import authRouter from './auth/router'


const app = express()

/**
 * string => Promise<boolean>
 * @param origin [string]
 */
const isOriginAllowed = origin => Promise.resolve().then(() => {
    const whitelist = ['http://localhost:3000', 'https://localhost:3000']
    return whitelist.includes(origin)
})

/**
 * (string, Function) => void
 * @param origin [string]
 * @param cb [Function]
 */
const originCallback = (...args) => {
    const [origin, cb] = args
    console.dir({ args })
    isOriginAllowed(origin).then(allowed => (allowed ? cb(null, true) : cb(new Error(`Origin ${origin} is not allowed`))))
}

const buildCorsOptions = () => ({
    origin: originCallback,
    maxAge: 3600, // 1 hour
})

app.use(cors(buildCorsOptions()))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.all('/', (_, res) => res.send('Welcome to Functional RESTful CRUD service'))
app.use('/auth', authRouter)

process
    .on('unhandledRejection', (error) => {
        console.error(`unhandledRejection: ${error.stack}`)
        process.exit(1)
    })
    .on('uncaughtException', (error) => {
        console.error(`uncaughtException: ${error.stack}`)
        process.exit(1)
    })

app.listen(3000, () => {
    console.log('Listening to port 3000')
})
app.on('error', console.error)
