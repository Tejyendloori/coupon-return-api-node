const JWT = require('jsonwebtoken');

module.exports = (body) => {

  if (!body) {
    return new Error('invalid jwtdata');
  }

  return JWT.verify(body.toString('utf8'), "", {
    algorithm: 'HS256',
  });
};
