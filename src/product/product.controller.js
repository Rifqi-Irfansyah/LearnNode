const express = require("express");
const prisma = require("../db");
const response = require('../../response')

const {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById,
} = require("./product.service");
const { insertProduct } = require("./product.repository");

const router = express.Router()

router.get('/', async (req, res) => {
    const prod = await getAllProducts()
    response(200, prod, "success find product", res)
})

router.get('/:id', async (req, res) => {
    const prod_id = req.params.id
    try {
        const prod = await getProductById(prod_id)
        response(200, prod, "Find Product Success", res)
    } catch (error) {
        response(404, "Error", error.message, res)
    }
})  

router.post('/', async (req, res) => {
    const new_prod = req.body
    try {
        const prod = await createProduct(new_prod)
        response(201, prod, "Create Product Success", res)
    } catch (error) {
        response(500, "Error", "Create Product Error", res)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const new_prod = req.body
    if(
        !(
            new_prod.name && 
            new_prod.description &&
            new_prod.image
        )
    )
        response(400, "Error", "Some fields are missing", res)
    try {
        const prod = await editProductById(id, new_prod)
        response(200, prod, "Update Product Success", res)
    } catch (error) {
        response(500, "Error", error.message, res)
    }
})

router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const new_prod = req.body

    try {
        const prod = await editProductById(parseInt(id), new_prod);
        return response(200, prod, "Update Product Success", res);
    } catch (error) {
        return response(500, "Error", error.message, res);
    }
})


router.delete('/:id', async (req, res) => {
    const prod_id = req.params.id
    try {
        await deleteProductById(parseInt(prod_id))
        response(200, "Success", "Delete Product Success", res)
    } catch (error) {
        response(404, error.message, "Product Not Found", res)
    }
})

module.exports = router;