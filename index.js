const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const databaseConnection = require('./utils/database');
const User = require('./models/user');


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
const authRoutes = require('./routes/auth')



app.use('/auth', authRoutes);



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