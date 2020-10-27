module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        req.flash('error', 'Please login first.');
        return res.redirect('/login');
    }
    next();
}