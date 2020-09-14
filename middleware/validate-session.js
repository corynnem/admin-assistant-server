const jwt = require('jsonwebtoken');
const User = require('../db') && require('../models/usermodel');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.headers);
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(`this is an invalid token error ${decodedToken}`)
        if(!err && decodedToken) {
            User.findOne({where: {id: decodedToken.id}})
            .then(user => { 
                if(!user) throw 'err';
                req.user = user;
                return next();
            })
            .catch(err => {
                next(err);
                console.log('probably a token issue')
            })
        } else {
            req.errors = err;
            res.status(401).send('Bad Token, refresh it')
        }
    })
}


module.exports = validateSession;