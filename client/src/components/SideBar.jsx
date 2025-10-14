import React, { useState, useContext } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const SideBar = () => {

    const navigate = useNavigate();
    const { 
        users, selectedUser, setSelectedUser, unseenMessages, isLoadingUsers,
        pendingRequests, searchResults, isLoadingRequests, isLoadingSearch,
        searchUsers, sendFriendRequest, acceptFriendRequest, rejectFriendRequest,
        setSearchResults
    } = useContext(ChatContext);
    const { logout, onlineUsers } = useContext(AuthContext);
    
    const [activeTab, setActiveTab] = useState('chats'); // 'chats' or 'requests'
    const [searchQuery, setSearchQuery] = useState('');

    // Filter users based on search query (for chats tab)
    const filteredUsers = users.filter(user => 
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleLogout = () => {
        logout();
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (activeTab === 'requests') {
            searchUsers(query);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchQuery('');
        setSearchResults([]);
    };

  return (
    <div className={`bg-[#8185B2]/10 h-full p-3 rounded-r-xl overflow-y-scroll text-white  ${selectedUser ? "max-md:hidden" : ""} `}>
        <div className='pb-5'>
            <div className='flex justify-between items-center'>
                <img src={assets.logo} alt='logo' className='max-w-40' />
                <div className='relative py-2 group'>
                    <img src={assets.menu_icon} alt='logo' className='max-w-5 cursor-pointer' />
                    <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                        <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm'>
                            Edit Profile
                        </p>
                        <hr className='my-2 border-t border-gray-500'/>
                        <p onClick={handleLogout} className='cursor-pointer text-sm'>Logout</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className='flex gap-2 mt-4 mb-3'>
                <button 
                    onClick={() => handleTabChange('chats')}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                        activeTab === 'chats' 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-[#282142] text-gray-400 hover:text-white'
                    }`}
                >
                    Chats
                </button>
                <button 
                    onClick={() => handleTabChange('requests')}
                    className={`relative flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                        activeTab === 'requests' 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-[#282142] text-gray-400 hover:text-white'
                    }`}
                >
                    Requests
                    {pendingRequests.length > 0 && (
                        <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
                            {pendingRequests.length}
                        </span>
                    )}
                </button>
            </div>

            {/* Search Bar */}
            <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4'>
                <img src={assets.search_icon} alt='search' className='max-w-3 ' />
                <input 
                    type='text' 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' 
                    placeholder={activeTab === 'chats' ? 'Search Friends' : 'Search Users to Add'}
                />
            </div>
        </div>

        {/* Content based on active tab */}
        <div className='flex flex-col'>
            {activeTab === 'chats' ? (
                // Chats Tab
                <>
                    {isLoadingUsers ? (
                        <p className='text-center text-gray-400 py-4'>Loading friends...</p>
                    ) : filteredUsers.length === 0 ? (
                        <div className='text-center text-gray-400 py-4'>
                            <p className='mb-2'>No friends yet</p>
                            <p className='text-xs'>Switch to Requests tab to add friends</p>
                        </div>
                    ) : (
                        filteredUsers.map((user)=>{
                            const isOnline = onlineUsers.includes(user._id);
                            const unreadCount = unseenMessages[user._id] || 0;
                            
                            return (
                                <div onClick={() => setSelectedUser(user)} key={user._id} className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm hover:bg-[#282142]/30 ${selectedUser?._id === user._id && 'bg-[#282142]/50'} `}>
                                    <img src={user?.profilePic || assets.avatar_icon} alt={user.fullName} className='w-[35px] aspect-[1/1] rounded-full object-cover' />
                                    <div className='flex flex-col leading-5'>
                                        <p className='text-sm pr-2'>{user.fullName}</p>
                                        {
                                            isOnline
                                            ? <span className='text-xs text-green-400'>Online</span>
                                            : <span className='text-xs text-neutral-400'>Offline</span>
                                        }
                                    </div>
                                    {
                                        unreadCount > 0 && <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50'>
                                            {unreadCount}</p>
                                    }
                                </div>
                            )
                        })
                    )}
                </>
            ) : (
                // Requests Tab
                <>
                    {/* Pending Requests Section */}
                    {pendingRequests.length > 0 && (
                        <div className='mb-4'>
                            <h3 className='text-xs text-gray-400 mb-2 px-2'>Pending Requests</h3>
                            {pendingRequests.map((user) => (
                                <div key={user._id} className='flex items-center gap-2 p-2 pl-4 rounded mb-2 bg-[#282142]/30'>
                                    <img src={user?.profilePic || assets.avatar_icon} alt={user.fullName} className='w-[35px] aspect-[1/1] rounded-full object-cover' />
                                    <div className='flex-1'>
                                        <p className='text-sm'>{user.fullName}</p>
                                        <p className='text-xs text-gray-400'>{user.email}</p>
                                    </div>
                                    <div className='flex gap-1'>
                                        <button 
                                            onClick={() => acceptFriendRequest(user._id)}
                                            className='bg-green-600 hover:bg-green-700 text-white text-xs px-2 py-1 rounded'
                                        >
                                            ✓
                                        </button>
                                        <button 
                                            onClick={() => rejectFriendRequest(user._id)}
                                            className='bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded'
                                        >
                                            ✗
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Search Results Section */}
                    {searchQuery && (
                        <div>
                            <h3 className='text-xs text-gray-400 mb-2 px-2'>Search Results</h3>
                            {isLoadingSearch ? (
                                <p className='text-center text-gray-400 py-4'>Searching...</p>
                            ) : searchResults.length === 0 ? (
                                <p className='text-center text-gray-400 py-4'>No users found</p>
                            ) : (
                                searchResults.map((user) => (
                                    <div key={user._id} className='flex items-center gap-2 p-2 pl-4 rounded mb-2 hover:bg-[#282142]/30'>
                                        <img src={user?.profilePic || assets.avatar_icon} alt={user.fullName} className='w-[35px] aspect-[1/1] rounded-full object-cover' />
                                        <div className='flex-1'>
                                            <p className='text-sm'>{user.fullName}</p>
                                            <p className='text-xs text-gray-400'>{user.email}</p>
                                        </div>
                                        <button 
                                            onClick={() => sendFriendRequest(user._id)}
                                            className='bg-violet-600 hover:bg-violet-700 text-white text-xs px-3 py-1 rounded-full'
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Empty state */}
                    {!searchQuery && pendingRequests.length === 0 && (
                        <div className='text-center text-gray-400 py-8'>
                            <p className='text-sm mb-2'>No pending requests</p>
                            <p className='text-xs'>Search for users to add as friends</p>
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default SideBar
