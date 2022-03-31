const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use for x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// Use for json input
app.use(bodyParser.json());

// Set anti CORS
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
const authRoutes = require('./routes/auth')



app.use('/auth', authRoutes);

app.listen(8080);