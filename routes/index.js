var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS Cross-origin Auth Demo' });
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
  res.render('index', { title: 'NodeJS Cross-origin Auth Demo' , loggedout: true });
});

router.post('/callback', function(req, res) {
  res.redirect(req.session.returnTo || '/user');
});

router.get('/silent-callback.html', function(req, res) {
  res.render('silent-callback');
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
