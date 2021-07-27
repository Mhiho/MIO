const jwt = require('express-jwt');
const secret = require('../config').secret;
const db = require('../_helpers/db');

module.exports = authorize;

function authorize() {
    return [
        // authenticate JWT token and attach decoded token to request as req.user
        jwt({ secret, algorithms: ['HS256'] }),

        // attach full user record to request object
        async (req, res, next) => {
            try{
                const token = req.header('Authorization').replace('Bearer ','')
                const decoded = jwt.verify(token, secret)
                const user = await db.User.findOne({_id: decoded._id, 'tokens.token': token})
          
                if(!user || user.validated == false){
                   throw new Error()
                }
                req.user = user;
                res.send(req.user);
                next();
             } catch(e){
                res.status(401).send({error: 'Please authenticate.'})
             } 
            next();
        }
    ];
}