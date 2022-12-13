const express = require('express')
const path = require('path')
const app = express()
app.use(express.json(
    {type: ['application/json', 'text/plain']}
))

const router = express.Router()

//link to static client files (generated in production Mode)
const staticFiles = express.static(path.join(__dirname, '../../client/build'))

app.use(staticFiles)

//bandit.setActions()

app.use(router)

app.use('*', staticFiles)

app.set('port', (process.env.PORT || 3001))
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('port')}`)
})