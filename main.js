const express = require('express')
const app = express()

var login = require('./db/session')
login.session(app)

app.listen(3000, () => console.log('Example app listening on port 3000'))  