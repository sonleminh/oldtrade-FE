import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';

import DefaultLayout from '../layout/DefaultLayout';
import HeaderLayout from '../layout/HeaderLayout';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Verify from '../pages/Auth/Verify';
import Chat from '../pages/Chat';
import EditPost from '../pages/EditPost/EditPost';
import Homepage from '../pages/HomePage';
import Post from '../pages/Post';
import PostDetail from '../pages/PostDetail';
import UserPost from '../pages/UserPost';
import Profile from '../pages/Profile';
import UserProfile from '../pages/UserProfile';
import PostByCategory from '../pages/PostByCategory';
import ChangePass from '../pages/ChangePass';

function Routers() {
  const user = useAppSelector((state) => state.user);

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Homepage />} />
        <Route path='/verify/:id' element={<Verify />} />
        <Route path='/user/:id' element={<UserProfile />} />
        <Route path='/danh-muc/:id' element={<PostByCategory />} />
        <Route path='/post/:id' element={<PostDetail user={user} />} />
      </Route>
      {user._id ? (
        <React.Fragment>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/post/:id' element={<PostDetail user={user} />} />
            <Route path='/quan-ly-tin' element={<UserPost user={user} />} />
            <Route path='/profile' element={<Profile user={user} />} />
            <Route path='/user/:id' element={<UserProfile />} />
            <Route
              path='/changepass'
              element={<ChangePass userId={user._id} />}
            />
          </Route>
          <Route path='/' element={<HeaderLayout />}>
            <Route path='/dang-tin' element={<Post user={user} />} />
            <Route path='/sua-tin/:id' element={<EditPost />} />
            <Route path='/chat' element={<Chat user={user} />} />
            <Route path='/chat/:id' element={<Chat user={user} />} />
          </Route>
        </React.Fragment>
      ) : (
        <Route path='/' element={<DefaultLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post/:id' element={<PostDetail user={user} />} />
        </Route>
      )}
    </Routes>
  );
}

export default Routers;
