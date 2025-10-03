const express = require('express')

const app = express()

const port =  process.env.PORT || 4000


app.get('/',(req,res)=>{
    res.send("Hello from a dockerized app. ")
} );

app.listen(port, ()=>{
    console.log(`The express app Listening on port ${port}`)
})