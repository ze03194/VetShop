const db = require('../models');
const Users = db.users;
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});

const handleRefreshToken = async (req, res) => {
    // const cookies = req.cookies;
    // console.log('cookies: ' + cookies.jwt)

    // if (!cookies?.jwt) return res.sendStatus(401);

    if (!req.body.refreshToken) return res.status(204)

    const refreshToken = req.body.refreshToken;
    const foundUser = await Users.findAll({
        where: {email: jwt.decode(refreshToken).email}
    })


    try {
        if (!foundUser[0].dataValues.email) return res.sendStatus(401).json({'message': 'User not found'})


        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error, decoded) => {
                if (error || foundUser[0].dataValues.email !== decoded.email) return res.status(403);
                const accessToken = jwt.sign(
                    {"email": decoded.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '10m'}
                );
                res.json({accessToken})
            }
        );

    } catch (error) {
        return res.status(401).json({"message": foundUser + " not found"})
    }
}

module.exports = {
    handleRefreshToken
}