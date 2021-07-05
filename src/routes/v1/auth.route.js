const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {});

router.get('/callback', passport.authenticate('google', { scope: ['email', 'profile'] }), (req, res) => {
  return res.send({ result: 'Authenticated', accessToken: req.user.accessToken, refreshToken: req.user.refreshToken });
});

module.exports = router;
