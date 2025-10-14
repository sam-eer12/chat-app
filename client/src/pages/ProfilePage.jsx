import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { authUser, updateProfile}= useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImg){
      await updateProfile({fullName:name,bio});
      navigate('/')
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.onload = async ()=>{
      const base64Image = reader.result;
      await updateProfile({profilePic: base64Image, fullName:name,bio});
      navigate('/')
    }
  }
  return (
    <div className='min-h-screen flex bg-cover bg-no-repeat items-center justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg '>Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e)=>{
              if(e.target.files[0]) {
                setIsUploading(true);
                setSelectedImg(e.target.files[0]);
                setIsUploading(false);
              }
            }} type="file" id="avatar" accept='image/*' hidden />
            <img src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=""  className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}/>
            {isUploading ? 'Uploading image...' : 'Upload Profile Image'}
          </label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" required placeholder='Your name' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />
          <textarea onChange={(e)=>setBio(e.target.value)} value={bio} required placeholder='Your bio' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} />
          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>
        </form>
        <div className='p-4 gap-5 flex flex-col items-center border-l border-gray-600 max-sm:border-0 max-sm:border-t max-sm:w-full'>
          <p>Tap to remove the image</p>
          <img onClick={() => setSelectedImg(null)} src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} alt=""  className={`w-44 h-44 mx-10 cursor-pointer max-sm:mt-10 ${selectedImg && 'rounded-full'}`}/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
