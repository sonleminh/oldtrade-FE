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
import { FaUserCircle, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import Conversation from '../../components/Conversation';
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
import Message from '../../components/Message';

interface Props {
  user: any;
}

const Chat: React.FC<Props> = (props) => {
  const [currentChat, setCurrentChat] = useState<any>();
  const [chat, setChat] = useState<any>();
  const [friend, setFriend] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const [newMessage, setNewMessage] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = props;

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

  const handleCurrentChat = async (chatData: any) => {
    const friendId = chatData?.members.find((m: any) => m !== user._id);
    const friendData: any = await getUserApi(friendId);
    setFriend(friendData);
    const chat: any = await getChatApi(chatData._id);
    setCurrentChat(chat);
  };

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

  const handeSendMessage = async (e: any) => {
    const message = {
      conversationId: currentChat._id,
      sender: user._id,
      text: newMessage,
    };
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
      // 👇 Get input value
      handeSendMessage(message);
      setNewMessage('');
    }
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
                  <Conversation user={user} conversation={item} />
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
              <React.Fragment>
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
                      {friend.name}
                    </Text>
                    <Text fontSize={'12px'}>Đang hoạt động</Text>
                  </Flex>
                </Flex>
                <Box h='500px' pt='20px' overflowY={'scroll'}>
                  {messages?.map((item: any, index: number) => (
                    <Message
                      key={index}
                      message={item}
                      own={item?.sender === user._id}
                    />
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
              </React.Fragment>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Chat;
