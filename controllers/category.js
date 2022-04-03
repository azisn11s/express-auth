const {
	validationResult
} = require('express-validator');

const Category = require('../models/category');

/**
 * List of categories 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next)=>{
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 10;

    Category.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'slug', 'name']
    }).then(result=> {
        return res.status(200).json(result);
    }).catch(error=> {
        return res.status(500).json(error);
    })

}

