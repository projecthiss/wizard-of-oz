const express = require('express')
const bodyParser  =require('body-parser')
const path = require('path')
const {feedbackToDatabase} = require("./mongoRequests");
const app = express()
app.use(express.json(
    {type: ['application/json', 'text/plain']}
))

// configure the middleware fpr requests
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json(
    {type: ['application/json', 'text/plain']}
))

const router = express.Router()

//link to static client files (generated in production Mode)
const staticFiles = express.static(path.join(__dirname, '../../client/build'))

app.use(staticFiles)

app.post('/api/feedbackToDatabase', feedbackToDatabase)

//bandit.setActions()

app.use(router)

app.use('*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})