const express = require('express')
const {
    body
} = require('express-validator');

const router = express.Router()
const authController = require('../controllers/auth')
const User = require('../models/user');

/**
 * User - register
 */
router.post('/register', [
    body('username').isLength({
        min: 5
    })
    .withMessage("The username should contain only letters and should be unique."),
    // .custom(value => {
    //     return User.findOne({
    //             where: {
    //                 username: value
    //             }
    //         })
    //         .then(() => {
    //             return Promise.reject('Username already taken')
    //         })
    // }),
    body('email').isEmail().withMessage("The email should valid email address and should be unique."),
    // .custom(value => {
    //     return User.findOne({
    //             where: {
    //                 email: value
    //             }
    //         })
    //         .then(() => {
    //             return Promise.reject('Email already taken')
    //         })
    // }),
    body('password').isLength({
        min: 6
    })
], authController.register);

/**
 * User - login
 */
router.post('/login', [
    body('email').isEmail().withMessage("The email should valid email address."),
    body('password').notEmpty()
], authController.login)
module.exports = router;