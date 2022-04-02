const {
	validationResult
} = require('express-validator');

const Article = require('../models/article');

exports.index = (req, res, next)=>{

}

exports.show = (req, res, next)=>{
    
}

exports.store = (req, res, next)=>{
    const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		return res.status(422).json({
			errors: validationErrors.array()
		});
	}

	const {
		title,
		captions,
		content
	} = req.body;

    try {
        Article.create({
            title: title,
            captions: captions,
            content: content,
            created_at: new Date()
        }).then(result=> {
            return res.status(200).json(result);
        }).catch(error=> {
            return res.status(500).json(error);
        })
    } catch (error) {
        throw error;
    }
}