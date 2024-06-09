import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
configDotenv();

const verifiedPage = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    console.log('Unauthorized access: Token missing');
    return res.status(401).json({
      success: false,
      message: 'Please login first.',
    });
  }

  // Check for authorization header

  try {
    const info = jwt.verify(token, process.env.SECRET);
    req.user = info;
    next(); // Move the 'next()' call inside the 'try' block
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
    });
  }
};

export default verifiedPage;
