import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { 
    sendFriendRequest, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    getPendingRequests,
    searchUsers,
    getSentRequests
} from "../controllers/friendController.js";

const friendRouter = express.Router();

friendRouter.get("/search", protectRoute, searchUsers);
friendRouter.get("/requests/pending", protectRoute, getPendingRequests);
friendRouter.get("/requests/sent", protectRoute, getSentRequests);
friendRouter.post("/request/:receiverId", protectRoute, sendFriendRequest);
friendRouter.post("/accept/:senderId", protectRoute, acceptFriendRequest);
friendRouter.post("/reject/:senderId", protectRoute, rejectFriendRequest);

export default friendRouter;
