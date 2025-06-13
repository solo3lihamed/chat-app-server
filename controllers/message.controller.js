import express from 'express';
import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';






export const sendMessage = async (req, res) => {
try{
    const {userId} = req.params;
    const {message}=req.body;
    const senderId = req.user._id; // Assuming you have user authentication middleware that sets req.user
   
    if (!userId || !message) {
        return res.status(400).json({ message: "User ID and message content are required" });
    }



   const conversation=await Conversation.findOneAndUpdate(
        { participants: { $all: [senderId, userId] } },
        
    );
    if (!conversation) {
        const newConversation = new Conversation({
            participants: [senderId, userId],
            messages: []
        });
       
    }
    const newMessage = new Message({
        senderId: senderId,
        receiverId: userId,
        content: message,
        conversation: conversation._id
    });
    await newMessage.save();
    conversation.messages.push(newMessage._id);
    await conversation.save();
    // const messages = conversation.populate({path: 'messages', select: 'content senderId receiverId createdAt', options: { sort: { createdAt: 1 } } });
    res.status(200).json({ message: "Message sent successfully", conversation: conversation });
    // Optionally, you can also return the new message
   
    



}catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });


}
}



export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const senderId = req.user._id;

        // Find conversation between logged in user and other user
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userId] }
        }).populate({
            path: 'messages',
            select: 'content senderId receiverId createdAt',
            options: { sort: { createdAt: 1 } } // Sort messages by date ascending
        });

        if (!conversation) {
            return res.status(404).json({ message: "No conversation found" });
        }

        res.status(200).json({
            messages: conversation.messages
        });

    } catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Error getting messages" });
    }
};

