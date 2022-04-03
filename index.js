const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const databaseConnection = require('./utils/database');
const isAuth = require('./middleware/is-auth');

// Models & Relationship
const User = require('./models/user');
const Article = require('./models/article');
const Category = require('./models/category');
const ArticleCategories = require('./models/article_category');

// Article.belongsToMany(Category, {through: 'Article_Categories'});
// Category.belongsToMany(Article, {through: 'Article_Categories'});

// Seeder
const categoriesSeeder = require('./seeder/categories');

// app.use(categoriesSeeder);

// Use for x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// Use for json input
app.use(bodyParser.json());

// Set anti CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/article');
const categoryRoutes = require('./routes/category');



app.use('/auth', authRoutes);
app.use(isAuth, articleRoutes);
app.use(isAuth, categoryRoutes);



databaseConnection
    // .sync({ force: true })
    .sync()
    .then(result => {
        // console.log('CONNECTION RESULT', result);
        return User.findByPk(1);
    })
    .then(user => {
        console.log('USER CALLED', user);
        
        app.listen(process.env.APP_PORT);
    })
    .then(result=> {
        console.log('SETELAH RUNNING', result);
        // Seeder exec
        categoriesSeeder.seed();
    })
    .catch(err => {
        console.log(err);
    });