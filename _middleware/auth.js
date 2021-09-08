const jwt = require('jsonwebtoken');
const secret = require('../config').secret;
const db = require('../_helpers/db');

module.exports = authorize;

function authorize() {
    return async (req, res, next) => {
        // authenticate JWT token and attach decoded token to request as req.user
        try {
            const authHeader = await req.headers.authorization;
            if (!!authHeader === true) {
                const token = authHeader.split(' ')[1];
                console.log(token)
                const decoded = jwt.verify(token, secret)
                console.log(decoded)
                const user = await db.User.findOne({ _id: decoded._id, 'tokens.token': token }).catch(e=>console.log(e));
                console.log(user)
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