const { request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne( {email: req.body.email} )
    .then(user => {
      if(!user) {
        return res.redirect('/login');
      }
      bcrypt.compare(req.body.password, user.password)
      .then( matches => {
        if(matches) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log('Error saving session: ', err);
            res.redirect('/');
          });
        }
        res.redirect('/login');
      })
      .catch( err => {
        console.log('postLogin bcrypt error:', err);
      });
    })
    .catch(err => console.log('postLogin error:', err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12)
        .then (hashedPassword => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] }
        });
        return user.save();
      })
      .then( result => {
        res.redirect('/login');
      })
  ;
    })
    .catch(err => {
      console.log('postSignup: ', err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
