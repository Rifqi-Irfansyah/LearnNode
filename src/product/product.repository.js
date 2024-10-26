const prisma = require("../db");

const findProducts = async () => {
    const prod = await prisma.product.findMany()
    return prod
}

const findProductById = async (id) => {
    const prod = await prisma.product.findUnique({
        where: { id: parseInt(id) }
    })
    return prod
}

const insertProduct = async (productData) => {
    const prod = await prisma.product.create({
        data:{
            name: productData.name,
            description: productData.description,
            image: productData.image
        }
    })
    return prod
}

const deleteProduct = async (id) => {
    const prod = await prisma.product.delete({
        where: { id }
    })
}

const editProduct = async (id, productData) => {
    const prod = await prisma.product.update({
        where:{
            id: parseInt(id)
        },
        data:{
            name: productData.name,
            description: productData.description,
            image: productData.image
        }
    })
}

module.exports = {
    findProducts,
    findProductById,
    insertProduct,
    deleteProduct,
    editProduct
}