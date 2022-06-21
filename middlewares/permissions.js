const Passport = require('passport');

exports.isSignedIn = Passport.authenticate('jwt', {
  session: false
});
