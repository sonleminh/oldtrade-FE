import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Header from '../DefaultLayout/Header';

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
