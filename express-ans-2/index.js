// Middleware function to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    // Check if the user is authenticated
    if (req.isAuth()) {
      // User is authenticated, continue to the next middleware or route handler
      return next();
    }
  
    // User is not authenticated, send an error response
    res.status(401).json({ error: 'Unauthorized' });
};