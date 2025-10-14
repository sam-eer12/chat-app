import User from "../models/User.js";

// Send friend request
export const sendFriendRequest = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const senderId = req.user._id;

        if (senderId.toString() === receiverId) {
            return res.status(400).json({ success: false, message: "Cannot send friend request to yourself" });
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if already friends
        if (sender.friends.includes(receiverId)) {
            return res.status(400).json({ success: false, message: "Already friends" });
        }

        // Check if request already sent
        if (sender.friendRequestsSent.includes(receiverId)) {
            return res.status(400).json({ success: false, message: "Friend request already sent" });
        }

        // Check if request already received from this user
        if (sender.friendRequestsReceived.includes(receiverId)) {
            return res.status(400).json({ success: false, message: "This user has already sent you a request. Check your requests." });
        }

        // Add to sender's sent requests and receiver's received requests
        sender.friendRequestsSent.push(receiverId);
        receiver.friendRequestsReceived.push(senderId);

        await sender.save();
        await receiver.save();

        res.json({ success: true, message: "Friend request sent successfully" });
    } catch (error) {
        console.log("Error sending friend request:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
    try {
        const { senderId } = req.params;
        const receiverId = req.user._id;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if request exists
        if (!receiver.friendRequestsReceived.includes(senderId)) {
            return res.status(400).json({ success: false, message: "No friend request from this user" });
        }

        // Add to both users' friends list
        sender.friends.push(receiverId);
        receiver.friends.push(senderId);

        // Remove from sent and received requests
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== receiverId.toString());
        receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== senderId.toString());

        await sender.save();
        await receiver.save();

        res.json({ success: true, message: "Friend request accepted" });
    } catch (error) {
        console.log("Error accepting friend request:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Reject friend request
export const rejectFriendRequest = async (req, res) => {
    try {
        const { senderId } = req.params;
        const receiverId = req.user._id;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Remove from sent and received requests
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== receiverId.toString());
        receiver.friendRequestsReceived = receiver.friendRequestsReceived.filter(id => id.toString() !== senderId.toString());

        await sender.save();
        await receiver.save();

        res.json({ success: true, message: "Friend request rejected" });
    } catch (error) {
        console.log("Error rejecting friend request:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get pending friend requests
export const getPendingRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("friendRequestsReceived", "-password");

        res.json({ success: true, requests: user.friendRequestsReceived });
    } catch (error) {
        console.log("Error getting pending requests:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Search users (non-friends only)
export const searchUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const { query } = req.query;

        const user = await User.findById(userId);
        
        // Find users that match the search and are not already friends or have pending requests
        const users = await User.find({
            _id: { 
                $ne: userId, 
                $nin: [...user.friends, ...user.friendRequestsSent, ...user.friendRequestsReceived] 
            },
            $or: [
                { fullName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select("-password").limit(20);

        res.json({ success: true, users });
    } catch (error) {
        console.log("Error searching users:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get sent friend requests
export const getSentRequests = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("friendRequestsSent", "-password");

        res.json({ success: true, requests: user.friendRequestsSent });
    } catch (error) {
        console.log("Error getting sent requests:", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
