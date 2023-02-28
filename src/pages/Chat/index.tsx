import {
  Box,
  Container,
  Grid,
  GridItem,
  Text,
  VStack,
  Icon,
  Flex,
  Input,
} from '@chakra-ui/react';
import { FaUserCircle, FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Conversation from '../../components/Conversation';
import { getMessagesApi, getUserApi } from '../../Redux/apiRequest';

interface Props {
  user: any;
}

const Chat: React.FC<Props> = (props) => {
  const [currentChat, setCurrentChat] = useState<any>();
  const [conversation, setConversation] = useState<any>();
  const [friend, setFriend] = useState<any>();
  const [messages, setMessages] = useState<any>();
  const { user } = props;

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response: any = await axiosClient.get(
          `/api/conversation/${user._id}`
        );
        setConversation(response);
      } catch (error) {
        console.log('Failed to get conversation: ', error);
      }
    };
    getConversation();
  }, [user._id]);

  const handleCurrentChat = async (currentChat: any) => {
    const friendId = currentChat?.members.find((m: any) => m !== user._id);
    const response: any = await getUserApi(friendId);
    setCurrentChat(response);
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

  return (
    <Box h='calc(100vh - 100px)' bg='#f4f4f4' overflow='hidden'>
      <Container w={'936px'} m='0 auto' bg='white'>
        <Grid templateColumns='repeat(5, 1fr)' gap={0}>
          <GridItem colSpan={2} borderRight='1px solid #ececec'>
            <Text m='15px 5px 20px 5px' color='#222' fontWeight={'700'}>
              Chat
            </Text>
            <Box h='520px' overflowY={'scroll'}>
              {conversation?.map((item: any, index: number) => (
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
            {!currentChat }
            <React.Fragment>
              <Flex
                mr='5px'
                p='15px'
                alignItems={'center'}
                borderBottom='1px solid #ececec'>
                <Icon as={FaUserCircle} m='0 10px 0 5px' p='0' fontSize='30px' />
                <Flex flexDirection={'column'}>
                  <Text fontSize={'15px'} fontWeight={'600'}>
                    {friend?.name}
                  </Text>
                  <Text fontSize={'12px'}>Đang hoạt động</Text>
                </Flex>
              </Flex>
              <Box h='495px' pt='20px' overflowY={'scroll'}>
                <Flex>
                  <Flex
                    maxW='65%'
                    m='15px 10px'
                    p='10px 12px'
                    bg='#f4f4f4'
                    borderRadius={'8px'}
                    flexDirection='column'>
                    <Text mb='5px' color='#222' fontSize={'15px'}>
                      Điện thoại này còn không?
                    </Text>
                    <Text fontSize={'12px'} color='#bdc1c9'>
                      10:59
                    </Text>
                  </Flex>
                </Flex>
                <Flex justifyContent={'end'}>
                  <Flex
                    maxW='65%'
                    m='15px 10px'
                    p='10px 12px'
                    bg='#f4f4f4'
                    borderRadius={'8px'}
                    flexDirection='column'
                    textAlign='right'>
                    <Text mb='5px' color='#222' fontSize={'15px'}>
                      Vẫn còn ạ aaaaaaaaaaaaaaaaaaaaa
                    </Text>
                    <Text fontSize={'12px'} color='#bdc1c9'>
                      10:59
                    </Text>
                  </Flex>
                </Flex>
              </Box>
              <Flex p='10px 10px' alignItems={'center'}>
                <Icon as={FaPlusCircle} m='0 10px 0 5px' p='0' fontSize='20px' />
                <Input
                  placeholder='Nhập tin nhắn'
                  w='100%'
                  h='30px'
                  border='none'
                  borderRadius={'20px'}
                  bg='#f4f4f4'></Input>
                <Icon as={AiOutlineSend} m='0 10px 0 5px' p='0' fontSize='20px' />
              </Flex>
            </React.Fragment>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Chat;
