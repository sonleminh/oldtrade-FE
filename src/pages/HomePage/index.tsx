import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Button,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

import { Link } from 'react-router-dom';
import { getAllPostApi, getCategoriesApi } from '../../Redux/apiRequest';
import { useAppDispatch } from '../../Redux/hooks';
import { getAllPost } from '../../Redux/slice/postSlice';

import PostCard from '../../components/PostCard';
import Banner from '../../components/Banner';
import './HomePage.styles.scss';

const Homepage = () => {
  const [postList, setPostList] = useState<any>();
  const [category, setCategory] = useState<any>();
  const dispatch = useAppDispatch();
  console.log('homepage render');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response: any = await getCategoriesApi();
        setCategory(response);
      } catch (error) {
        console.log('Failed to get category list: ', error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response: any = await getAllPostApi();
        setPostList(response);
        dispatch(getAllPost(response));
      } catch (error) {
        console.log('Failed to get post list: ', error);
      }
    };
    getPosts();
  }, [dispatch]);

  const headerCategory = [
    {
      icon: 'sale-star-icon.webp',
      name: 'OldTrade ưu đãi',
    },
    {
      icon: 'sell-phone-icon.webp',
      name: 'Thu mua điện thoại',
    },
    {
      icon: 'liked-icon.webp',
      name: 'Tin đăng đã lưu',
    },
    {
      icon: 'gift-icon.webp',
      name: 'Đăng tin cho tặng',
    },
    {
      icon: 'saved-icon.webp',
      name: 'Tìm kiếm đã lưu',
    },
    {
      icon: 'car-icon.webp',
      name: 'Định giá xe cũ',
    },
  ];

  const randomKeyWord = [
    'Samsung Note 10',
    'Tivi cũ giá rẻ',
    'Thuê Phòng Trọ',
    'Chợ đồ cũ Sài Gòn',
    'Máy quay cũ',
    'Loa Cũ',
    'Điện Thoại Cũ',
    'Điện thoại Samsung',
    'Thuê Căn Hộ Chung Cư',
    'Mua Bán Nhà Đất',
    'Máy tính để bàn giá rẻ',
    'Máy tính để bàn cũ',
    'Laptop Apple Macbook',
    'Điện Thoại iPhone',
    'Máy Tính Bảng Cũ',
  ];

  return (
    <Box className='wrapper' bg={'#f4f4f4'} overflow='hidden'>
      <Container className='container' w={'960px'} m='0 auto'>
        {/* <Container
        w={{
          base: '100%', md: ''
        }}
        m='0 auto'> */}
        <Box bg={'white'} p='12px' mb='10px'>
          <Banner />
          <Flex
            mt={'10px'}
            justifyContent={'space-around'}
            className='header__category'>
            {headerCategory.map((item, index) => (
              <Box key={index} textAlign={'center'}>
                <Image
                  src={require(`../../assets/image/${item.icon}`)}
                  alt='icon'
                  boxSize={'35px'}
                />
                <Text m='0' fontSize={'14px'}>
                  {item.name}
                </Text>
              </Box>
            ))}
          </Flex>
        </Box>
        <Box mb='10px' bg={'white'} textAlign={'center'}>
          <Text
            p={'15px'}
            marginBottom={{ base: '15px', md: '30px' }}
            textAlign={'start'}
            fontSize='17px'
            fontWeight={'700'}>
            Khám phá danh mục
          </Text>
          <Grid templateColumns='repeat(7, 2fr)' gap={6}></Grid>

          {category ? (
            <Grid templateColumns='repeat(7, 2fr)' gap={6} className='category'>
              {category.map((item: any, index: number) => (
                <Link key={index} to={`danh-muc/${item.slug}`}>
                  <GridItem key={index} w='100%'>
                    <Image src={item.icon} alt='icon' boxSize={'85px'} />
                    <Text
                      w={'110px'}
                      h={'36px'}
                      m='5px auto'
                      overflow={'hidden'}
                      textOverflow='ellipsis'
                      lineHeight={'18px'}
                      textAlign={'center'}
                      fontSize={'14px'}>
                      {item.name}
                    </Text>
                  </GridItem>
                </Link>
              ))}
            </Grid>
          ) : (
            <Grid
              templateColumns='repeat(7, 1fr)'
              gap={5}
              justifyContent='space-between'
              pb='10px'>
              <Box>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box bg='white'>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
              <Box bg='white'>
                <Skeleton
                  count={2}
                  width={'70%'}
                  height={30}
                  style={{ margin: '5px 0' }}
                />
              </Box>
            </Grid>
          )}
        </Box>
        <Box bg={'white'}>
          <Text
            p={'15px'}
            textAlign={'start'}
            color='rgb(34, 34, 34)'
            fontSize='17px'
            fontWeight={'700'}
            borderBottom={'2px solid #F4F4F4'}>
            Tin đăng mới
          </Text>
          {postList ? (
            <Grid className='post'>
              {postList?.map((item: any, index: number) => (
                <GridItem key={index} w='100%'>
                  <PostCard item={item} />
                </GridItem>
              ))}
            </Grid>
          ) : (
            <Grid templateColumns='repeat(5, 1fr)' gap={5} pb='10px'>
              <GridItem textAlign={'center'}>
                <Skeleton
                  count={2}
                  width={'90%'}
                  height={180}
                  style={{ margin: '5px 0' }}
                />
              </GridItem>
              <GridItem textAlign={'center'}>
                <Skeleton
                  count={2}
                  width={'90%'}
                  height={180}
                  style={{ margin: '5px 0' }}
                />
              </GridItem>
              <GridItem textAlign={'center'}>
                <Skeleton
                  count={2}
                  width={'90%'}
                  height={180}
                  style={{ margin: '5px 0' }}
                />
              </GridItem>
              <GridItem textAlign={'center'}>
                <Skeleton
                  count={2}
                  width={'90%'}
                  height={180}
                  style={{ margin: '5px 0' }}
                />
              </GridItem>
              <GridItem textAlign={'center'}>
                <Skeleton
                  count={2}
                  width={'90%'}
                  height={180}
                  style={{ margin: '5px 0' }}
                />
              </GridItem>
            </Grid>
          )}
        </Box>
        <Box textAlign={'center'}>
          <Button
            m={'20px'}
            p={'10px 20px'}
            fontSize={'15px'}
            fontWeight='bold'
            borderRadius='20px'
            _hover={{ bg: '#249929d6', cursor: 'pointer' }}>
            Xem thêm
          </Button>
        </Box>
        <Box color={'#9b9b9b'} pb='20px'>
          <Text textAlign={'start'} fontSize='15px' fontWeight={500}>
            Các từ khóa phổ biến
          </Text>
          <Grid templateColumns='repeat(4, 1fr)' fontSize='13px'>
            <GridItem w='100%'>
              <UnorderedList>
                {randomKeyWord.slice(0, 7).map((item, index) => (
                  <ListItem key={index} textAlign='start' my='10px'>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </GridItem>
            <GridItem w='100%'>
              <UnorderedList>
                {randomKeyWord.slice(7, 14).map((item, index) => (
                  <ListItem key={index} textAlign='start' my='10px'>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </GridItem>
            <GridItem w='100%'>
              <UnorderedList>
                {randomKeyWord.slice(4, 11).map((item, index) => (
                  <ListItem key={index} textAlign='start' my='10px'>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </GridItem>
            <GridItem w='100%'>
              <UnorderedList>
                {randomKeyWord.slice(6, 13).map((item, index) => (
                  <ListItem key={index} textAlign='start' my='10px'>
                    {item}
                  </ListItem>
                ))}
              </UnorderedList>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;
