import User from "../models/user.model.js";

export const getAllUsersSideBar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id; // Assuming user ID is stored in req.user

        // Fetch all users except the logged-in user
        const getAllUsersSideBar = await User.find({_id:{$ne:loggedInUserId}}).select('-password -__v') // Exclude password and version field;
    
        res.status(200).json(getAllUsersSideBar);

        
        } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }   