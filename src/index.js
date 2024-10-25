const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
const response = require('../response')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
app.use(bodyParser.json())

app.get('/product', async (req, res) => {
    const prod = await prisma.product.findMany()
    response(200, prod, "find article title", res)
})

app.get('/product/:id', async (req, res) => {
    const prod_id = req.params.id
    try {
        const prod = await prisma.product.findUnique({
            where: { id: parseInt(prod_id) }
        })
        response(201, prod, "Find Product Success", res)
    } catch (error) {
        response(404, "Error", "Product Not Found", res)
    }
})  

app.post('/product', async (req, res) => {
    const new_prod = req.body
    try {
        const prod = await prisma.product.create({
            data: {
                name : new_prod.name,
                description : new_prod.description,
                image : new_prod.image,
            },
        })
        response(201, prod, "Create Product Success", res)
    } catch (error) {
        response(500, "Error", "Create Product Error", res)
    }
})

app.put('/product/:id', async (req, res) => {
    const id = req.params.id
    const new_prod = req.body
    try {
        const prod = await prisma.product.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name : new_prod.name,
                description : new_prod.description,
                image : new_prod.image,
            },
        })
        response(200, prod, "Update Product Success", res)
    } catch (error) {
        response(500, "Error", "Update Product Error", res)
    }
})

app.delete('/product/:id', async (req, res) => {
    const prod_id = req.params.id
    try {
        await prisma.product.delete({
            where:{
                id : parseInt(prod_id)
            }
        })
        response(200, "Success", "Delete Product Success", res)
    } catch (error) {
        response(404, error.message, "Product Not Found", res)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})