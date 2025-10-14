# Chat App 💬

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for instant messaging capabilities.

## ✨ Features

### Core Features
- ✅ **Friend request system** - Send, accept, or reject friend requests before chatting
- ✅ **Real-time messaging** - Instant communication powered by Socket.io
- ✅ **User authentication** - Secure JWT-based login and registration
- ✅ **Profile management** - Update name, bio, and profile picture with Cloudinary
- ✅ **Responsive design** - Works seamlessly on desktop and mobile devices
- ✅ **Modern UI** - Beautiful gradient design with Tailwind CSS
- ✅ **Image sharing** - Upload and share images in conversations
- ✅ **Online status** - Real-time online/offline indicators
- ✅ **User search** - Search users by name or email to add as friends
- ✅ **Unseen messages** - Notification badges for unread messages
- ✅ **Message history** - View all past messages with any user
- ✅ **Media gallery** - Browse all shared images in right sidebar
- ✅ **Auto-scroll** - Automatically scroll to newest messages
- ✅ **Image preview** - Preview images before sending
- ✅ **Tabbed interface** - Separate tabs for Chats and Friend Requests

## 🛠️ Tech Stack

### Frontend
- **React** ^19.1.1 - Modern JavaScript library for building user interfaces
- **Vite** ^7.1.7 - Fast build tool and development server
- **Tailwind CSS** ^4.1.14 - Utility-first CSS framework
- **React Router DOM** ^7.9.3 - Client-side routing
- **Socket.io Client** ^4.8.1 - Real-time communication
- **Axios** ^1.12.2 - HTTP client for API requests
- **React Hot Toast** ^2.6.0 - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** ^5.1.0 - Web application framework
- **MongoDB** with **Mongoose** ^8.19.0 - NoSQL database and ODM
- **Socket.io** ^4.8.1 - Real-time bidirectional communication
- **JWT** ^9.0.2 - Secure authentication tokens
- **Bcryptjs** ^3.0.2 - Password hashing
- **Cloudinary** ^2.7.0 - Cloud-based image management
- **CORS** ^2.8.5 - Cross-origin resource sharing

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image uploads)
- npm or yarn package manager

### Quick Start

📖 **For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

1. **Clone the repository**
   ```bash
   git clone https://github.com/sam-eer12/chat-app.git
   cd chat-app
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up server environment**
   Create a `.env` file in the server directory (see `.env.example`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

5. **Install client dependencies** (in new terminal)
   ```bash
   cd client
   npm install
   ```

6. **Set up client environment**
   Create a `.env` file in the client directory (see `.env.example`):
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

7. **Start the client**
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`.

## 📁 Project Structure

```
chat-app/
├── client/                     # React frontend
│   ├── context/               # React Context providers
│   │   ├── AuthContext.jsx   # Authentication & Socket.io
│   │   └── ChatContext.jsx   # Chat messaging state
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── RightSidebar.jsx
│   │   │   └── SideBar.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── assets/          # Images and static files
│   │   ├── lib/             # Utility functions
│   │   └── App.jsx          # Main App component
│   ├── public/              # Static assets
│   └── package.json
│
├── server/                   # Node.js backend
│   ├── controllers/         # Request handlers
│   │   ├── userController.js
│   │   ├── messageController.js
│   │   └── friendController.js    # Friend requests ✨
│   ├── models/              # MongoDB schemas
│   │   ├── User.js          # Updated with friends ✨
│   │   └── message.js
│   ├── routes/              # API routes
│   │   ├── userRoutes.js
│   │   ├── messageRoutes.js
│   │   └── friendRoutes.js        # Friend request routes ✨
│   ├── middleware/          # Custom middleware
│   │   └── auth.js
│   ├── lib/                 # Utilities
│   │   ├── db.js           # MongoDB connection
│   │   ├── cloudinary.js   # Image upload config
│   │   └── utils.js        # JWT generation
│   ├── server.js           # Server entry & Socket.io
│   └── package.json
│
├── SETUP_GUIDE.md               # Detailed setup instructions
├── FRIEND_REQUEST_FEATURE.md    # Friend request system docs ✨
└── README.md                    # Project overview
```

## 🎮 Usage

1. **Register/Login** - Create a new account with email, password, name, and bio
2. **Set up profile** - Upload an avatar and update your bio in the profile page
3. **Add friends** - Switch to "Requests" tab, search for users, and send friend requests
4. **Accept requests** - Check "Requests" tab for pending requests and accept/reject them
5. **Start chatting** - Once friends, they appear in "Chats" tab - click to start messaging
6. **Send messages** - Type messages and press Enter to send
7. **Share images** - Click the gallery icon to upload and share images
8. **Search friends** - Use the search bar in Chats tab to find specific friends
9. **Online status** - See real-time online/offline status of friends
10. **Logout** - Click menu icon > Logout or use the logout button in right sidebar

📖 **For detailed friend request usage, see [FRIEND_REQUEST_FEATURE.md](FRIEND_REQUEST_FEATURE.md)**

## 📱 Screenshots

*Screenshots will be added once screenshots are available*

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sameer Gupta**
- GitHub: [@sam-eer12](https://github.com/sam-eer12)
- LinkedIn: [sameer-gupta-768b28312](https://linkedin.com/in/sameer-gupta-768b28312/)

## 🙏 Acknowledgments

- React team for the amazing framework
- Socket.io for real-time communication capabilities
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the excellent database solution

## 📞 Support

If you have any questions or need help with setup, please open an issue or contact me directly.

---

⭐ Don't forget to give this project a star if you found it helpful!