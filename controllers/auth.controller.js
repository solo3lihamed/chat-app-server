import User from '../models/user.model.js';  // Changed to default import
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import dotenv from 'dotenv';

export const login = async(req, res) => {
    
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
        
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });



    }catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }

    
}

export const logout = (req, res) => {
    
}