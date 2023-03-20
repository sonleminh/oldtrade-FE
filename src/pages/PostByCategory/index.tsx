import React, { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Flex,
  Text,
  Icon,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Image,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FaUserCircle, FaRegHeart } from 'react-icons/fa';

import { Link, useParams } from 'react-router-dom';
import { getPostByCategory } from '../../Redux/apiRequest';
import moment from 'moment';

const PostByCategory = () => {
  const [postCategory, setPostCategory] = useState<any>();
  const { id } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response: any = await getPostByCategory(id);
        setPostCategory(response?.post);
      } catch (error) {
        console.log('Failed to get post category: ', error);
      }
    };
    getCategory();
  }, [id]);

  return (
    <Box bg='#f4f4f4' p='15px 0 35px 0'>
      <Container w='990px' m='0 auto' px='10px'>
        <Breadcrumb my='10px' fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>{postCategory?.name}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Grid templateColumns='repeat(6, 1fr)' gap={0} textAlign={'start'}>
          <GridItem colSpan={4}>
            <Tabs mt='8px' bg='white'>
              <TabList p='15px 10px 10px 10px' borderBottom={'1px solid #ddd'}>
                <Tab
                  mr='15px'
                  p='5px 8px'
                  bg={'none'}
                  color='#333333'
                  textTransform={'uppercase'}
                  fontWeight={700}
                  _selected={{
                    bg: 'var(--primary)',
                    color: 'white',
                  }}
                  _hover={{ color: 'white' }}>
                  Đang hiển thị (0)
                </Tab>
                <Tab
                  mr='15px'
                  p='5px 8px'
                  bg={'none'}
                  color='#333333'
                  textTransform={'uppercase'}
                  fontWeight={700}
                  _selected={{
                    bg: 'var(--primary)',
                    color: 'white',
                  }}
                  _hover={{ color: 'white' }}>
                  Bị từ chối (0)
                </Tab>
                <Tab
                  mr='15px'
                  p='5px 8px'
                  bg={'none'}
                  color='#333333'
                  textTransform={'uppercase'}
                  fontWeight={700}
                  _selected={{
                    bg: 'var(--primary)',
                    color: 'white',
                  }}
                  _hover={{ color: 'white' }}>
                  Khác (0)
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {postCategory?.postList?.map((item: any, index: number) => (
                    <Link key={index} to={`/post/${item._id}`}>
                      <Flex
                        position='relative'
                        justifyContent={'space-between'}
                        borderTop='1px solid #f4f4f4
                        '
                        key={index}>
                        <Flex
                          key={index}
                          p='7px 10px'
                          justifyContent={'space-between'}>
                          <Image
                            src={item?.image?.[0]?.url}
                            alt='product'
                            boxSize={'120px'}
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
                                <Text
                                  color='#c90927'
                                  fontWeight={600}
                                  fontSize='14px'>
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
                                <Icon
                                  as={FaUserCircle}
                                  mr='5px'
                                  mb='1px'
                                  color='grey'
                                  fontSize='15px'
                                />
                                <Text mr='5px'>Son Le</Text>
                                <Text mr='5px'>
                                  {moment(item.createdAt).fromNow()}
                                </Text>
                                <Text mx='5px'>Đà Nẵng</Text>
                              </Flex>
                            </Flex>
                          </Box>
                        </Flex>
                        <Button
                          position='absolute'
                          right='0'
                          bottom='10px'
                          mr='10px'
                          p='8px'
                          bg='white'
                          color='var(--primary-red)'
                          _hover={{
                            bg: '#e0e0e0',
                          }}
                          fontSize={'18px'}
                          textAlign='center'>
                          <Icon as={FaRegHeart} />
                        </Button>
                      </Flex>
                    </Link>
                  ))}
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default PostByCategory;
