const User = require('../../database/models/User');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  const saltRounds = 10;
  try {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    req.body.email = req.body.email.toLowerCase();
    const user = await User.create(req.body);
    const accessToken = jwt(user); //this is the token that is sent to the user, sign in after sign up
    res.status(201).json(accessToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const accessToken = jwt(req.user);
    res.status(201).json(accessToken);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// this is just a function to generate a token
const jwt = (user) => {
  // function in function because why not
  const payload = () => ({
    id: user._id,
    username: user.username,
    email: user.email,
    exp: Date.now() + process.env.JWT_EXPIRATION_DATE
  });

  // return for 1st function, 2nd function has implicit return
  return {
    token: JWT.sign(JSON.stringify(payload()), process.env.JWT_SECRET)
  };
};
