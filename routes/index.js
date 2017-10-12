const express = require('express');
const passport = require('passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const router = express.Router();
const flash = require('req-flash');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cross Origin Auth Demo' });
});

router.get('/login',
  function(req, res){
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/loggedOut', function(req, res){
  res.render('index', { title: 'Cross Origin Auth Demo' , loggedout: true });
});

router.post('/callback', function(req, res) {
  res.redirect(req.session.returnTo || '/user');
});

router.get('/co-verify.html', function(req, res) {
  res.render('co-verify');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/error',
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });

router.get('/error', function(req, res) {
  var error = req.flash('error');
  var error_description = req.flash('error_description');
  console.log(error);
  console.log(error_description);
  req.logout();
  res.render('error', {
    error: error,
    error_description: error_description,
  });
});

router.get('/unauthorized', function(req, res) {
  res.render('unauthorized');
});


module.exports = router;
