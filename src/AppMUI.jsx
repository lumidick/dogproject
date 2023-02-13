import React from 'react';
import ResponsiveAppBar from './components/AppBar/AppBar';
import { postData } from './posts';
import PostList from './components/PostList/PostList';

const AppMUI = () => {
  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      <PostList data={postData}></PostList>
    </>
  );
};

export default AppMUI;
