const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const router = require("./src/router/router")
const cookieParser = require('cookie-parser')
const path = require('path')
const ejs = require('ejs')
const cors = require('cors')

const app = express()

app.use(express.json())

//calling cors
app.use(cors())

// parse request to bodyparser
app.use(express.urlencoded({extended: true}))

// parse request to cookieparser
app.use(cookieParser())

//connect mongodb database
require('./src/database/database')()

//log requests
app.use(morgan('tiny'))

// this reads the value present in config.env
dotenv.config({ path:'config.env'})
//setting up port
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, 'public')
// const viewsPath = path.join(__dirname, './views')

//set up view engine
app.set("view engine", "ejs")

//serving static files
app.use(express.static(publicDirectoryPath))
app.use('/css', express.static(path.resolve(__dirname + 'public/css')))
app.use('/js', express.static(path.resolve(__dirname + 'public/js')))
app.use('/images', express.static(path.resolve(__dirname + 'public/images')))
app.use('/temp', express.static(path.resolve(__dirname + 'public/temp')))



app.use('/', router)

// app.get('/', (req, res) => {
//     res.send("Everything is working just fine")
// })

app.listen(port, () => console.log(`The port is up on ${port}`))