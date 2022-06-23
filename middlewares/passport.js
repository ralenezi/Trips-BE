const User = require('../database/models/User');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const { fromAuthHeaderAsBearerToken } = require('passport-jwt').ExtractJwt;

// sign in
exports.localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({
        email: email.toLowerCase()
      });
      // check if password match
      const userAuthenticated =
        user && (await bcrypt.compare(password, user.password));

      return done(null, userAuthenticated && user);
    } catch (error) {
      console.log('Error:', error);
      done(error);
    }
  }
);

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      if (jwtPayload.exp < Date.now()) {
        throw new Error(`Expired`);
      }
      const user = await User.findById(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
