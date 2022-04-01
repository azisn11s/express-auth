const {
	validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

/**
 * Register a user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.register = (req, res, next) => {

	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		return res.status(422).json({
			errors: validationErrors.array()
		});
	}

	const {
		email,
		username,
		password
	} = req.body;

	bcrypt.hash(password, 12)
		.then(hashedPassword => {
			// Create user
			console.log('hashed password', hashedPassword);
			return User.create({
				username: username,
				email: email,
				password: hashedPassword,
				created_at: new Date()
			});

		})
		.then(newUser => {
			res.status(200).json(newUser)
		})
		.catch(err => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}

			res.status(err.statusCode).json(err)

			// next();
		});


}

/**
 * Login
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
exports.login = (req, res, next) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		return res.status(422).json({
			errors: validationErrors.array()
		});
	}

	const {
		email,
		password
	} = req.body;

	User.findOne({
		email: email
	}).then(user => {
		if (!user) {
			return res.status(404).json({
				errors: "User not found!"
			});
		}

		bcrypt.compare(password, user.password).then(doMatch => {
			const token = jwt.sign({
				email: user.email,
				id: user.id
			}, 'rahasiaperusahaan', {expiresIn: '1h'})

			return res.status(200).json({token: token});
		}).catch(err => {
			return res.status(422).json({
				errors: "User password doesn't match!"
			});
		})
	})
}