export const login = (req, res) => {
    res.status(200).json({ message: 'Login successful'});
}

export const signup = async(req, res) => {
    
    try {
        const {fullName, email, password , confirmPassword , gender} = req.body;    
}catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    res.status(200).json({ message: 'Signup successful' });
}




export const logout = (req, res) => {
    // Handle logout logic here
    res.status(200).json({ message: 'Logout successful' });
}

