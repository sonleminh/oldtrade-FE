import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import UserProfile from '../pages/UserProfile';
import { useAppSelector } from '../Redux/hooks';

function Routers() {
  const user = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.post.postList);

  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Homepage />} />
        <Route path='/verify/:id' element={<Verify />} />
      </Route>
      {user._id ? (
        <React.Fragment>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/quan-ly-tin' element={<UserPost user={user} />} />
            <Route path='/profile' element={<UserProfile user={user} />} />
          </Route>
          <Route path='/' element={<HeaderLayout />}>
            <Route path='/dang-tin' element={<Post user={user} />} />
            <Route path='/sua-tin/:id' element={<EditPost />} />
            <Route path='/chat' element={<Chat user={user} />} />
          </Route>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </React.Fragment>
      )}
    </Routes>
  );
}

export default Routers;
