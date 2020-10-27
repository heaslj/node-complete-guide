const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '<KEY_VALUE>'
  }
}));

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'Email already in use, please try another.');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from: 'jheasly1@maine.rr.com',
            subject: 'Successful sign up',
            html: '<h1>Congratulations on your successful sign up!</h1>'
          });
        })
        .catch( err => {
          console.log('sendMail error: ', err);
        });
    })
    .catch(err => {
      console.log('signUp error: ', err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.postReset = (req, res, next) => {
  User.findOne( { email: req.body.email} )
  .then( user => {
    if (!user) {
      req.flash('error', 'Email address not found.');
      return res.redirect('/reset');
    }
    crypto.randomBytes(32, (err, buffer) => {
      if(err) {
        console.log('crypto error: ', err);
        return res.redirect('/reset');
      }
      user.resetToken = buffer.toString('hex');
      user.resetTokenExpiration = Date.now() + 3600000;
      user.save()
      .then( result => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'jheasly1@maine.rr.com',
          subject: 'Password reset request',
          html: `
          <p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${user.resetToken}">link</a> to set a new password</p>
          `
        });
      })
      .catch( err => {
        console.log('password reset error: ', err);
      })
    });
  }) 

};