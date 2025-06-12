import jwt from 'jsonwebtoken';


const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'defaultsecret',
        { expiresIn: '100d' } // Token will expire in 1 hour    
    );

    res.cookie('jwt', token, {
        httpOnly: true,
       secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 100 * 24 * 60 * 60 * 1000 // Token will expire in 100 days
    });
    return token;
    
}
export default generateTokenAndSetCookie;
// This function generates a JWT token for the user.




