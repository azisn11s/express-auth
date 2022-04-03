const Category = require('../models/category');

const categories = [{
    slug: 'category-1',
    name: 'Category 1'
},{
    slug: 'category-2',
    name: 'Category 2'
},{
    slug: 'category-3',
    name: 'Category 3'
}];

exports.seed = (req)=> {
    // console.log('HARUSNYA MASUK LOOPING...');
    categories.forEach(item=> {
        Category.findAll({
            where: {
                slug: item.slug
            }
        }).then(result=> {
            
            return result;

        }).then(result=> {
            // Create
            if (!result || !result.length) {
                Category.create({
                    slug: item.slug,
                    name: item.name
                }).then(result=> {
                    console.log("CATEGORY CREATED", result);
                }).catch(error=> {
                    console.log('ERROR!', error);
                })
            }

            // Update
            Category.update({
                name: item.name
            }, {
                where: {
                    slug: item.slug
                }
            }).then(result=> {
                console.log("Category updated", result);
            }).catch(error=> {
                console.log("ERROR", error);
            })
        })
        .catch(error=> {
            console.log('ERRRROOOOORRR!!!!', error);
        });

        // console.log('THIS IS CATEGORY', category);
    })
}

