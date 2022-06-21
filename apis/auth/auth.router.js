const express = require('express');
const router = express.Router();

const passport = require('passport');
const { signin, signup } = require('./auth.controller');

router.post('/signup', signup);
router.post(
  '/signin',
  passport.authenticate('local', { session: false }),
  signin
);

module.exports = router;
