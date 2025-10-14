import React, { useContext } from 'react'
import assets from '../assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  // Filter messages to get only images
  const mediaMessages = messages.filter(msg => msg.image);

  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  const handleLogout = () => {
    logout();
  };

  return selectedUser && (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden":""}`}>
      <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className='w-20 aspect-[1/1] rounded-full object-cover'  alt="" />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          {isOnline && <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser?.fullName || 'Unknown User'}
        </h1>
        <p className='px-10 mx-auto text-center'>{selectedUser.bio}</p>
      </div>
      <hr  className='border-[#ffffff50] my-4'/>
      <div className='px-5 text-xs pb-24'>
        <p className='mb-2'>Media</p>
        {mediaMessages.length === 0 ? (
          <p className='text-gray-400 text-center py-4'>No media shared yet</p>
        ) : (
          <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {mediaMessages.map((msg)=> (
              <div key={msg._id} onClick={() => window.open(msg.image, '_blank')} className='cursor-pointer rounded'>
                <img src={msg.image} alt="Shared media" className='w-full h-auto rounded-md object-cover' />
              </div>
            ))}
          </div>
        )}
      </div>
      <button 
        onClick={handleLogout}
        className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer hover:opacity-90'
      >
        Logout
      </button>
    </div>
  )
}

export default RightSidebar
