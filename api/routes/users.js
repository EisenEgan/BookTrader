const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const User = require('../data/user');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', (req, res, next) => {
  console.log('does this print?')
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      console.log('user added')
      const token = jwt.sign(user, config.secret, {
        expiresIn: 604800 // 1 week
      })
      res.json({
        success: true,
        token: 'JWT '+ token,
        user: user
      });
      //res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+ token,
          user: user
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

router.post('/changepassword', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const email = req.body.user.email;
  const password = req.body.oldPassword;
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.status(404).json({success: false, msg: 'User not found'});
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) {
        return res.status(404).json({success: false, msg: err});
      }
      if(isMatch){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
            if(err) {
              return res.status(404).json({success: false, msg: 'Wrong password'});
            }
            user.password = hash;
            user.save((err) => {
              if (err) {
                return res.status(404).json({success: false, msg: 'Wrong password'});
              } else {
                return res.status(200).json({success: true, msg: 'Password Updated'})
              }
            });
          });
        });
      } else {
        return res.status(404).json({success: false, msg: 'Wrong password'});
      }
    })
  });
})

router.post('/changelocation', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  const email = req.body.user.email;
  const city = req.body.city
  const state = req.body.state
  User.getUserByEmail(email, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.status(404).json({success: false, msg: 'User not found'});
    }
    user.city = city
    user.state = state
    user.save((err) => {
      if (err) {
        return res.status(404).json({success: false, msg: 'User not found'});
      } else {
        return res.status(200).json({success: true, msg: 'User details updated'});
      }
    })
  })
})

module.exports = router;
