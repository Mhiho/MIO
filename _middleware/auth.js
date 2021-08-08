const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const db = require('../_helpers/db');

module.exports = authorize;

function authorize() {
    return async (req, res, next) => {
        // authenticate JWT token and attach decoded token to request as req.user
        try {
            const authHeader = req.headers.authorization;
            console.log(!!authHeader)
            if (!!authHeader === true) {
                const token = authHeader.split(' ')[1];
                const decoded = jwt.verify(token, secret)
                const user = await db.User.findOne({ _id: decoded._id, 'tokens.token': token }).catch(e=>console.log(e));
                if (!user ) {
                    throw new Error()
                }
                req.user = user
                next();
            }
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.' })
        }
    }
}