const JWT = require('jsonwebtoken');

module.exports = (body) => {

  if (!body) {
    return new Error('invalid jwtdata');
  }

  return JWT.verify(body.toString('utf8'), "ECHmFz1CzkFlQaNKQau7cYP838_BAYpBGsn6UEWTZVZO1kYxCjoVIX47YACwJmyP_dYoiWxE4DZSJDc4-INFonuquxWZqGqHhtF--oLBGL6vUxh_FUGLuNKb4YdN9wlhD9TUwbNglT1JUJxP95s2wJoCv8RPEHwSZn87gauksPOrQjSSTaQRPU5Hh-eYgRUluSESkakeGCv1iQ9V6Pmr-R7RTxDSVnyUWbb6xs3THQQpLazdS8WM4itJPTkPNw2", {
    algorithm: 'HS256',
  });
};
