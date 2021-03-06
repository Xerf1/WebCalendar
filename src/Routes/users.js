var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');
var User = require('../models/user');

//Register
router.post('/register', function(req, res, next){
    var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, function(err, user){
        if(err){
            res.send({success: 500, msg:'Failed to register user: '+err});
            throw err;
        } else {
            res.send({success: 200, msg:'User registered'});
        }
    });
});

//Authenticate
router.post('/authenticate', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found',r:0});
        }

        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                var token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 //1 week
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password',r:1});
            }
        });
    });
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), function(req, res, next){
    res.json({user: req.user});
});

module.exports = router;
