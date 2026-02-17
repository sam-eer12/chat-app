import { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
axios.defaults.withCredentials = true; // IMPORTANT: Add this if using cookies, otherwise optional based on your backend

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // <--- NEW STATE
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      console.log("Auth check failed:", error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false); // <--- STOP LOADING
    }
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);
        localStorage.setItem("token", data.token); // Keep using this if your backend expects it header-based
        axios.defaults.headers.common["token"] = data.token; 
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setAuthUser(null);
    setOnlineUsers([]);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["token"];
    if (socket) socket.disconnect();
    toast.success("Logged out successfully");
  };

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  // Add the token to headers on initial load if it exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, isCheckingAuth, onlineUsers, socket, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};