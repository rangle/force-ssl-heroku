'use strict';

module.exports = function (req, res, next) {
  var sslUrl;

  if (process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https' &&
    req.hostname !== 'localhost') {

    sslUrl = ['https://', req.hostname, req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
};
