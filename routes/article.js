const express = require('express')
const {
    body
} = require('express-validator');

const router = express.Router()
const articleController = require('../controllers/article')

router.get('/articles', articleController.index);

router.get('/articles/:id', articleController.show);

/**
 * Create an article
 */
router.post('/articles', [
    body('title').isLength({min: 5}),
    body('captions').isLength({min: 10}),
    body('content').isLength({min: 20})
], articleController.store);

module.exports = router;
