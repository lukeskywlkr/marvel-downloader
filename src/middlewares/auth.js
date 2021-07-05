const fetch = require('node-fetch');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyAccessToken = async (req, next) => {
  const checkTokenInfo = 'oauth2/v1/tokeninfo';
  if (!req.header('Authorization')) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  const token = req.header('Authorization').split(' ')[1];
  const reqURL = new URL(`https://www.googleapis.com/${checkTokenInfo}`);
  reqURL.searchParams.append('access_token', token);
  const response = await fetch(reqURL.toString());
  const serverRes = await response.json();
  if (serverRes.error) return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  return next();
};

const auth = () => async (req, res, next) => {
  await verifyAccessToken(req, next);
};

module.exports = auth;
