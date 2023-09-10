import React from 'react';
import Navbar from '../NavBar/Navbar';
import UserProfile from '../../features/user/components/UserProfile'

const UserProfilePage = () => {
  return (
    <Navbar>
        <h1 className="text-2xl font-bold">My Profile</h1>
        <UserProfile/>
    </Navbar>
  )
}

export default UserProfilePage;