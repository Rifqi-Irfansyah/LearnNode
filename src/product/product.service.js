const express = require("express");
const prisma = require("../db");
const response = require('../../response')

const {
    findProducts,
    findProductById,
    insertProduct,
    editProduct,
    deleteProduct
} = require ('./product.repository')

const getAllProducts = async () => {
    const prod = await findProducts()
    return prod
}

const getProductById = async (id) => {
    const prod = await findProductById(id)
    if(!prod)
        throw Error("Product Not Found")
    return prod
}

const createProduct = async (new_prod) => {
    const prod = await insertProduct(new_prod)
    return prod
}

const deleteProductById = async (id) => {
    await findProductById(id)
    await deleteProduct(id)
}

const editProductById = async (id, new_prod) => {
    await getProductById(id)
    const prod = await editProduct(id, new_prod)
    return prod
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById
}