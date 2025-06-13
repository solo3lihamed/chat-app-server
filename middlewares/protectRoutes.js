import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the path as necessary
// Middleware to protect routes by checking JWT token in cookies
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//         console.error("Error during login:", error);
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//         console.error("Error during login:", error);
//         console.error("Error during login:", error);     




export const protectRoutes = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decoded ) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request object





    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}