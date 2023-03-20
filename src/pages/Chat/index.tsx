import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  Icon,
  Flex,
  Input,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  FaUserCircle,
  FaTrashAlt,
  FaPlusCircle,
  FaCircle,
} from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import ChatInfo from './ChatInfo';

import {
  getChatApi,
  getChatByUserApi,
  getMessagesApi,
  getUserApi,
  sendMessageApi,
} from '../../Redux/apiRequest';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import './Chat.styles.scss';
import Message from './Message';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  user: any;
}

const Chat: React.FC<Props> = (props) => {
  const { user } = props;
  let { id } = useParams();

  const [currentChat, setCurrentChat] = useState<any>();
  const [chat, setChat] = useState<any>();
  const [friend, setFriend] = useState<any>();
  const [onlineUser, setOnlineUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>();
  const [newMessage, setNewMessage] = useState<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>();
  const socket = useRef<any>();
  const navigate = useNavigate();

  const scrollRef: any = useRef();

  // useEffect(() => {
  //   socket.current = io('ws://localhost:9000');
  // }, []);

  useEffect(() => {
    socket.current = io('ws://localhost:9000');
    socket.current.on('getMessage', (data: any) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getMesages = async () => {
      try {
        const response: any = await getMessagesApi(currentChat?._id);
        setMessages(response);
      } catch (error) {
        console.log('Failed to get messages: ', error);
      }
    };
    getMesages();
  }, [currentChat]);

  useEffect(() => {
    socket?.current.emit('addUser', user._id);
    // socket?.current.emit('addUser', friend?._id);
    socket?.current.on('getUsers', (users: any) => {
      setOnlineUser(users);
    });
  }, [user._id]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const response: any = await getChatByUserApi(user._id);
        setChat(response);
      } catch (error) {
        console.log('Failed to get chat: ', error);
      }
    };
    getChat();
  }, [user._id, loading]);

  useEffect(() => {
    const getCurrentChat = async () => {
      try {
        const response: any = await getChatApi(id);
        setCurrentChat(response);
      } catch (error) {
        console.log('Failed to get chat: ', error);
      }
    };
    getCurrentChat();
  }, []);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const friendId = currentChat?.members.find((m: any) => m !== user._id);

        const friendData: any = await getUserApi(friendId);
        setFriend(friendData);
      } catch (error) {
        console.log('Failed to get friend: ', error);
      }
    };
    getFriend();
  }, [currentChat]);

  const checkOnline = onlineUser?.find(
    (user: any) => user.userId === friend?._id
  );

  const handleCurrentChat = async (chatData: any) => {
    const friendId = chatData?.members.find((m: any) => m !== user._id);
    const friendData: any = await getUserApi(friendId);
    setFriend(friendData);
    const chat: any = await getChatApi(chatData._id);
    setCurrentChat(chat);
    // setNewMessage('');
    navigate(`/chat/${chatData._id}`);
  };

  const handeSendMessage = async (e: any) => {
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };

    socket.current.emit('sendMessage', {
      senderId: user._id,
      receiverId: friend._id,
      text: newMessage,
    });

    try {
      const response = await sendMessageApi(message);
      setMessages([...messages, response]);
      setLoading(!loading);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e: any) => {
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
    if (e.key === 'Enter') {
      handeSendMessage(message);
      setNewMessage('');
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  var settings = {
    dots: true,
    infinite: true,
    rewind: true,
    autoplay: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box h='calc(100vh - 100px)' bg='#f4f4f4' overflow='hidden'>
      <Container w={'936px'} m='0 auto' bg='white'>
        <Grid templateColumns='repeat(5, 1fr)' gap={0}>
          <GridItem colSpan={2} borderRight='1px solid #ececec'>
            <Text m='15px 5px 20px 5px' color='#222' fontWeight={'700'}>
              Chat
            </Text>
            <Box h='520px' overflowY={'scroll'}>
              {chat?.map((item: any, index: number) => (
                <Box
                  onClick={() => handleCurrentChat(item)}
                  key={index}
                  cursor='pointer'
                  _hover={{
                    bg: '#f4f4f4',
                  }}>
                  <ChatInfo user={user} conversation={item} />
                </Box>
              ))}
            </Box>

            <Flex p='12px 20px' borderTop='1px solid #ececec'>
              <Icon as={FaTrashAlt} fontSize='14px' />
              <Text mx='5px' fontSize='13px' color='#222'>
                Xóa cuộc trò chuyện
              </Text>
            </Flex>
          </GridItem>
          <GridItem colSpan={3}>
            {/* <ChatBox /> */}

            {!friend ? (
              <Box textAlign={'center'} mt='70px' position={'relative'}>
                <Slider {...settings}>
                  <Box maxW='370px'>
                    <Image
                      src={require('../../assets/image/chat-banner2.png')}
                      mx='auto'
                      boxSize='370px'
                      objectFit={'contain'}
                    />
                    <Text
                      position='relative'
                      bottom='50px'
                      color='#222'
                      fontWeight={'700'}>
                      Tích cực chat, chốc lát chốt đơn
                    </Text>
                  </Box>
                  <Box maxW='370px'>
                    <Image
                      src={require('../../assets/image/chat-banner.png')}
                      mx='auto'
                      boxSize='370px'
                      objectFit={'contain'}
                    />
                    <Text
                      position='relative'
                      bottom='40px'
                      color='#222'
                      fontWeight={'700'}>
                      Mẹo! Chat giúp làm sáng tỏ thêm thông tin, tăng hiệu quả
                      mua bán
                    </Text>
                  </Box>
                </Slider>
              </Box>
            ) : (
              <p>
                <Flex
                  mr='5px'
                  p='15px'
                  alignItems={'center'}
                  borderBottom='1px solid #ececec'>
                  <Icon
                    as={FaUserCircle}
                    m='0 10px 0 5px'
                    p='0'
                    fontSize='30px'
                  />
                  <Flex flexDirection={'column'}>
                    <Text fontSize={'15px'} fontWeight={'600'}>
                      {friend?.name}
                    </Text>
                    {typeof checkOnline !== 'undefined' ? (
                      <Flex mt='2px' alignItems={'center'}>
                        <Icon
                          as={FaCircle}
                          mr='8px'
                          fontSize={'7px'}
                          color='#589f39'>
                          .
                        </Icon>
                        <Text fontSize={'12px'}>Đang hoạt động</Text>
                      </Flex>
                    ) : (
                      <Flex mt='2px' alignItems={'center'}>
                        <Icon as={FaCircle} mr='8px' fontSize={'7px'}>
                          .
                        </Icon>
                        <Text fontSize={'12px'}>Không hoạt động</Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
                <Box h='500px' pt='20px' overflowY={'scroll'}>
                  {messages?.map((item: any, index: number) => (
                    <div ref={scrollRef} key={index}>
                      <Message message={item} own={item?.sender === user._id} />
                    </div>
                  ))}
                </Box>
                <Flex p='10px 10px' alignItems={'center'}>
                  <Icon
                    as={FaPlusCircle}
                    m='0 10px 0 5px'
                    p='0'
                    fontSize='20px'
                  />
                  <Input
                    placeholder='Nhập tin nhắn'
                    w='100%'
                    h='30px'
                    px='10px'
                    border='none'
                    borderRadius={'20px'}
                    outline='none'
                    bg='#f4f4f4'
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <Button
                    onClick={(e) => handeSendMessage(e)}
                    bg='none'
                    color={newMessage ? 'var(--primary)' : '#333'}
                    transition='transform 0.2s'
                    _hover={{
                      bg: 'none',
                      transform: 'scale(1.2)',
                    }}>
                    <Icon
                      as={AiOutlineSend}
                      m='0 10px 0 5px'
                      p='0'
                      fontSize='20px'
                    />
                  </Button>
                </Flex>
              </p>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Chat;
