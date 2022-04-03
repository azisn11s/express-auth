const {
	validationResult
} = require('express-validator');

const Article = require('../models/article');
const Category = require('../models/category');
const ArticleCategories = require('../models/article_category');
Article.belongsToMany(Category, { through: ArticleCategories });
Category.belongsToMany(Article, { through: ArticleCategories });
// const Categories = Article.hasMany(Category);

/**
 * List of articles 
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.index = (req, res, next)=>{
    const page = req.query.page || 1;
    const perPage = req.query.per_page || 10;

    Article.findAll({
        limit: perPage,
        offset: (page - 1) * perPage,
        attributes: ['id', 'title', 'captions'],
        include: [Category]
    }).then(result=> {
        console.log(result);
        return res.status(200).json(result);
    }).catch(error=> {
        return res.status(500).json(error);
    })

}

/**
 * Show detail an article
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.show = (req, res, next)=>{
    const articleId = req.params.id;

    Article.findByPk(articleId, {include: [Category]}).then(result=> {
        
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

/**
 * Create article
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
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
		content,
        category_id
	} = req.body;

    Article.create({
        title: title,
        captions: captions,
        content: content,
        created_at: new Date(),
    }).then(articleCreated=> {
        return Category.findByPk(category_id).then(category=> {
            category.addArticles(articleCreated);
            return articleCreated
        }).catch(error=> {
            console.log('ERROR finding category');
            return res.status(500).json(error);
        });
    }).then(result=> {
        return Article.findByPk(result.id);
    }).then(result=> {
        return res.status(200).json(result);
    })
    .catch(error=> {
        return res.status(500).json(error);
    })
}