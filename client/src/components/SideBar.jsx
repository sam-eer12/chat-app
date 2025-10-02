import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const SideBar = ({selectedUser, setSelectedUser}) => {

    const navigate = useNavigate();
  return (
    <div className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white  ${selectedUser ? "max-md:hidden" : ""} `}>
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
                    <p className='cursor-pointer text-sm'>Logout</p>
                </div>
            </div>
        </div>
        <div className='bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
            <img src={assets.search_icon} alt='search' className='max-w-3 ' />
            <input type='text' className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1' placeholder='Search User'></input>
        </div>
        </div>
        <div className='flex flex-col'>
            {userDummyData.map((user , index)=>(
                <div key={index} className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-[#282142] ${selectedUser === user ? "bg-[#282142]" : ""}`} onClick={() => setSelectedUser(user)}>
                    <img src={user.profilePic} alt={user.fullName} className='w-10 h-10 rounded-full' />
                    <div className='flex flex-col'>
                        <span className='text-sm font-medium'>{user.fullName}</span>
                        <span className='text-xs text-gray-400'>{user.bio}</span>
                    </div>
                </div>
            ))}

        </div>
    </div>
  )
}

export default SideBar
