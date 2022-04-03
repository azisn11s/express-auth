const express = require('express')
const {
    body
} = require('express-validator');

const router = express.Router()
const categoryController = require('../controllers/category')

router.get('/categories', categoryController.index);

module.exports = router;
