var express = require('express');
var router = express.Router();
var UserModel = require('../models/usermodel');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');


router.post('/signup', (req, res) => {
    UserModel.create({
        email: req.body.user.email,
        passwordhash: bcrypt.hashSync(req.body.user.password, 12),
        admin: req.body.user.admin === true ? req.body.user.admin === true : req.body.user.admin === false
    })
    .then(
        function success(user) {
            console.log(`admin? ${user.admin}`)
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.status(200).json({
                user: user,
                message: "Successfully created user",
                sessionToken: token,
            })
        },
        function error(err) {
            res.status(500).send(err.message);
        }
    )

})


router.post('/login', (req, res) => {
    UserModel.findOne({
        where : {email: req.body.user.email}
    }).then(
        function (user) {
            console.log(user);
            if(user){
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if(matches) {
                        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60*60*24 });

                        res.json({
                            user: user,
                            message: 'successfully logged in!',
                            sessionToken: token,
                        })

                    } else {
                        res.status(502).send({message: 'Invalid Password'})

                    } 
                })
            } else {
                res.status(500).send({message: "Invalid Login/ User not found"})
            }
        }
    )
})

module.exports = router;