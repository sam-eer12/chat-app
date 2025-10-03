# Chat App 💬

A modern, real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) and Socket.io for instant messaging capabilities.

## ✨ Features

- **Real-time messaging** - Instant communication powered by Socket.io
- **User authentication** - Secure login and registration system
- **Profile management** - Customizable user profiles with avatar uploads
- **Responsive design** - Works seamlessly on desktop and mobile devices
- **Modern UI** - Clean and intuitive interface built with React and Tailwind CSS
- **File sharing** - Upload and share images in conversations
- **Online status** - See who's currently online
- **Chat rooms** - Create and join different chat rooms

## 🛠️ Tech Stack

### Frontend
- **React** ^19.1.1 - Modern JavaScript library for building user interfaces
- **Vite** ^7.1.7 - Fast build tool and development server
- **Tailwind CSS** ^4.1.14 - Utility-first CSS framework
- **React Router DOM** ^7.9.3 - Client-side routing

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Socket.io** - Real-time bidirectional event-based communication
- **Mongoose** - MongoDB object modeling

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sam-eer12/chat-app.git
   cd chat-app
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies** (when server is added)
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory and add:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatapp
   JWT_SECRET=your-secret-key
   ```

5. **Start the development servers**
   
   **Client (in client directory):**
   ```bash
   npm run dev
   ```
   
   **Server (in server directory):**
   ```bash
   npm run dev
   ```

The client will run on `http://localhost:5173` and the server on `http://localhost:5000`.

## 📁 Project Structure

```
chat-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── RightSidebar.jsx
│   │   │   └── SideBar.jsx
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ProfilePage.jsx
│   │   ├── assets/         # Images and static files
│   │   ├── lib/            # Utility functions
│   │   └── App.jsx         # Main App component
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Node.js backend (to be added)
└── README.md
```

## 🎮 Usage

1. **Register/Login** - Create a new account or log in with existing credentials
2. **Set up profile** - Upload an avatar and add a bio in the profile page
3. **Start chatting** - Join chat rooms and start messaging other users
4. **Share media** - Upload and share images in your conversations
5. **Stay connected** - See who's online and get real-time notifications

## 📱 Screenshots

*Screenshots will be added once the application is complete*

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