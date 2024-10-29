const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

app.use(bodyParser.json())

const ProductController = require("./product/product.controller")
app.use("/product", ProductController)

app.use(express.static('public'))
const ImageLocal = require("./localImage/local.controller")
app.use("/image", ImageLocal)

app.use("/", (req, res) => {
    res.send(404)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})