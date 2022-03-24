const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  /**
   *
   * Parse cookies in incoming request:
   *
   */

  let cookieString = req.get('Cookie') || '';

  parsedCookies = Object.fromEntries(
    cookieString.split('; ')
      .map((cookie) => cookie.split('='))
  );

  if (parsedCookies.s_id) {
    req.session_id = parsedCookies.s_id;
  } else {
    req.session_id = uuidv4();
    res.cookie('s_id', req.session_id);
  }

  next();
};
