const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())

const ProductController = require("./product/product.controller")
app.use("/product", ProductController)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})