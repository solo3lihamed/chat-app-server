import User from '../models/user.model.js';  // Changed to default import
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import dotenv from 'dotenv';
import generateTokenAndSetCookie from '../utils/generateToken.js'; // Import the token generation utility

// export const login = async(req, res) => {
//     try{
//         const {username, password} = req.body;
//         if (!username || !password) {
//             return res.status(400).json({ message: "Username and password are required" });
//         }
//         const user = await User.findOne({ username });
//         if (!user || user.length === 0) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user?.password || '');
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Invalid password" });
//         }
//         // Generate a JWT token and set it in a cookie
//         const token = generateTokenAndSetCookie(user._id, res);
//         res.status(200).json({ message: "Login successful", user, token }); // Include the token in the response

//     }catch (error) {
//         console.error("Error during login:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }

    
// }

export const login = async(req, res) => {
    try {
        const {username, password} = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        
        // Generate a JWT token and set it in a cookie
        const token = generateTokenAndSetCookie(user._id, res);
        
        // Send response without sensitive data
        res.status(200).json({ 
            message: "Login successful", 
            user: user,
            token 
        });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const signup = async(req, res) => {
    try{
        const { fullName,username, email, password , confirmPassword,gender } = req.body;
        if (!fullName ||!username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        // profilePicture is optional, so we can set a default value
        const  boyPorfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`; // Replace with your default image URL
        const girleProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`; // Replace with your default image URL


        // hash the password
        const solt = process.env.SALT || 10; // Use a default salt value if not set in .env
        const passwordHash = await bcrypt.hash(password, parseInt(solt));
       
        const newUser = new User({
            fullName,
            username,
            email,
            password: passwordHash,
            gender,
            profilePicture:gender === "male" ? boyPorfilePicture : girleProfilePicture,
        })
        if(newUser){
            // Generate a JWT token and set it in a cookie
            const token = generateTokenAndSetCookie( newUser._id,res);

            // Save the new user to the database
            await newUser.save();
            res.status(201).json({ message: "User created successfully", user: newUser , token: token  }); // Include the token in the response
            
        
        }



    }catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }

    
}

export const logout = (req, res) => {
    try {
        // Clear the cookie by setting it to an empty value and a past expiration date
        res.cookie('jwt', '', { expires: new Date(0), httpOnly: true });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

