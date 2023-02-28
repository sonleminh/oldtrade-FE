import React from 'react';
import Header from '../DefaultLayout/Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const HeaderLayout = () => {
  return (
    <div>
      <Header />
      <Box h='100px'></Box>
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
