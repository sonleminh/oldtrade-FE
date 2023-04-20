import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const DefaultLayout = () => {
  return (
    <Box position={'relative'}>
      <Header />
      <Box h='100px'></Box>
      <Outlet />
      <Footer />
    </Box>
  );
};

export default DefaultLayout;
