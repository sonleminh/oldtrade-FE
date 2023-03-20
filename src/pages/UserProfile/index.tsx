import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Container,
  Flex,
  Text,
  Icon,
  Image,
} from '@chakra-ui/react';
import {
  FaUserCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaRegHeart,
} from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import '../UserPost/UserPost.styles.scss';

import axiosClient from '../../api/axiosClient';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

const UserProfile = () => {
  const { id } = useParams();
  const [userPost, setUserPost] = useState<any>([]);
  const [postsByUser, setPostsByUser] = useState<any>([]);
  moment.locale('vi');
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response: any = await axiosClient.get(`/api/user/${id}`);
        setUserPost(response);
      } catch (error) {
        console.log('Failed to get user by id: ', error);
      }
    };
    getUserById();
  }, [id]);

  useEffect(() => {
    const getPostByUser = async () => {
      try {
        const response: any = await axiosClient.get(`/api/post/user/${id}`);
        setPostsByUser(response?.post?.postList);
      } catch (error) {
        console.log('Failed to get post list: ', error);
      }
    };
    getPostByUser();
  }, [id]);
  console.log(postsByUser);

  return (
    <Box bg='#f4f4f4' p='15px 0 35px 0'>
      <Container w='990px' m='0 auto'>
        <Breadcrumb my='10px' fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>Quản lý hồ sơ</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box
          mb='15px'
          bg='white'
          boxShadow='0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
          borderRadius={'4px'}>
          <Flex p='15px 15px'>
            <Flex w='50%'>
              <Icon as={FaUserCircle} color='grey' fontSize='70px' />
              <Box ml='15px' mt='10px'>
                <Text mb='10px' color='#333333' fontWeight={700}>
                  {userPost.name}
                </Text>
                <Flex>
                  <Button
                    p='8px 25px'
                    bg='var(--primary)'
                    fontSize='14px'
                    borderRadius='15px'>
                    + <Text ml='8px'>Theo dõi</Text>
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Box w='50%' color='#282f39'>
              <Flex
                mt='10px'
                fontSize={'14px'}
                color='#9b9b9b'
                alignItems={'center'}>
                <Icon as={FaCalendarAlt} mx='8px' fontSize='20px' />
                <Text>Ngày tham gia:</Text>
                <Text ml='10px' color='#222'>
                  {moment(userPost.createdAt).format('L')}
                </Text>
              </Flex>
              <Flex
                mt='10px'
                fontSize={'14px'}
                color='#9b9b9b'
                alignItems={'center'}>
                <Icon as={FaMapMarkerAlt} mx='8px' fontSize='20px' />
                <Text>Địa chỉ:</Text>{' '}
                {typeof userPost.address === 'undefined' ? (
                  <Text ml='10px' color='#222'>
                    Chưa cung cấp
                  </Text>
                ) : (
                  <Text ml='10px' color='#222'>
                    {userPost.address}
                  </Text>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box
          bg='white'
          boxShadow='0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
          borderRadius={'4px'}>
          <Text
            mx='15px'
            p='20px 0 15px 0'
            color='#333333'
            fontSize={'18px'}
            fontWeight='700'
            borderBottom='1px solid #eee'>
            Tin đang đăng
          </Text>
          {postsByUser?.map((item: any, index: number) => (
            <Flex
              m='0 10px'
              py='15px'
              justifyContent={'space-between'}
              key={index}>
              <Link to={`/post/${item._id}`} key={index}>
                <Flex key={index} p='7px 10px' justifyContent={'space-between'}>
                  <Image
                    src={item?.image?.[0].url}
                    alt='product'
                    boxSize={'100px'}
                    objectFit='cover'
                  />
                  <Box ml='12px'>
                    <Flex
                      w='100%'
                      h='100%'
                      flexDirection={'column'}
                      justifyContent={'space-between'}>
                      <Box>
                        <Text mb='5px' color='#333'>
                          {item.title}
                        </Text>
                        <Text color='#c90927' fontWeight={600} fontSize='14px'>
                          {item.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                          đ
                        </Text>
                      </Box>
                      <Flex
                        alignItems={'center'}
                        color='rgb(155, 155, 155)'
                        fontSize='12px'>
                        <Text>{moment(item.createdAt).fromNow()}</Text>
                        <Icon as={BsDot} fontSize='10px' />
                        <Text>{item?.address?.city}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
              </Link>
              <Flex alignItems={'center'}>
                <Link to={`/post/${item._id}`}>
                  <Button mx='10px' p='8px 20px' bg='var(--primary)'>
                    Xem tin
                  </Button>
                </Link>
                <Button
                  mr='10px'
                  p='8px'
                  bg='white'
                  color='grey'
                  _hover={{
                    bg: '#e0e0e0',
                  }}
                  fontSize={'18px'}
                  textAlign='center'>
                  <Icon as={FaRegHeart} color='var(--primary-red)' />
                </Button>
              </Flex>
            </Flex>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
