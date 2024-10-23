const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const db = require('./connection')
const response = require('./response')

app.use(bodyParser.json())

app.get('/', (req, res) => {
    db.query("SELECT * FROM article", (error, result) => {
        response(200, result, "get all data", res)
    })
})

app.get('/find', (req, res) =>{
    const sql = `SELECT * FROM article WHERE title = '${req.query.title}'`
    db.query(sql, (error, result) => {
        response(200, result, "find article title", res)
    })
})

app.put('/add', (req, res)=>{
    console.log(req.body)
    if(req.body.nama == "Rifqi")
        res.send('Data Benar')
    else
        res.send('Data Salah')
})
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})