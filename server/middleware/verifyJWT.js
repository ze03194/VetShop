const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'})

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({'message': 'Missing token'})
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.status(403).json({'message': 'Invalid token'})
            req.email = decoded.email;
            next();
        }
    )
}

module.exports = verifyJWT;