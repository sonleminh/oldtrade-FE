import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Icon,
  Button,
} from '@chakra-ui/react';
import {
  FaUserCircle,
  FaStar,
  FaPhoneAlt,
  FaComments,
  FaRegHeart,
} from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './PostDetail.styles.scss';
import moment from 'moment';

const PostDetail = () => {
  const [post, setPost] = useState<any>({});
  let { id } = useParams();
  const postTime = moment(post.createdAt).fromNow();

  useEffect(() => {
    const getPostById = async () => {
      try {
        const response: any = await axiosClient.get(`/api/post/${id}`);
        setPost(response);
      } catch (error) {
        console.log('Failed to get post detail: ', error);
      }
    };
    getPostById();
  }, [id]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box bg='#f4f4f4' pb='35px'>
      <Container w='990px' m='0 auto'>
        <Box bg='white' p='25px 0 25px 25px'>
          <Breadcrumb m='5px 0 25px 0' fontSize={'13px'} separator='-'>
            <BreadcrumbItem>
              <Link to='/'>Trang chủ</Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>Tin</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Grid templateColumns='repeat(6, 1fr)' gap={0}>
            <GridItem colSpan={4}>
              <Slider {...settings}>
                {post.image?.map((item: any, index: number) => (
                  <Box key={index} bg='#eee' h='455px' position='relative'>
                    <Image
                      src={item.url}
                      alt='product'
                      h='auto'
                      maxH='455px'
                      mx='auto'
                      objectFit={'cover'}
                    />
                    <Text
                      position='absolute'
                      w='100%'
                      p='6px 10px'
                      bottom='0'
                      bg='#000'
                      color='#f5f5f5'
                      opacity={0.8}
                      textAlign='right'
                      fontSize={'14px'}
                      zIndex={69}>
                      {postTime}
                    </Text>
                  </Box>
                ))}
              </Slider>
              <Text my='15px' fontWeight={'700'}>
                {post.title}
              </Text>
              <Flex
                my='15px'
                alignItems={'center'}
                justifyContent='space-between'>
                <Text
                  fontSize={'17px'}
                  fontWeight={'700'}
                  color='var(--primary-red)'>
                  {post.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                  đ
                </Text>
                <Button
                  rightIcon={<FaRegHeart />}
                  p='7px 10px'
                  bg='white'
                  color='var(--primary-red)'
                  border={'1px solid var(--primary-red)'}
                  borderRadius='15px'>
                  Lưu tin
                </Button>
              </Flex>
              <Text>{post.description}</Text>
            </GridItem>
            <GridItem colSpan={2} mx='12px'>
              <Flex
                py='10px'
                borderTop={'1px solid #ddd'}
                justifyContent='space-between'>
                <Flex>
                  <Icon as={FaUserCircle} color='grey' fontSize='48px' />
                  <Box ml='7px'>
                    <Text
                      color='#333333'
                      fontWeight={700}
                      fontSize='14px'
                      mt='2px'>
                      {post.user?.name}
                    </Text>
                    <Flex color='#9b9b9b' fontSize='11px' alignItems={'center'}>
                      <Text mr='5px' fontSize='30px'>
                        •
                      </Text>{' '}
                      Chưa hoạt động
                    </Flex>
                  </Box>
                </Flex>
                <Button
                  p='15px 12px'
                  h={'20px'}
                  borderRadius='15px'
                  fontSize='10px'>
                  Xem trang
                </Button>
              </Flex>
              <Flex
                my='10px'
                justifyContent={'space-between'}
                textAlign='center'
                alignItems={'center'}>
                <Box w='100%'>
                  <Text>Đánh giá</Text>
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                </Box>
                <Box h='20px' borderLeft={'1px solid #cacaca'}></Box>
                <Box w='100%'>
                  <Text>Phản hồi chat</Text>
                  <Text>96%</Text>
                </Box>
              </Flex>
              <Button
                w='100%'
                my='10px'
                p='10px'
                fontSize={'14px'}
                fontWeight='700'
                justifyContent={'space-between'}>
                <Flex>
                  <Icon as={FaPhoneAlt} m='0 10px 0 5px' fontSize='20px' />
                  <Text mt='2px'>{post.user?.phone}</Text>
                </Flex>
                <Text>SỐ ĐIỆN THOẠI</Text>
              </Button>
              <Button
                w='100%'
                // my='10px'
                p='10px'
                bg='white'
                color='var(--primary)'
                border='1px solid #ccc'
                fontSize={'14px'}
                fontWeight='700'
                justifyContent={'space-between'}>
                <Icon as={FaComments} m='0 10px 0 5px' fontSize='20px' />
                <Text>CHAT VỚI NGƯỜI BÁN</Text>
              </Button>
              <Flex alignItems={'center'}>
                <Image
                  w='100px'
                  src={require('../../assets/image/safe-trade.png')}
                />
                <Box
                  mt='10px'
                  mx='10px'
                  lineHeight={'20px'}
                  fontSize={'13px'}
                  fontStyle='italic'>
                  <Text mb='7px'>
                    Đi cùng 1 người bạn hiểu biết về sản phẩm khi giao dịch.
                  </Text>
                  <a href='/'>Tìm hiểu thêm</a>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default PostDetail;
