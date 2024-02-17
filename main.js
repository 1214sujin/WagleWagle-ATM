const express = require('express')
const session=require("express-session")
const app = express()
const http = require('http');

const bodyParser=require("body-parser")
const router=require("./routes/route")

var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors());


app.use(session({
    secret: 'super-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

app.use("/",router)

app.listen(3000, () => console.log('Example app listening on port 3000'))
~                                                                            