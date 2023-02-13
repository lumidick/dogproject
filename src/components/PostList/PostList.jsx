import React from 'react';
import { Grid } from '@mui/material';
import Post from '../Post/Post';

const PostList = ({ data }) => {
  return (
    <Grid container spacing={5} direction="row" justifyContent="center" alignItems="center">
      {data.map((post) => (
        <Post key={post._id} {...post}></Post>
      ))}
    </Grid>
  );
};

export default PostList;
