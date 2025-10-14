import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketMap } from "../server.js";

export const getUserForSidebar = async (req,res)=>{
    try {
        const userId = req.user._id;
        const currentUser = await User.findById(userId);
        
        // Only show friends in the sidebar
        const filterdUsers = await User.find({_id: {$in: currentUser.friends}}).select("-password");
        const unseenMessages = {};
        const promises = filterdUsers.map(async (user)=>{
            const messages = await Message.find({senderId:user._id, receiverId:userId, seen:false});
            if(messages.length>0){
                unseenMessages[user._id] = messages.length;
            }
        })
        await Promise.all(promises);
        res.status(200).json({success:true, users:filterdUsers, unseenMessages});
    } catch (error) {
        console.log("Error fetching users for sidebar:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId: myId, receiverId: selectedUserId},
                {senderId: selectedUserId, receiverId: myId},
            ]
        })
        await Message.updateMany({senderId: selectedUserId, receiverId: myId}, {seen:true});
        res.status(200).json({success:true, messages});
    } catch (error) {
        console.log("Error fetching messages:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const markMessagesAsSeen = async (req,res)=>{
    try {
        const {id} = req.params;
        await Message.findByIdAndUpdate(id, {seen:true});
        res.status(200).json({success:true, message: "Message marked as seen" });
    } catch (error) {
        console.log("Error marking messages as seen:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req,res)=> {
    try {
        const {text, image} = req.body;
        const receiverId = req.params.id;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId, receiverId, text, image: imageUrl
        })

        const receiverSocketId = userSocketMap[receiverId];
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({success:true, newMessage});
    } catch (error) {
        console.log("Error sending message:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}