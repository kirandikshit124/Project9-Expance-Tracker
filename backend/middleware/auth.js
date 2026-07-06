const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = "your_jwt_secret_key"; // Replace with your own secret key

// ---------------------this middleware function will be used to protect routes that require authentication-----------------------
const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header, here authHeader is the Authorization header in the request and it should be in the format "Bearer <token>" 
    const authHeader = req.headers.authorization;
    // Check if the token is present and valid, Bearer token is a type of token that is used to authenticate requests to a server, 
    // it is called "Bearer" because the client must "bear" the token in order to access the protected resource. 
    // The token is usually included in the Authorization header of the HTTP request, and it is prefixed with the word "Bearer" 
    // followed by a space and then the actual token value.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            success: false,
            message: 'Authorization header missing or invalid' 
        });
    }
    // Extract the token from the Authorization header, split the header value by space and get the second part which is the actual token
    const token = authHeader.split(' ')[1];

    // Verify the token and extract the user ID from it, jwt.verify() method is used to verify the token and decode its payload,
    // if the token is valid, it will return the decoded payload which contains the user ID, if the token is invalid or expired, 
    // it will throw an error which will be caught in the catch block below.
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log the decoded token for debugging
        // Find the user in the database using the user ID from the token, User.findById() method is used to find the user in the database by their ID,
        // the select('-password') method is used to exclude the password field from the returned user object, 
        // this is done for security reasons so that the password is not sent back to the client in the response.
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password from the user object
        console.log("User found:", user); // Log the user object for debugging
        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'User not found' 
            });
        }
        // Attach the user object to the request object for use in subsequent middleware or route handlers
        req.user = user;
        // Call the next middleware or route handler in the stack
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
}

module.exports = authMiddleware;