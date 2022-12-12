const db = require('../models');
const Users = db.users;
const AccessToken = db.accessToken
const RefreshToken = db.refreshToken
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'});


const handleLogin = async (req, res) => {
    const {userEmail, password} = req.body;

    if (!userEmail || !password) return res.status(400).json({'message': 'Email and password are required'})

    const foundEmail = await Users.findAll({
        where: {email: userEmail}
    })

    try {
        if (foundEmail[0].dataValues.email === userEmail) {
            const match = await bcrypt.compare(password, foundEmail[0].dataValues.password)
            if (match) {
                const accessToken = jwt.sign(
                    {email: foundEmail[0].dataValues.email},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn: '10m'}
                );
                const refreshToken = jwt.sign(
                    {"email": foundEmail[0].dataValues.email},
                    process.env.REFRESH_TOKEN_SECRET,
                    {expiresIn: '1d'}
                );

                await AccessToken.create({
                    email: jwt.decode(accessToken).email,
                    expiration_time: new Date(jwt.decode(accessToken).exp * 1000),
                    token: accessToken
                })
                await RefreshToken.create({
                    email: jwt.decode(refreshToken).email,
                    expiration_time: new Date(jwt.decode(refreshToken).exp * 1000),
                    token: refreshToken
                })

                res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                res.status(200).json({accessToken});

            } else {
                return res.status(401).json({"message": "Invalid password"})
            }
        }

    } catch (error) {
        return res.status(401).json({"message": userEmail + " not found"})
    }

}

module.exports = {
    handleLogin
}