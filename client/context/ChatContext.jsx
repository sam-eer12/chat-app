import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { axios, authUser, socket } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [unseenMessages, setUnseenMessages] = useState({});
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    
    // Friend request states
    const [pendingRequests, setPendingRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoadingRequests, setIsLoadingRequests] = useState(false);
    const [isLoadingSearch, setIsLoadingSearch] = useState(false);

    // Fetch all users for sidebar
    const fetchUsers = async () => {
        setIsLoadingUsers(true);
        try {
            const { data } = await axios.get("/api/messages/user");
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages || {});
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch users");
        } finally {
            setIsLoadingUsers(false);
        }
    };

    // Fetch messages for selected user
    const fetchMessages = async (userId) => {
        setIsLoadingMessages(true);
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages);
                // Clear unseen count for this user
                setUnseenMessages(prev => {
                    const updated = { ...prev };
                    delete updated[userId];
                    return updated;
                });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch messages");
        } finally {
            setIsLoadingMessages(false);
        }
    };

    // Send a message
    const sendMessage = async (receiverId, text, image) => {
        try {
            const { data } = await axios.post(`/api/messages/send/${receiverId}`, {
                text,
                image
            });
            if (data.success) {
                setMessages(prev => [...prev, data.newMessage]);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send message");
        }
    };

    // Listen for new messages via socket
    useEffect(() => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            // If the message is for the currently selected user, add it to messages
            if (selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)) {
                setMessages(prev => [...prev, newMessage]);
            } else {
                // Otherwise, increment unseen message count
                setUnseenMessages(prev => ({
                    ...prev,
                    [newMessage.senderId]: (prev[newMessage.senderId] || 0) + 1
                }));
                toast.success("New message received!");
            }
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, selectedUser]);

    // Fetch users when authenticated
    useEffect(() => {
        if (authUser) {
            fetchUsers();
        }
    }, [authUser]);

    // Fetch messages when user is selected
    useEffect(() => {
        if (selectedUser) {
            fetchMessages(selectedUser._id);
        } else {
            setMessages([]);
        }
    }, [selectedUser]);

    // Friend request functions
    const fetchPendingRequests = async () => {
        setIsLoadingRequests(true);
        try {
            const { data } = await axios.get("/api/friends/requests/pending");
            if (data.success) {
                setPendingRequests(data.requests);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch requests");
        } finally {
            setIsLoadingRequests(false);
        }
    };

    const fetchSentRequests = async () => {
        try {
            const { data } = await axios.get("/api/friends/requests/sent");
            if (data.success) {
                setSentRequests(data.requests);
            }
        } catch (error) {
            console.error("Failed to fetch sent requests");
        }
    };

    const searchUsers = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }
        setIsLoadingSearch(true);
        try {
            const { data } = await axios.get(`/api/friends/search?query=${query}`);
            if (data.success) {
                setSearchResults(data.users);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to search users");
        } finally {
            setIsLoadingSearch(false);
        }
    };

    const sendFriendRequest = async (receiverId) => {
        try {
            const { data } = await axios.post(`/api/friends/request/${receiverId}`);
            if (data.success) {
                toast.success(data.message);
                // Refresh search to remove the user from results
                setSentRequests(prev => [...prev, { _id: receiverId }]);
                setSearchResults(prev => prev.filter(user => user._id !== receiverId));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to send request");
        }
    };

    const acceptFriendRequest = async (senderId) => {
        try {
            const { data } = await axios.post(`/api/friends/accept/${senderId}`);
            if (data.success) {
                toast.success(data.message);
                // Remove from pending requests
                setPendingRequests(prev => prev.filter(user => user._id !== senderId));
                // Refresh users list
                fetchUsers();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to accept request");
        }
    };

    const rejectFriendRequest = async (senderId) => {
        try {
            const { data } = await axios.post(`/api/friends/reject/${senderId}`);
            if (data.success) {
                toast.success(data.message);
                // Remove from pending requests
                setPendingRequests(prev => prev.filter(user => user._id !== senderId));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to reject request");
        }
    };

    // Fetch friend requests when authenticated
    useEffect(() => {
        if (authUser) {
            fetchPendingRequests();
            fetchSentRequests();
        }
    }, [authUser]);

    const value = {
        users,
        selectedUser,
        setSelectedUser,
        messages,
        unseenMessages,
        isLoadingMessages,
        isLoadingUsers,
        fetchUsers,
        sendMessage,
        // Friend requests
        pendingRequests,
        sentRequests,
        searchResults,
        isLoadingRequests,
        isLoadingSearch,
        fetchPendingRequests,
        searchUsers,
        sendFriendRequest,
        acceptFriendRequest,
        rejectFriendRequest,
        setSearchResults
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};
