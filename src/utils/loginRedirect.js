const safeReturnUrl = require('./return-url');

const getLoginRedirectUrl = (user, returnUrl = '') => {
  if (user && user.role === 'admin') {
    return '/admin';
  }

  const safeUrl = safeReturnUrl(returnUrl, '/');
  return safeUrl;
};

module.exports = {
  getLoginRedirectUrl,
};
