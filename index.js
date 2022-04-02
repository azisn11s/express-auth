const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const databaseConnection = require('./utils/database');
const isAuth = require('./middleware/is-auth');
const User = require('./models/user');
const Article = require('./models/article');


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



app.use('/auth', authRoutes);
app.use(isAuth, articleRoutes);



databaseConnection
    // .sync({ force: true })
    .sync()
    .then(result => {
        console.log('CONNECTION RESULT', result);
        return User.findByPk(1);
    })
    .then(user => {
        console.log('USER CALLED', user);
        app.listen(8080);
    })
    .catch(err => {
        console.log(err);
    });