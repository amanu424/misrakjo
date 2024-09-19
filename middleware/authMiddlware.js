const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        return next(); // User is authenticated, proceed to the next middleware/route
    }
    res.redirect('/login'); // Redirect to login if not authenticated
};

module.exports = isAuthenticated;