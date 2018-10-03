import express from 'express'

import authRouter from './auth/router'


const app = express()
app.all('/', (_, res) => res.send('Welcome to Functional RESTful CRUD service'))
app.use('/auth', authRouter)

app.listen(3000, () => {
    console.log('Listening to port 3000')
})
app.on('error', console.error)
