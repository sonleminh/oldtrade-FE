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
  FaEdit,
  FaTrashAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { deletePostApi } from '../../Redux/apiRequest';
import { toast } from 'react-toastify';
import '../UserPost/UserPost.styles.scss';

interface Props {
  user: any;
}

const UserProfile: React.FC<Props> = (props) => {
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
  }, [isLoad]);

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
                      bg: '#e0e0e0',
                    }}>
                    Chỉnh sửa cá nhân
                  </Button>
                </Flex>
              </Box>
            </Flex>
            <Box w='50%' color='#282f39'>
              <Box mt='10px'>
                <Text fontSize={'14px'}>
                  <Icon as={FaCalendarAlt} mx='8px' fontSize='20px' />
                  Ngày tham gia: 20/02/2020
                </Text>
              </Box>
              <Box mt='10px'>
                <Text fontSize={'14px'}>
                  <Icon as={FaMapMarkerAlt} mx='8px' fontSize='20px' />
                  Địa chỉ: Tô Hiến Thành, Phước Mỹ, Sơn Trà, Đà Nẵng
                </Text>
              </Box>
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
            <Flex m='0 10px' py='15px' justifyContent={'space-between'}>
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
                        <Text mr='5px'>2 phút trước</Text>
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
                      bg: '#e0e0e0',
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
                    bg: '#e0e0e0',
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
                    <div className='modal-content'>
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
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
