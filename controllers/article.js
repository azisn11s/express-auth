const {
	validationResult
} = require('express-validator');

const Article = require('../models/article');

exports.index = (req, res, next)=>{
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 10;

    Article.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'title', 'captions']
    }).then(result=> {
        console.log(result);
        return res.status(200).json(result);
    }).catch(error=> {
        return res.status(500).json(error);
    })

}

exports.show = (req, res, next)=>{
    const articleId = req.params.id;

    Article.findByPk(articleId).then(result=> {
        
        if (!result) {
            return res.status(404).json({
                errors: "The article not found!"
            });
        }

        return res.status(200).json(result);
    }).catch(error=> {
        console.log('error', error);
        return res.status(422).json(error);
    })
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