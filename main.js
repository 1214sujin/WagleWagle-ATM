const express = require('express')
const app = express()

// var login = require('./db/session')
// login.session(app)

// const http=require("http")
// const server=http.createServer(app)
const bodyParser=require("body-parser")
const router=require("./routes/route")

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/",router)

app.listen(3000, () => console.log('Example app listening on port 3000'))  