import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://example.com/default-profile-picture.png", // Replace with your default image URL
    },
    bio: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    gender: {
        type: String,
        enum:["male","female","other"],
        default: "other",
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: "",
    },
    address: {
        type: String,
        default: "",
    },
    socialLinks: {
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        instagram: {
            type: String,
            default: "",
        },
        linkedin: {
            type: String,
            default: "",
        },
    },

    
    
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;