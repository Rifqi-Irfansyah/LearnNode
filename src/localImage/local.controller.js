const express = require('express')
const router = express.Router()
const response = require('../../response')

router.get('/', (req, res) => {
    const path = "http://localhost:3000/img/ipon.jpg"
    response(200, path, "Public Image", res)
})
module.exports = router;