// utils/auth.js
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    console.log('User not logged in, redirecting to login.'); // Debugging log
    res.redirect('/login');
  } else {
    console.log('User logged in, proceeding to dashboard.'); // Debugging log
    next();
  }
};

module.exports = withAuth;
