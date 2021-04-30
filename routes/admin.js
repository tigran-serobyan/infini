var express = require('express');
var router = express.Router();
var { haveAccess, newAccess, changeUsername, changePassword } = require('../services/access');
var HOME_URL = process.env.HOME_URL;

// Admin home page
router.get('/', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.render('admin', { title: 'Կառավարակետ', HOME_URL });
  } else {
    res.redirect(HOME_URL + 'admin/login')
  }
});

//Login page
router.get('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.render('login', { title: 'Մուտք', HOME_URL, warning: (req.cookies.access == 'wuop') ? true : false });
  }
});

//Login
router.post('/login', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    res.redirect(HOME_URL + 'admin');
  } else {
    res.cookie('access', newAccess(req.body.username, req.body.password), { httpOnly: true });
    res.redirect(HOME_URL + 'admin');
  }
});

//Logout
router.get('/logout', function (req, res, next) {
  res.cookie('access', '', { httpOnly: true });
  res.redirect(HOME_URL + 'admin');
});

//Change username password
router.post('/changeUP', function (req, res, next) {
  if (haveAccess(req.cookies.access)) {
    changeUsername(req.cookies.access, req.body.newUsername).then((respond) => {
      changePassword(req.cookies.access, req.body.newPassword).then((respond) => {
        res.redirect(HOME_URL + 'admin');
      });
    });
  } else {
    res.redirect(HOME_URL + 'admin/login');
  }
});

module.exports = router;
