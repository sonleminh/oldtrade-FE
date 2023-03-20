import React from 'react';
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { MdMarkEmailRead } from 'react-icons/md';

import { Link } from 'react-router-dom';
import axiosClient from '../../../api/axiosClient';

const Verify = () => {
  const BACKGROUND = require('../../../assets/image/login_desktop_background.webp');
  const id = window.location.href.split('/')[4];

  const verify = async () => {
    await axiosClient.put(`/api/verify/${id}`);
  };
  verify();
  return (
    <Box
      backgroundImage={`url(${BACKGROUND})`}
      bgPosition={'bottom'}
      bgSize='50% auto'
      bgRepeat={'no-repeat'}>
      <Box
        w='340px'
        h='250px'
        m={'30px auto'}
        p='30px'
        textAlign={'center'}
        boxShadow='0 0 8px rgb(0 0 0 / 30%)'
        bg='white'
        zIndex={69}>
        <Icon
          as={MdMarkEmailRead}
          mt='30px'
          color='var(--primary)'
          fontSize={'50px'}
        />
        <Text my='15px' color='#222222' fontSize={'15px'}>
          Tài Khoản Của Bạn Đã Được Xác Minh
        </Text>
        <Link to='/login'>
          <Button p='5px' fontWeight={'bold'}>
            Đăng Nhập
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Verify;
