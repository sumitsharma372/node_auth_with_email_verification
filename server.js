require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')


mongoose.set('strictQuery', true);

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)

const port = process.env.PORT || 8080


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
        })
    })
    .catch(err => {
        console.error(err)
    }
)