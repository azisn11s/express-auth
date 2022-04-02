const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=> {
    const token = req.get('Authorization');
    let decodedToken;

    if (!token) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return res.status(error.statusCode).json({errors: error.message});
    }

    try {
        decodedToken = jwt.verify(token.split(' ')[1], 'rahasiaperusahaan');
    } catch (error) {
        error.statusCode = 500;
        return res.status(error.statusCode).json({errors: error.message});
    }

    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        return res.status(error.statusCode).json({errors: error.message});
    }

    next();
}