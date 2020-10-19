const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log('isLoggedIn in getLogin: ', req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne()
    .then(user => {
      if(user) {
        req.session.user = user;
        req.session.isLoggedIn = true;
        console.log('session in inPostLogin: ', req.session);
        res.redirect('/');
      } else {
          console.log('User not found!');
        }
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy( (err) => {
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  });
};
