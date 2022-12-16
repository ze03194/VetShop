// const db = require('../models');
// const Users = db.users;
// const RefreshToken = db.refreshToken;
//
//
// const handleLogout = async (req, res) => {
//     // const cookies = req.cookies;
//
//     // if (!cookies?.jwt) return res.status(204).json({'message': 'whoop'});
//     const refreshToken = req.body.refreshToken;
//     const foundToken = await RefreshToken.findAll({
//         where: {token: refreshToken}
//     })
//
//     // res.json(refreshToken)
//
//     try {
//         if (!foundToken[0].dataValues.token) {
//             res.clearCookie('jwt', {
//                 httpOnly: true,
//                 sameSite: 'None',
//                 secure: true,
//             })
//             return res.status(204);
//         }
//         await foundToken[0].destroy();
//         res.clearCookie('jwt', {
//             httpOnly: true,
//             sameSite: 'None',
//             secure: true,
//         })
//         return res.status(204).json({'message': 'Successful logout'});
//
//     } catch (error) {
//         return res.status(401)
//     }
// }
//
// module.exports = {
//     handleLogout
// }