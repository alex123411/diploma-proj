const cors = require('cors')
const morgan = require('morgan')
const express = require('express')

const config = require('./config')

const { authRouter } = require('./controllers/authController')

const { authMiddleware } = require('./middleware/authMiddleware')

const { userRouter } = require('./controllers/userController')
const { jobRouter } = require('./controllers/jobController')


const app = express()

app.use(cors())
app.use(express.json());
app.use(morgan('tiny'))

app.use('/api/auth', authRouter)

app.use(authMiddleware)

app.use('/api/user', userRouter)
app.use('/api/job', jobRouter)


const start = async () => {
    try {
        // Starting application
        app
            .listen(config.port, () => {
                console.log(`Webapp is listening on port ${config.port}`)
            })
    } catch (e) {
        console.error(`Error on server startup: ${e.message}`)
    }
}

start()