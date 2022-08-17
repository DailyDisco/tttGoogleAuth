const express = require('express')
const passport = require('passport');
const router = express.Router()


// @desc Auth with Google
// @Route /login/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google Auth Callback
// @Route GET /login/google/callbackj
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/logged')

})


// @desc Logout
// @Route GET /auth/logout
// the most current version of Passport needs the logout to be asynchronous
router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/');
  })
});

module.exports = router



// http://grouptictactoe-with-login.dailydisco.repl.co/login/google/callback