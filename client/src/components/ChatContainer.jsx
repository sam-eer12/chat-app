import React, { useEffect, useRef, useState, useContext } from 'react'
import assets from '../assets/assets'
import { formatmessageTime } from '../lib/utils'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const ChatContainer = () => {

  const scrollEnd = useRef()
  const { selectedUser, setSelectedUser, messages, sendMessage, isLoadingMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() =>{
    if(scrollEnd.current){
      scrollEnd.current.scrollIntoView({behavior: 'smooth'})
    }
  },[messages])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = async () => {
    if (!text.trim() && !imagePreview) return;

    await sendMessage(selectedUser._id, text, imagePreview);
    setText('');
    setImagePreview(null);
    setImageFile(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={selectedUser?.profilePic || assets.avatar_icon} className='w-8 rounded-full object-cover' />
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          {selectedUser.fullName}
          {isOnline && <span className='w-2 h-2 rounded-full bg-green-500'></span>}
        </p>
        <img onClick={() => setSelectedUser(null) } src={assets.arrow_icon} alt="" className='md:hidden max-w-7 cursor-pointer' />
        <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
      </div>
      <div className='flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6'>
        {isLoadingMessages ? (
          <p className='text-center text-gray-400 py-4'>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className='text-center text-gray-400 py-4'>No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg)=> {
            const isMyMessage = msg.senderId === authUser._id;
            return (
              <div key={msg._id} className={`flex items-end gap-2 ${isMyMessage ? 'justify-end' : 'justify-start'} `}>
                {msg.image ? (
                  <img className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8 cursor-pointer' src={msg.image} alt="" onClick={() => window.open(msg.image, '_blank')} />
                ):(
                  <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${isMyMessage ? 'rounded-br-none' : 'rounded-bl-none' }`}>{msg.text}</p>
                )}
                <div className='text-center text-xs'>
                  <img src={isMyMessage ? (authUser?.profilePic || assets.avatar_icon) : (selectedUser?.profilePic || assets.avatar_icon)} className='w-7 rounded-full object-cover'/>
                  <p className='text-gray-500'>{formatmessageTime(msg.createdAt)}</p>
                </div>
              </div>
            )
          })
        )}
        <div ref={scrollEnd}></div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
        {imagePreview && (
          <div className='absolute bottom-full left-3 mb-2 p-2 bg-gray-800 rounded-lg'>
            <img src={imagePreview} alt="Preview" className='max-w-[150px] rounded' />
            <button onClick={() => { setImagePreview(null); setImageFile(null); }} className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>×</button>
          </div>
        )}
        <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='send a message...' 
            className='bg-transparent flex-1 text-white placeholder-gray-400 text-sm rounded-lg p-3 outline-none'
          />
          <input type="file" id='image' accept='image/png, image/jpeg, image/jpg' hidden onChange={handleImageChange} />
          <label htmlFor='image'>
            <img src={assets.gallery_icon} alt="" className='w-5 mr-2 cursor-pointer'/>
          </label>
        </div>
        <img onClick={handleSendMessage} src={assets.send_button} alt="" className='w-7 cursor-pointer'/>

      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-w-16' alt="" />
      <p className='text-lg font-medium text-white'>chat anytime</p>
    </div>
  )
}

export default ChatContainer
