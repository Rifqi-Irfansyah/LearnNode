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

app.get('/article', (req, res) =>{
    const sql = `SELECT * FROM article`
    db.query(sql, (err, result) => {
        if(err) throw err
        response(200, result, "find article title", res)
    })
})

app.get('/article/:title', (req, res) =>{
    const title = req.params.title
    const sql = `SELECT * FROM article WHERE title = '${title}'`
    db.query(sql, (err, result)  => {
        if (err) throw err
        response(200, result, "find article", res)
    })
})

app.post('/article', (req, res) =>{
    const { title, category, description, confirm } = req.body
    const sql = `INSERT INTO article (title, category, description, confirm) VALUES ('${title}', '${category}', '${description}', '${confirm}')`
    db.query(sql, (err, result)  => {
        if (err) response(500, "invalid", "error", res)
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows
            }
            response(200, data, "Data Added Successfully", res)
        }
    })
})
  
app.put('/article', (req, res) =>{
    const { title, description } = req.body
    const sql = `UPDATE article SET description = '${description}' WHERE title = '${title}'`
    db.query(sql, (err, result)  => {
        if (err) response(500, "invalid", "error", res)
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message
            }
            response(200, data, "Data Updated Successfully", res)
        }
        else
            response(500, "Article Not Found", "Error", res)
    })
})

app.delete('/article', (req, res) =>{
    const { title } = req.body
    const sql = `DELETE FROM article WHERE title = '${title}'`
    db.query(sql, (err, result)  => {
        if (err) response(500, "invalid", "error", res)
        if (result?.affectedRows){
            const data = {
                isSuccess: result.affectedRows,
                message: result.message
            }
            response(200, data, "Data Deleted Successfully", res)
        }
        else
            response(500, "Article Not Found", "Error", res)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})