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
} from '@chakra-ui/react';
import { FaUserCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './UserPost.styles.scss';

import axiosClient from '../../api/axiosClient';
import { Link } from 'react-router-dom';
import { deletePostApi } from '../../Redux/apiRequest';
import moment from 'moment';

interface Props {
  user: any;
}

const UserPost: React.FC<Props> = (props) => {
  const { user } = props;
  const [postsByUser, setPostsByUser] = useState<any>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const getPostByUser = async () => {
      try {
        const response: any = await axiosClient.get(
          `/api/post/user/${user._id}`
        );
        setPostsByUser(response?.post?.postList);
      } catch (error) {
        console.log('Failed to get post list: ', error);
      }
    };
    getPostByUser();
  }, [isLoad, user._id]);

  const handleDeletePost = async (id: any) => {
    try {
      const response: any = await deletePostApi(id);

      if (response.message === 'Delete post successfully') {
        toast.success('Xóa tin thành công!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
      setIsLoad(!isLoad);
    } catch (error) {
      console.error(error);
    }
  };

  const handleContent = () => {
    console.log('content');
  };

  return (
    <Box bg='#f4f4f4' p='15px 0 35px 0'>
      <Container w='990px' m='0 auto'>
        <Breadcrumb my='10px' fontSize={'13px'} separator='-'>
          <BreadcrumbItem>
            <Link to='/'>Trang chủ</Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>Quản lý tin</Text>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box bg='white'>
          <Text p='20px 10px 10px 10px' color='#333333' fontWeight={700}>
            Quản lý tin đăng
          </Text>
          <Flex p='15px 10px' borderY={'1px solid #ddd'}>
            <Icon as={FaUserCircle} color='grey' fontSize='70px' />
            <Box ml='15px' mt='10px'>
              <Text mb='5px' color='#333333' fontWeight={700}>
                {user.name}
              </Text>
              <Flex>
                <Button
                  p='8px 10px'
                  bg='white'
                  color='var(--primary)'
                  border='1px solid var(--primary)'
                  fontSize='14px'
                  _hover={{
                    bg: '#f9f9f9',
                  }}>
                  Trang cá nhân
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Box>
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
              {postsByUser?.map((item: any, index: number) => (
                <Flex justifyContent={'space-between'} key={index}>
                  <Link to={`/post/${item._id}`}>
                    <Flex
                      key={index}
                      p='7px 10px'
                      justifyContent={'space-between'}>
                      <Image
                        src={item?.image?.[0]?.url}
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
                            {/* <Icon
                                  as={FaUserCircle}
                                  mr='5px'
                                  mb='1px'
                                  color='grey'
                                  fontSize='15px'
                                />
                                <Text mr='5px'>Son Le</Text> */}
                            <Text mr='5px'>
                              {moment(item.createdAt).fromNow()}
                            </Text>
                            <Text mx='5px'>Đà Nẵng</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </Link>
                  <Flex alignItems={'center'}>
                    <Link to={`/sua-tin/${item._id}`}>
                      <Button
                        mx='10px'
                        p='8px 10px'
                        bg='white'
                        color='var(--primary)'
                        border='1px solid var(--primary)'
                        _hover={{
                          bg: '#f9f9f9',
                        }}
                        leftIcon={<FaEdit />}>
                        Sửa tin
                      </Button>
                    </Link>
                    <Button
                      mr='10px'
                      p='8px'
                      bg='white'
                      color='grey'
                      _hover={{
                        bg: '#f9f9f9',
                      }}
                      fontSize={'18px'}
                      textAlign='center'
                      onClick={() => {
                        setShowModal(!showModal);
                      }}>
                      <Icon as={FaTrashAlt} />
                    </Button>
                    {showModal ? (
                      <div
                        className='modal'
                        onClick={() => setShowModal(!showModal)}>
                        <div className='modal-content' onClick={handleContent}>
                          <div className='modal-header'>
                            <label
                              htmlFor='control-modal'
                              className='modal-close'
                              onClick={() => setShowModal(!showModal)}>
                              X
                            </label>
                          </div>
                          <div className='modal-body'>
                            <p>Bạn có chắc chắc muốn xóa tin không ?</p>
                          </div>
                          <Flex m='15px' justifyContent={'end'}>
                            <Button
                              mx='5px'
                              p='5px 8px'
                              bg='#df2c4cde'
                              onClick={() => handleDeletePost(item._id)}>
                              Xóa
                            </Button>
                            <Button
                              mx='5px'
                              p='5px 8px'
                              bg={'white'}
                              color='var(--primary)'
                              border='1px solid var(--primary)'
                              onClick={() => setShowModal(!showModal)}
                              _hover={{
                                bg: '#E8E8E8',
                              }}>
                              Không
                            </Button>
                          </Flex>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
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
      </Container>
    </Box>
  );
};

export default UserPost;
