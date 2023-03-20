import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Container,
  Image,
  Icon,
  Flex,
  Input,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import {
  FaHome,
  FaRegAddressBook,
  FaRegComments,
  FaRegBell,
  FaUserCircle,
  FaRegEdit,
  FaSearch,
  FaCaretDown,
} from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { logout } from '../../../Redux/slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Header = () => {
  const user = useAppSelector((state) => state.user);
  const posts = useAppSelector((state) => state.post.postList);
  const [show, setShow] = useState<boolean>(false);
  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>();

  const LOGO = require('../../../assets/image/oldtrade-logo.png');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let searchRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  let menuRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let handle = (e: any) => {
      if (!searchRef.current.contains(e.target)) {
        setShowSearchResult(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, []);

  useEffect(() => {
    let handle = (e: any) => {
      if (!menuRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
    };
  }, []);

  const search = (e: any) => {
    if (!e.target.value) return setShowSearchResult(false);
    setShowSearchResult(true);
    setSearchResult(
      posts.filter((item: any) => {
        return item.title.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const handleLogout = (e: any) => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <Box position={'fixed'} top='0' w='100%' bg={'#5cc560'} zIndex='69'>
        <Container w={'960px'} m='0 auto' p='0 12px'>
          <VStack spacing={0}>
            <HStack
              w={'100%'}
              h={'52px'}
              justifyContent='space-between'
              alignItems={'center'}>
              <Link to='/'>
                <Image src={LOGO} w='100px' />
              </Link>
              <Flex gap={'30px'}>
                <Link to='/'>
                  <Flex
                    color={'white'}
                    alignItems='center'
                    _hover={{
                      opacity: 0.6,
                    }}>
                    <Icon as={FaHome} m='0 8px' p='0' fontSize='22px' />
                    Trang chủ
                  </Flex>
                </Link>
                <Link to={user._id ? '/quan-ly-tin' : '/login'}>
                  <Flex
                    color={'white'}
                    alignItems='center'
                    _hover={{
                      opacity: 0.6,
                    }}>
                    <Icon
                      as={FaRegAddressBook}
                      m='0 8px'
                      p='0'
                      fontSize='22px'
                    />
                    Quản lý tin
                  </Flex>
                </Link>
                <Link to={user._id ? 'chat' : 'login'}>
                  <Flex
                    color={'white'}
                    alignItems='center'
                    _hover={{
                      opacity: 0.6,
                    }}>
                    <Icon as={FaRegComments} m='0 8px' p='0' fontSize='22px' />
                    Chat
                  </Flex>
                </Link>
                <Link to='/'>
                  <Flex
                    color={'white'}
                    alignItems='center'
                    _hover={{
                      opacity: 0.6,
                    }}>
                    <Icon as={FaRegBell} m='0 8px' p='0' fontSize='22px' />
                    Thông báo
                  </Flex>
                </Link>

                <Flex alignItems={'center'} ref={menuRef}>
                  {!user.name ? (
                    <Link
                      to='/login'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'white',
                      }}>
                      <Flex
                        alignItems={'center'}
                        _hover={{
                          opacity: 0.6,
                        }}>
                        <Icon
                          as={FaUserCircle}
                          m='0 8px'
                          p='0'
                          fontSize='22px'
                        />
                        <Text>Đăng nhập</Text>
                      </Flex>
                    </Link>
                  ) : (
                    <Flex
                      color={'white'}
                      alignItems={'center'}
                      position='relative'
                      cursor={'pointer'}
                      onClick={() => setShow(!show)}>
                      <Icon as={FaUserCircle} mr='10px' fontSize='22px' />
                      <Text mr='5px'>{user.name}</Text>
                      <Icon as={FaCaretDown} />
                      {show ? (
                        <UnorderedList
                          position={'absolute'}
                          top='36px'
                          right={0}
                          w={'150px'}
                          bg={'white'}
                          listStyleType='none'
                          textAlign={'left'}
                          zIndex='69'>
                          <Link to='profile'>
                            <ListItem
                              p={'10px 20px'}
                              _hover={{
                                bg: '#E8E8E8',
                              }}>
                              <Flex alignItems={'center'} cursor='pointer'>
                                <Icon
                                  as={FaUserCircle}
                                  mr='10px'
                                  color='grey'
                                  fontSize='22px'
                                />
                                <Text color='#222222'>Tài khoản</Text>
                              </Flex>
                            </ListItem>
                          </Link>
                          <ListItem
                            onClick={handleLogout}
                            p={'10px 20px'}
                            _hover={{
                              bg: '#E8E8E8',
                            }}>
                            <Flex alignItems={'center'} cursor='pointer'>
                              <Icon
                                as={BiLogOut}
                                mr='10px'
                                color='grey'
                                fontSize='22px'
                              />
                              <Text color='#222222'>Đăng xuất</Text>
                            </Flex>
                          </ListItem>
                        </UnorderedList>
                      ) : (
                        <></>
                      )}
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </HStack>
            <HStack w='100%' h='48px' alignItems={'start'}>
              <InputGroup alignItems={'center'} ref={searchRef}>
                <Input
                  variant='unstyled'
                  placeholder='Tìm kiếm trên OldTrade'
                  position={'relative'}
                  w={'calc(100% - 15px)'}
                  h='36px'
                  p='0 10px'
                  border='none'
                  outline={'none'}
                  borderRadius={'5px'}
                  onChange={(e: any) => search(e)}
                />
                <InputRightElement top={'5px'} right='20px'>
                  <Button p={'5px 15px'} fontSize='16px' borderRadius='3px'>
                    <Icon as={FaSearch} />
                  </Button>
                </InputRightElement>
                <Box
                  position='absolute'
                  top='42px'
                  w={'calc(100% - 15px)'}
                  mr='15px'
                  boxShadow={
                    ' 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
                  }
                  bg='white'>
                  {showSearchResult ? (
                    searchResult?.map((item: any, index: number) => (
                      <Flex key={index} my='5px' p='7px 10px'>
                        <Image
                          src={item?.image?.[0]?.url}
                          alt='product'
                          boxSize={'50px'}
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
                          </Flex>
                        </Box>
                        <Flex
                          alignItems={'center'}
                          color='rgb(155, 155, 155)'
                          fontSize='12px'>
                          <Text mr='5px'>
                            {moment(item.createdAt).fromNow()}
                          </Text>
                          <Text mx='5px'>Đà Nẵng</Text>
                        </Flex>
                      </Flex>
                    ))
                  ) : (
                    <></>
                  )}
                </Box>
              </InputGroup>
              <Link to={!user.name ? 'login' : 'dang-tin'}>
                <Button
                  leftIcon={<FaRegEdit fontSize={'20px'} />}
                  h='36px'
                  p='5px 15px'
                  alignItems='center'
                  fontSize='14px'
                  fontWeight={'bold'}
                  border={'1px solid '}>
                  <Text pt='3px'>ĐĂNG TIN</Text>
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </div>
  );
};

export default Header;
