const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const config = require('./config');

const googleOptions = {
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl,
  accessType: 'offline',
};

const verifyCallback = async (accessToken, refreshToken, profile, cb) => {
  profile.accessToken = accessToken;
  profile.refreshToken = refreshToken;
  cb(null, profile);
};

const googleStrategy = new GoogleStrategy(googleOptions, verifyCallback);

module.exports = {
  googleStrategy,
};
