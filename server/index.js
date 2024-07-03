const express = require ('express')
const db = require ('./db.js')
const router = require('./router/Authentication.js')
const taskroutes = require('./router/Task.js')
const cors = require('cors')


const app = express()
const port = 8000;

app.use(express.json())
app.use(cors())
app.use('/Authentication',router)
app.use('/task',taskroutes)
db();
app.get('/signup',(req,res)=>{
    res.send("wellcome page server")
})

app.listen(port,()=>{
    console.log(`server starting at port ${port}`)
})
